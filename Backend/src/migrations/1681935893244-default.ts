import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681935893244 implements MigrationInterface {
    name = 'default1681935893244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "group" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_teams"("id", "name") SELECT "id", "name" FROM "teams"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`ALTER TABLE "temporary_teams" RENAME TO "teams"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" RENAME TO "temporary_teams"`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "teams"("id", "name") SELECT "id", "name" FROM "temporary_teams"`);
        await queryRunner.query(`DROP TABLE "temporary_teams"`);
    }

}
