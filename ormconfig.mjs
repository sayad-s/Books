import { DataSource } from "typeorm";
import { Book } from "../entities/Book.mjs";
import dotenv from "dotenv";

dotenv.config(); // load .env file

export const AppDataSource = new DataSource({
    logging: true,
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Auto-create tables  
    migrations: ["src/migrations/*.mjs"], // Add migrations path
    migrationsTableName: "migrations_history", // Track migrations
    entities: [Book],
    // entities: ["src/entities/*.mjs"],  // Ensure this is correct
    // synchronize: true, 
    // entities: [__dirname + "/entities/*.js"],
});
