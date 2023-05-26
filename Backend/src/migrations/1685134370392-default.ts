import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685134370392 implements MigrationInterface {
    name = 'default1685134370392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_577971bf35a3f85b2d6edd8329e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_2513f8296ee01cb819474b19790"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_15c27c8754e89d078538a44cd5c"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "solution" ADD "solution" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "solution" ADD "ticketId" integer`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "UQ_e7c16776f94708ea1f75a5a1b32" UNIQUE ("ticketId")`);
        await queryRunner.query(`ALTER TABLE "solution" ALTER COLUMN "problem" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solution" ALTER COLUMN "problem" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_e7c16776f94708ea1f75a5a1b32" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_2513f8296ee01cb819474b19790" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_15c27c8754e89d078538a44cd5c" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_15c27c8754e89d078538a44cd5c"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_2513f8296ee01cb819474b19790"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_e7c16776f94708ea1f75a5a1b32"`);
        await queryRunner.query(`ALTER TABLE "solution" ALTER COLUMN "problem" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "solution" ALTER COLUMN "problem" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "UQ_e7c16776f94708ea1f75a5a1b32"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "ticketId"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "solution"`);
        await queryRunner.query(`ALTER TABLE "solution" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "solution" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_15c27c8754e89d078538a44cd5c" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_2513f8296ee01cb819474b19790" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_577971bf35a3f85b2d6edd8329e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
