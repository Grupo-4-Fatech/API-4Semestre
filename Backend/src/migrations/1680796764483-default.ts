import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680796764483 implements MigrationInterface {
    name = 'default1680796764483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "type" varchar NOT NULL, "description" varchar NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "inspection_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "teamsId" integer, CONSTRAINT "REL_4616979a3a6767d63a35db505e" UNIQUE ("teamsId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "teams_tickets_ticket" ("teamsId" integer NOT NULL, "ticketId" integer NOT NULL, PRIMARY KEY ("teamsId", "ticketId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58" ON "teams_tickets_ticket" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33795475e1aa840826ab3bab1d" ON "teams_tickets_ticket" ("ticketId") `);
        await queryRunner.query(`CREATE TABLE "inspection_group_ticket_ticket" ("inspectionGroupId" integer NOT NULL, "ticketId" integer NOT NULL, PRIMARY KEY ("inspectionGroupId", "ticketId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de1a1888f84f6ab95e3c6d6a09" ON "inspection_group_ticket_ticket" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02f8d5f3f683bee396374908c6" ON "inspection_group_ticket_ticket" ("ticketId") `);
        await queryRunner.query(`CREATE TABLE "temporary_inspection_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "teamsId" integer, CONSTRAINT "REL_4616979a3a6767d63a35db505e" UNIQUE ("teamsId"), CONSTRAINT "FK_4616979a3a6767d63a35db505e7" FOREIGN KEY ("teamsId") REFERENCES "teams" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_inspection_group"("id", "teamsId") SELECT "id", "teamsId" FROM "inspection_group"`);
        await queryRunner.query(`DROP TABLE "inspection_group"`);
        await queryRunner.query(`ALTER TABLE "temporary_inspection_group" RENAME TO "inspection_group"`);
        await queryRunner.query(`DROP INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58"`);
        await queryRunner.query(`DROP INDEX "IDX_33795475e1aa840826ab3bab1d"`);
        await queryRunner.query(`CREATE TABLE "temporary_teams_tickets_ticket" ("teamsId" integer NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "FK_2c5d6d7b7d6d1bd33b9f10ff589" FOREIGN KEY ("teamsId") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_33795475e1aa840826ab3bab1d7" FOREIGN KEY ("ticketId") REFERENCES "ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("teamsId", "ticketId"))`);
        await queryRunner.query(`INSERT INTO "temporary_teams_tickets_ticket"("teamsId", "ticketId") SELECT "teamsId", "ticketId" FROM "teams_tickets_ticket"`);
        await queryRunner.query(`DROP TABLE "teams_tickets_ticket"`);
        await queryRunner.query(`ALTER TABLE "temporary_teams_tickets_ticket" RENAME TO "teams_tickets_ticket"`);
        await queryRunner.query(`CREATE INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58" ON "teams_tickets_ticket" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33795475e1aa840826ab3bab1d" ON "teams_tickets_ticket" ("ticketId") `);
        await queryRunner.query(`DROP INDEX "IDX_de1a1888f84f6ab95e3c6d6a09"`);
        await queryRunner.query(`DROP INDEX "IDX_02f8d5f3f683bee396374908c6"`);
        await queryRunner.query(`CREATE TABLE "temporary_inspection_group_ticket_ticket" ("inspectionGroupId" integer NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "FK_de1a1888f84f6ab95e3c6d6a098" FOREIGN KEY ("inspectionGroupId") REFERENCES "inspection_group" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_02f8d5f3f683bee396374908c65" FOREIGN KEY ("ticketId") REFERENCES "ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("inspectionGroupId", "ticketId"))`);
        await queryRunner.query(`INSERT INTO "temporary_inspection_group_ticket_ticket"("inspectionGroupId", "ticketId") SELECT "inspectionGroupId", "ticketId" FROM "inspection_group_ticket_ticket"`);
        await queryRunner.query(`DROP TABLE "inspection_group_ticket_ticket"`);
        await queryRunner.query(`ALTER TABLE "temporary_inspection_group_ticket_ticket" RENAME TO "inspection_group_ticket_ticket"`);
        await queryRunner.query(`CREATE INDEX "IDX_de1a1888f84f6ab95e3c6d6a09" ON "inspection_group_ticket_ticket" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02f8d5f3f683bee396374908c6" ON "inspection_group_ticket_ticket" ("ticketId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_02f8d5f3f683bee396374908c6"`);
        await queryRunner.query(`DROP INDEX "IDX_de1a1888f84f6ab95e3c6d6a09"`);
        await queryRunner.query(`ALTER TABLE "inspection_group_ticket_ticket" RENAME TO "temporary_inspection_group_ticket_ticket"`);
        await queryRunner.query(`CREATE TABLE "inspection_group_ticket_ticket" ("inspectionGroupId" integer NOT NULL, "ticketId" integer NOT NULL, PRIMARY KEY ("inspectionGroupId", "ticketId"))`);
        await queryRunner.query(`INSERT INTO "inspection_group_ticket_ticket"("inspectionGroupId", "ticketId") SELECT "inspectionGroupId", "ticketId" FROM "temporary_inspection_group_ticket_ticket"`);
        await queryRunner.query(`DROP TABLE "temporary_inspection_group_ticket_ticket"`);
        await queryRunner.query(`CREATE INDEX "IDX_02f8d5f3f683bee396374908c6" ON "inspection_group_ticket_ticket" ("ticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_de1a1888f84f6ab95e3c6d6a09" ON "inspection_group_ticket_ticket" ("inspectionGroupId") `);
        await queryRunner.query(`DROP INDEX "IDX_33795475e1aa840826ab3bab1d"`);
        await queryRunner.query(`DROP INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58"`);
        await queryRunner.query(`ALTER TABLE "teams_tickets_ticket" RENAME TO "temporary_teams_tickets_ticket"`);
        await queryRunner.query(`CREATE TABLE "teams_tickets_ticket" ("teamsId" integer NOT NULL, "ticketId" integer NOT NULL, PRIMARY KEY ("teamsId", "ticketId"))`);
        await queryRunner.query(`INSERT INTO "teams_tickets_ticket"("teamsId", "ticketId") SELECT "teamsId", "ticketId" FROM "temporary_teams_tickets_ticket"`);
        await queryRunner.query(`DROP TABLE "temporary_teams_tickets_ticket"`);
        await queryRunner.query(`CREATE INDEX "IDX_33795475e1aa840826ab3bab1d" ON "teams_tickets_ticket" ("ticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58" ON "teams_tickets_ticket" ("teamsId") `);
        await queryRunner.query(`ALTER TABLE "inspection_group" RENAME TO "temporary_inspection_group"`);
        await queryRunner.query(`CREATE TABLE "inspection_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "teamsId" integer, CONSTRAINT "REL_4616979a3a6767d63a35db505e" UNIQUE ("teamsId"))`);
        await queryRunner.query(`INSERT INTO "inspection_group"("id", "teamsId") SELECT "id", "teamsId" FROM "temporary_inspection_group"`);
        await queryRunner.query(`DROP TABLE "temporary_inspection_group"`);
        await queryRunner.query(`DROP INDEX "IDX_02f8d5f3f683bee396374908c6"`);
        await queryRunner.query(`DROP INDEX "IDX_de1a1888f84f6ab95e3c6d6a09"`);
        await queryRunner.query(`DROP TABLE "inspection_group_ticket_ticket"`);
        await queryRunner.query(`DROP INDEX "IDX_33795475e1aa840826ab3bab1d"`);
        await queryRunner.query(`DROP INDEX "IDX_2c5d6d7b7d6d1bd33b9f10ff58"`);
        await queryRunner.query(`DROP TABLE "teams_tickets_ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "inspection_group"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
