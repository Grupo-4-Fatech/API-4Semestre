import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683803781826 implements MigrationInterface {
    name = 'default1683803781826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "risk"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "risk" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "impact" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "cost" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "impact"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "risk"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "cost" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "log" ADD "risk" character varying DEFAULT ''`);
    }

}
