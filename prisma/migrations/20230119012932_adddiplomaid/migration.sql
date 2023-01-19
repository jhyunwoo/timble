-- AlterTable
CREATE SEQUENCE diploma_id_seq;
ALTER TABLE "diploma" ALTER COLUMN "id" SET DEFAULT nextval('diploma_id_seq');
ALTER SEQUENCE diploma_id_seq OWNED BY "diploma"."id";
