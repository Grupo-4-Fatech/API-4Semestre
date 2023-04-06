import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680796209985 implements MigrationInterface {
    name = 'default1680796209985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inspection_group_ticket_ticket" ("inspectionGroupId" integer NOT NULL, "ticketId" integer NOT NULL, PRIMARY KEY ("inspectionGroupId", "ticketId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de1a1888f84f6ab95e3c6d6a09" ON "inspection_group_ticket_ticket" ("inspectionGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02f8d5f3f683bee396374908c6" ON "inspection_group_ticket_ticket" ("ticketId") `);
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
        await queryRunner.query(`DROP INDEX "IDX_02f8d5f3f683bee396374908c6"`);
        await queryRunner.query(`DROP INDEX "IDX_de1a1888f84f6ab95e3c6d6a09"`);
        await queryRunner.query(`DROP TABLE "inspection_group_ticket_ticket"`);
    }

}
