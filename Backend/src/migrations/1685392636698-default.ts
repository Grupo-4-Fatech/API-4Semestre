import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685392636698 implements MigrationInterface {
    name = 'default1685392636698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "interested" text DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "interested"`);
    }

}
