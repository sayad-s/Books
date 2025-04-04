// import { MigrationInterface, QueryRunner } from "typeorm";

// export class InitSchema1743504273536 implements MigrationInterface {
//     name = "InitSchema1743504273536";
//     public async up(queryRunner: QueryRunner): Promise<void> {
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1743504273536 extends MigrationInterface {
    name = "InitSchema1743504273536";

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "author" VARCHAR NOT NULL,
                "pages" INT NOT NULL,
                "price" DECIMAL(10,2) NOT NULL
            );
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "books";`);
    }
}

export default InitSchema1743504273536;
