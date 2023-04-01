import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680316787041 implements MigrationInterface {
    name = 'default1680316787041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
