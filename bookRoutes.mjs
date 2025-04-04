import express from 'express';
import { body, param } from 'express-validator';
import * as bookController from '../controllers/bookController.mjs';

const router = express.Router();

router.get('/books', bookController.getAllBooks);

router.get(
    '/books/:id',
    [param("id").isInt().withMessage("ID must be an integer")], 
    bookController.getBookById
);

router.post(
    '/books', 
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('author').notEmpty().withMessage('Author is required'),
        body('pages').isInt({ min: 1 }).withMessage('Pages must be postitive'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be postitive'),
    ],
    bookController.createBook
);

router.put(
    '/books/:id',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('author').notEmpty().withMessage('Author is required'),
        body('pages').isInt({ min: 1 }).withMessage('Pages must be postitive'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be postitive'),
    ],
    bookController.updateBook
);

router.delete(
    '/books/:id',
    [param("id").isInt().withMessage("ID must be an integer")], 
    bookController.deleteBook
);

export default router;