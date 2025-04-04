import { bookRepository } from "../repositories/bookRepository.mjs"

export const getAllBooks = async () => await bookRepository.find();

export const getBookById = async (id) => await bookRepository.findOneBy({ id }); 

export const createBook = async (data) =>  {
    const book = bookRepository.create(data); 
    return await bookRepository.save(book); 
}

export const updateBook = async (id, data) => {
    const book  = await bookRepository.findOneBy({ id });  
    if (!book) { return null;}

    bookRepository.merge(book, data);
    return await bookRepository.save(book);
}

export const deleteBook = async (id) => {
    // const result = await bookRepository.delete(id);
    // return result.affected > 0;

    const book = await bookRepository.findOneBy({ id });
    if (!book) { return false; }
    await bookRepository.delete(id);

    return true;
}