import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683121534922 implements MigrationInterface {
    name = 'default1683121534922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inspection_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_78db1f7a9d4b88b8665a264c540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solution" ("id" SERIAL NOT NULL, "problem" character varying NOT NULL, "solution" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_73fc40b114205776818a2f2f248" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "role" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "groupId" integer, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "teamsId" integer, "inspectionGroupId" integer, "userId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "date" integer NOT NULL, "action" character varying NOT NULL, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inspection_group_users_user" ("inspectionGroupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c47faaac22b08ee9f6585c12ea0" PRIMARY KEY ("inspectionGroupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a54cb8bf8f008168644407eba" ON "inspection_group_users_user" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2462d44c57156048f669cca33" ON "inspection_group_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "teams_users_user" ("teamsId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_09e5b63761d783655dc6978c560" PRIMARY KEY ("teamsId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87fc9fa5eb07beb301a3bd90f2" ON "teams_users_user" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f675843e42c3220d3c34bd81e1" ON "teams_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "ticket_logs_log" ("ticketId" integer NOT NULL, "logId" integer NOT NULL, CONSTRAINT "PK_3f9fb8a50bb7cd4b66044e79fb8" PRIMARY KEY ("ticketId", "logId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0fdc8a47d47510ac9d3b5b832f" ON "ticket_logs_log" ("ticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_090a82aff75ff3dc3c449bf36e" ON "ticket_logs_log" ("logId") `);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_577971bf35a3f85b2d6edd8329e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_498e0e2a609732c07c38628eba2" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_2513f8296ee01cb819474b19790" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_15c27c8754e89d078538a44cd5c" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inspection_group_users_user" ADD CONSTRAINT "FK_7a54cb8bf8f008168644407ebad" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inspection_group_users_user" ADD CONSTRAINT "FK_d2462d44c57156048f669cca332" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_users_user" ADD CONSTRAINT "FK_87fc9fa5eb07beb301a3bd90f2e" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_users_user" ADD CONSTRAINT "FK_f675843e42c3220d3c34bd81e1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_logs_log" ADD CONSTRAINT "FK_0fdc8a47d47510ac9d3b5b832f7" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_logs_log" ADD CONSTRAINT "FK_090a82aff75ff3dc3c449bf36e8" FOREIGN KEY ("logId") REFERENCES "log"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_logs_log" DROP CONSTRAINT "FK_090a82aff75ff3dc3c449bf36e8"`);
        await queryRunner.query(`ALTER TABLE "ticket_logs_log" DROP CONSTRAINT "FK_0fdc8a47d47510ac9d3b5b832f7"`);
        await queryRunner.query(`ALTER TABLE "teams_users_user" DROP CONSTRAINT "FK_f675843e42c3220d3c34bd81e1d"`);
        await queryRunner.query(`ALTER TABLE "teams_users_user" DROP CONSTRAINT "FK_87fc9fa5eb07beb301a3bd90f2e"`);
        await queryRunner.query(`ALTER TABLE "inspection_group_users_user" DROP CONSTRAINT "FK_d2462d44c57156048f669cca332"`);
        await queryRunner.query(`ALTER TABLE "inspection_group_users_user" DROP CONSTRAINT "FK_7a54cb8bf8f008168644407ebad"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_15c27c8754e89d078538a44cd5c"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_2513f8296ee01cb819474b19790"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_498e0e2a609732c07c38628eba2"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_577971bf35a3f85b2d6edd8329e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_090a82aff75ff3dc3c449bf36e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fdc8a47d47510ac9d3b5b832f"`);
        await queryRunner.query(`DROP TABLE "ticket_logs_log"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f675843e42c3220d3c34bd81e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87fc9fa5eb07beb301a3bd90f2"`);
        await queryRunner.query(`DROP TABLE "teams_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2462d44c57156048f669cca33"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a54cb8bf8f008168644407eba"`);
        await queryRunner.query(`DROP TABLE "inspection_group_users_user"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "solution"`);
        await queryRunner.query(`DROP TABLE "inspection_group"`);
    }

}
