/*
 Navicat PostgreSQL Data Transfer

 Source Server         : local
 Source Server Type    : PostgreSQL
 Source Server Version : 90603
 Source Host           : localhost:5432
 Source Catalog        : permits
 Source Schema         : permit

 Target Server Type    : PostgreSQL
 Target Server Version : 90603
 File Encoding         : 65001

 Date: 01/12/2017 10:17:39
*/

set schema 'permit';

CREATE SEQUENCE if not exists "permit_field_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;







CREATE SEQUENCE if not exists "permit_regime_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;









-- ----------------------------
-- Table structure for field
-- ----------------------------
CREATE TABLE if not exists "field" (
  "field_nm" varchar COLLATE "pg_catalog"."default",
  "field_definition" json,
  "field_active" bit(1),
  "field_id" int8 NOT NULL DEFAULT nextval('permit_field_id_seq'::regclass),
  "field_is_search_key" bit(1),
  CONSTRAINT "fieldID" PRIMARY KEY ("field_id")
)
;

-- ----------------------------
-- Records of field
-- ----------------------------
BEGIN;
INSERT INTO "field" VALUES ('DateField', '{"type":"date"}', '1', 17, NULL) on conflict (field_id) do nothing;
INSERT INTO "field" VALUES ('NumberField', '{"type":"number"}', '1', 18, NULL) on conflict (field_id) do nothing;
INSERT INTO "field" VALUES ('IntField', '{"type":"int"}', '1', 19, NULL) on conflict (field_id) do nothing;
INSERT INTO "field" VALUES ('TextField', '{"type":"text"}', '1', 20, NULL) on conflict (field_id) do nothing;
INSERT INTO "field" VALUES ('ArrayField', '{"type":"array"}', '1', 21, NULL) on conflict (field_id) do nothing;
COMMIT;

-- ----------------------------
-- Table structure for licence
-- ----------------------------
drop table if exists "licence" cascade;

CREATE SEQUENCE if not exists "permit_licence_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE if not exists "licence" (
  "licence_status_id" int8,
  "licence_type_id" int8 NOT NULL,
  "licence_regime_id" int8 NOT NULL,
  "licence_id" int8 NOT NULL DEFAULT nextval('permit_licence_id_seq'::regclass),
  "licence_search_key" text COLLATE "pg_catalog"."default",
  "is_public_domain" bit(1),
  "licence_start_dt" date,
  "licence_end_dt" date,
  "licence_ref" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for licence_data
-- ----------------------------
DROP TABLE IF EXISTS "licence_data";

CREATE SEQUENCE if not exists "permit_licence_data_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE "licence_data" (
  "licence_id" int8 NOT NULL,
  "licence_data_value" text COLLATE "pg_catalog"."default",
  "type_fields_id" int8,
  "licence_data_id" int8 NOT NULL DEFAULT nextval('permit_licence_data_id_seq'::regclass)
)
;

-- ----------------------------
-- Table structure for regime
-- ----------------------------
ALTER TABLE "regime" DROP CONSTRAINT if exists "orgID" CASCADE;

CREATE TABLE if not exists "regime" (
  "regime_nm" varchar COLLATE "pg_catalog"."default",
  "regime_id" int8 NOT NULL DEFAULT nextval('permit_regime_id_seq'::regclass)
)
;


ALTER TABLE "regime" DROP CONSTRAINT if exists "regime_id_idx" cascade;
ALTER TABLE "regime" ADD CONSTRAINT "regime_id_idx" PRIMARY KEY ("regime_id");

-- ----------------------------
-- Records of regime
-- ----------------------------
BEGIN;
INSERT INTO "regime" VALUES ('Water Licencing', 1) on conflict (regime_id) do nothing;
COMMIT;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS "status";

CREATE SEQUENCE if not exists "permit_status_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE "status" (
  "status_id" int4 NOT NULL DEFAULT nextval('permit_status_id_seq'::regclass),
  "status_nm" varchar(30)[] COLLATE "pg_catalog"."default",
  "status_active" bit(1)[]
)
;

-- ----------------------------
-- Records of status
-- ----------------------------
BEGIN;
INSERT INTO "status" VALUES (1, '{Active}', '{1}');
COMMIT;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS "type";

CREATE SEQUENCE  if not exists "permit_type_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE "type" (
  "type_nm" varchar COLLATE "pg_catalog"."default",
  "regime_id" int8,
  "type_id" int4 NOT NULL DEFAULT nextval('permit_type_id_seq'::regclass)
)
;



-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;
INSERT INTO "type" VALUES ('Water Abstraction Licence', 1, 8);
COMMIT;

-- ----------------------------
-- Table structure for type_fields
-- ----------------------------
DROP TABLE IF EXISTS "type_fields";

CREATE SEQUENCE if not exists "permit_type_fields_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE "type_fields" (
  "type_id" int8 NOT NULL,
  "field_id" int8 NOT NULL,
  "type_fields_id" int8 NOT NULL DEFAULT nextval('permit_type_fields_id_seq'::regclass),
  "is_required" bit(1),
  "is_public_domain" bit(1),
  "type_field_alias" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of type_fields
-- ----------------------------
BEGIN;
INSERT INTO "type_fields" VALUES (8, 20, 19, '1', '1', 'licenceData');
COMMIT;

-- ----------------------------
-- Table structure for x_licence_shortcode
-- ----------------------------
DROP TABLE IF EXISTS "licence_shortcode";

CREATE SEQUENCE if not exists "permit_shortcode_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

CREATE TABLE "licence_shortcode" (
  "shortcode_id" int4 NOT NULL DEFAULT nextval('permit_shortcode_id_seq'::regclass),
  "licence_id" int8,
  "shortcode" varchar COLLATE "pg_catalog"."default",
  "expiry_dt" date,
  "user_id" int8,
  "issued_dt" date
)
;


-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "permit_field_id_seq"
OWNED BY "field"."field_id";
SELECT setval('permit_field_id_seq', 22, true);

ALTER SEQUENCE "permit_licence_data_id_seq"
OWNED BY "licence_data"."licence_data_id";

ALTER SEQUENCE "permit_licence_id_seq"
OWNED BY "licence"."licence_id";

ALTER SEQUENCE "permit_shortcode_id_seq"
OWNED BY "licence_shortcode"."shortcode_id";
SELECT setval('permit_shortcode_id_seq', 17, true);

ALTER SEQUENCE "permit_regime_id_seq"
OWNED BY "regime"."regime_id";
SELECT setval('permit_regime_id_seq', 5, true);
ALTER SEQUENCE "permit_status_id_seq"
OWNED BY "status"."status_id";
SELECT setval('permit_status_id_seq', 2, true);
ALTER SEQUENCE "permit_type_fields_id_seq"
OWNED BY "type_fields"."type_fields_id";
SELECT setval('permit_type_fields_id_seq', 20, true);
ALTER SEQUENCE "permit_type_id_seq"
OWNED BY "type"."type_id";
SELECT setval('permit_type_id_seq', 9, true);

-- ----------------------------
-- Primary Key structure for table field
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table licence
-- ----------------------------
ALTER TABLE "licence" ADD CONSTRAINT "licence_id" PRIMARY KEY ("licence_id");

-- ----------------------------
-- Primary Key structure for table licence_data
-- ----------------------------
ALTER TABLE "licence_data" ADD CONSTRAINT "licence_data_id" PRIMARY KEY ("licence_data_id");


-- ----------------------------
-- Primary Key structure for table status
-- ----------------------------
ALTER TABLE "status" ADD CONSTRAINT "status_id" PRIMARY KEY ("status_id");

-- ----------------------------
-- Primary Key structure for table type
-- ----------------------------
ALTER TABLE "type" ADD CONSTRAINT "type_pkey" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table type_fields
-- ----------------------------
ALTER TABLE "type_fields" ADD CONSTRAINT "type_fields_id" PRIMARY KEY ("type_fields_id") DEFERRABLE;

-- ----------------------------
-- Primary Key structure for table x_licence_shortcode
-- ----------------------------
ALTER TABLE "licence_shortcode" ADD CONSTRAINT "licence_shortcode_idx" PRIMARY KEY ("shortcode_id");

-- ----------------------------
-- Foreign Keys structure for table licence
-- ----------------------------
ALTER TABLE "licence" ADD CONSTRAINT "regime_id_constraint" FOREIGN KEY ("licence_regime_id") REFERENCES "regime" ("regime_id")
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table licence_data
-- ----------------------------
ALTER TABLE "licence_data" ADD CONSTRAINT "licence_id" FOREIGN KEY ("licence_id") REFERENCES "licence" ("licence_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table type
-- ----------------------------
ALTER TABLE "type" ADD CONSTRAINT "type_regime_id_constraint" FOREIGN KEY ("regime_id") REFERENCES "regime" ("regime_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table type_fields
-- ----------------------------
ALTER TABLE "type_fields" ADD CONSTRAINT "field_id_constraint" FOREIGN KEY ("field_id") REFERENCES "field" ("field_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
