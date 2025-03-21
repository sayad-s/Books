// require('reflect-metadata')
const express = require('express');
const { body, validationResult } = require('express-validator');
const AppDataSource = require('./ormconfig')
const Book = require('./entities/Book');
const cors = require('cors');
const PORT = 3003;

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to PostgreSQL');

        const bookRepository = AppDataSource.getRepository("Book");

        //get all books
        app.get('/books', async (req, res) => {
            try {
                const books = await bookRepository.find();
                res.json(books);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        //get one book by id
        app.get('/books/:id', async (req, res) => {
            try {
                const book = await bookRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!book) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                res.json(book);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.post('/books',
            [
                body('title').notEmpty().withMessage('Title is required'),
                body('author').notEmpty().withMessage('Author is required'),
                body('pages').isInt({ min: 1 }).withMessage('Pages must be postitive'),
                body('pages').isFloat({ min: 0 }).withMessage('Price must be postitive'),
            ],
            async (req, res) => {
                try {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                    }
                    const book = bookRepository.create(req.body);
                    await bookRepository.save(book);
                    res.status(201).json(book);
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        );

        app.put('/books/:id',
            [
                body('title').notEmpty().withMessage('Title is required'),
                body('author').notEmpty().withMessage('Author is required'),
                body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive number'),
                body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
            ],
            async (req, res) => {
                try {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).json({ error: errors.array() });
                    }
                    
                    const book = await bookRepository.findOneBy({ id: parseInt(req.params.id) });
                    if (!book) {
                        return res.status(404).json({ message: 'Book not found' });
                    }
                    
                    bookRepository.merge(book, req.body);
                    await bookRepository.save(book);
                    res.status(200).json(book);

                } catch (err) {
                    return res.status(500).json({ error: err.message });
                }
            }
        );

        app.delete('/books/:id', async (req, res) => {
            try {
                const result = await bookRepository.delete(parseInt(req.params.id));
                if (result.affected === 0) {
                    return res.status(404).json({ message: 'Book not found' });
                }

                res.status(200).json({ message: 'book deleted successfully' });

            } catch (err) {
                return res.status(500).json({ error: err.messsage });
            }
        })

        app.listen(PORT, () => console.log(`Connected to port: ${PORT}`));

    })
    .catch(err => {
        console.error('Database connection failed', err);
    });