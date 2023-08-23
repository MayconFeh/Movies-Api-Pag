import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692804231064 implements MigrationInterface {
    name = 'InitialMigration1692804231064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Movies" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text, "duration" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_6e2590565909568ff1d5a538f6e" UNIQUE ("name"), CONSTRAINT "PK_3c3d780a38fe84af75495a4099f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Movies"`);
    }

}
