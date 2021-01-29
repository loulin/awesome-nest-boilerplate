import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1611823514639 implements MigrationInterface {
  name = 'UpdateUser1611823514639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "wards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_5a722ad2f076304832fa3d80af5" UNIQUE ("name"), CONSTRAINT "PK_f67afa72e02ac056570c0dde279" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "first_name"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "last_name"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "avatar"');
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "email"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "phone"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "username" character varying NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")',
    );
    await queryRunner.query('ALTER TABLE "users" ADD "ward_id" uuid');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "role"');
    await queryRunner.query('DROP TYPE "public"."users_role_enum"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "role" integer NOT NULL DEFAULT \'1\'',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_0aa35ab13580b27c0820f086c97" FOREIGN KEY ("ward_id") REFERENCES "wards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_0aa35ab13580b27c0820f086c97"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "role"');
    await queryRunner.query(
      'CREATE TYPE "public"."users_role_enum" AS ENUM(\'USER\')',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "role" "users_role_enum" NOT NULL DEFAULT \'USER\'',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "ward_id"');
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "username"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD "phone" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "email" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "avatar" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "last_name" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "first_name" character varying',
    );
    await queryRunner.query('DROP TABLE "wards"');
  }
}
