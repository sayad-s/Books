import { EntitySchema } from "typeorm";

export const Book = new EntitySchema({
    name: "Book",
    tableName: "books",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
            nullable: false,
        },
        author: {
            type: "varchar",
            nullable: false,
        },
        pages: {
            type: "int",
            nullable: false,
        },
        price: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
        },
    },
});
