const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "sayad",
    password: "9787",
    database: "booksdb",
    synchronize: true, // Auto-create tables
    entities: [__dirname + "/entities/*.js"],
});

module.exports = AppDataSource; 