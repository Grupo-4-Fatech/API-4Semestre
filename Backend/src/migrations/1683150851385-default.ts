import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683150851385 implements MigrationInterface {
    name = 'default1683150851385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution" RENAME COLUMN "solution" TO "description"`);
        await queryRunner.query(`CREATE TABLE "solution_ticket_ticket" ("solutionId" integer NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "PK_95a16687a19c3b7d73b8138ae1e" PRIMARY KEY ("solutionId", "ticketId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e753c23e3af7ec1b8073e54d85" ON "solution_ticket_ticket" ("solutionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78b266feeefaa0ae8d649ee565" ON "solution_ticket_ticket" ("ticketId") `);
        await queryRunner.query(`ALTER TABLE "solution_ticket_ticket" ADD CONSTRAINT "FK_e753c23e3af7ec1b8073e54d854" FOREIGN KEY ("solutionId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "solution_ticket_ticket" ADD CONSTRAINT "FK_78b266feeefaa0ae8d649ee5656" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution_ticket_ticket" DROP CONSTRAINT "FK_78b266feeefaa0ae8d649ee5656"`);
        await queryRunner.query(`ALTER TABLE "solution_ticket_ticket" DROP CONSTRAINT "FK_e753c23e3af7ec1b8073e54d854"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78b266feeefaa0ae8d649ee565"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e753c23e3af7ec1b8073e54d85"`);
        await queryRunner.query(`DROP TABLE "solution_ticket_ticket"`);
        await queryRunner.query(`ALTER TABLE "solution" RENAME COLUMN "description" TO "solution"`);
    }

}
