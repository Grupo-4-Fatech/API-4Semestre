import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681825401118 implements MigrationInterface {
    name = 'default1681825401118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "inspection_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "funcao" varchar NOT NULL, "descricao" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "gender" varchar NOT NULL, "role" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "inspection_group_users_user" ("inspectionGroupId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("inspectionGroupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a54cb8bf8f008168644407eba" ON "inspection_group_users_user" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2462d44c57156048f669cca33" ON "inspection_group_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "teams_users_user" ("teamsId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("teamsId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87fc9fa5eb07beb301a3bd90f2" ON "teams_users_user" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f675843e42c3220d3c34bd81e1" ON "teams_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ticket"("id", "title", "type", "description", "status", "userId") SELECT "id", "title", "type", "description", "status", "userId" FROM "ticket"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`ALTER TABLE "temporary_ticket" RENAME TO "ticket"`);
        await queryRunner.query(`DROP INDEX "IDX_7a54cb8bf8f008168644407eba"`);
        await queryRunner.query(`DROP INDEX "IDX_d2462d44c57156048f669cca33"`);
        await queryRunner.query(`CREATE TABLE "temporary_inspection_group_users_user" ("inspectionGroupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_7a54cb8bf8f008168644407ebad" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d2462d44c57156048f669cca332" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("inspectionGroupId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_inspection_group_users_user"("inspectionGroupId", "userId") SELECT "inspectionGroupId", "userId" FROM "inspection_group_users_user"`);
        await queryRunner.query(`DROP TABLE "inspection_group_users_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_inspection_group_users_user" RENAME TO "inspection_group_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_7a54cb8bf8f008168644407eba" ON "inspection_group_users_user" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2462d44c57156048f669cca33" ON "inspection_group_users_user" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_87fc9fa5eb07beb301a3bd90f2"`);
        await queryRunner.query(`DROP INDEX "IDX_f675843e42c3220d3c34bd81e1"`);
        await queryRunner.query(`CREATE TABLE "temporary_teams_users_user" ("teamsId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_87fc9fa5eb07beb301a3bd90f2e" FOREIGN KEY ("teamsId") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f675843e42c3220d3c34bd81e1d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("teamsId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_teams_users_user"("teamsId", "userId") SELECT "teamsId", "userId" FROM "teams_users_user"`);
        await queryRunner.query(`DROP TABLE "teams_users_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_teams_users_user" RENAME TO "teams_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_87fc9fa5eb07beb301a3bd90f2" ON "teams_users_user" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f675843e42c3220d3c34bd81e1" ON "teams_users_user" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_f675843e42c3220d3c34bd81e1"`);
        await queryRunner.query(`DROP INDEX "IDX_87fc9fa5eb07beb301a3bd90f2"`);
        await queryRunner.query(`ALTER TABLE "teams_users_user" RENAME TO "temporary_teams_users_user"`);
        await queryRunner.query(`CREATE TABLE "teams_users_user" ("teamsId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("teamsId", "userId"))`);
        await queryRunner.query(`INSERT INTO "teams_users_user"("teamsId", "userId") SELECT "teamsId", "userId" FROM "temporary_teams_users_user"`);
        await queryRunner.query(`DROP TABLE "temporary_teams_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_f675843e42c3220d3c34bd81e1" ON "teams_users_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87fc9fa5eb07beb301a3bd90f2" ON "teams_users_user" ("teamsId") `);
        await queryRunner.query(`DROP INDEX "IDX_d2462d44c57156048f669cca33"`);
        await queryRunner.query(`DROP INDEX "IDX_7a54cb8bf8f008168644407eba"`);
        await queryRunner.query(`ALTER TABLE "inspection_group_users_user" RENAME TO "temporary_inspection_group_users_user"`);
        await queryRunner.query(`CREATE TABLE "inspection_group_users_user" ("inspectionGroupId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("inspectionGroupId", "userId"))`);
        await queryRunner.query(`INSERT INTO "inspection_group_users_user"("inspectionGroupId", "userId") SELECT "inspectionGroupId", "userId" FROM "temporary_inspection_group_users_user"`);
        await queryRunner.query(`DROP TABLE "temporary_inspection_group_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_d2462d44c57156048f669cca33" ON "inspection_group_users_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a54cb8bf8f008168644407eba" ON "inspection_group_users_user" ("inspectionGroupId") `);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME TO "temporary_ticket"`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "ticket"("id", "title", "type", "description", "status", "userId") SELECT "id", "title", "type", "description", "status", "userId" FROM "temporary_ticket"`);
        await queryRunner.query(`DROP TABLE "temporary_ticket"`);
        await queryRunner.query(`DROP INDEX "IDX_f675843e42c3220d3c34bd81e1"`);
        await queryRunner.query(`DROP INDEX "IDX_87fc9fa5eb07beb301a3bd90f2"`);
        await queryRunner.query(`DROP TABLE "teams_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_d2462d44c57156048f669cca33"`);
        await queryRunner.query(`DROP INDEX "IDX_7a54cb8bf8f008168644407eba"`);
        await queryRunner.query(`DROP TABLE "inspection_group_users_user"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "inspection_group"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
