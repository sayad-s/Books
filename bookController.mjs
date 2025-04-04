import { validationResult } from "express-validator";
import * as bookService from "../services/bookService.mjs";

export const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) { 
        res.status(500).json({ error: err.message });
    }
} 

export const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
    
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = await bookService.updateBook(parseInt(req.params.id), req.body);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const succeed = await bookService.deleteBook(parseInt(req.params.id));
        if (!succeed) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}