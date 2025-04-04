import { AppDataSource } from "../configs/ormconfig.mjs";
import { Book } from "../entities/Book.mjs"

export const bookRepository = AppDataSource.getRepository(Book);