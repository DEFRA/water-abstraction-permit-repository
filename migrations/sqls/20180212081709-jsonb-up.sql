/* Replace with your SQL commands */
ALTER TABLE "permit"."licence" 
  ADD COLUMN "licence_summary" jsonb,
  ALTER COLUMN "licence_data_value" TYPE json USING "licence_data_value"::json;

ALTER TABLE "permit"."licence" 
  ALTER COLUMN "licence_data_value" TYPE jsonb USING "licence_data_value"::jsonb;

CREATE INDEX "licence_data_idx" ON "permit"."licence" USING gin (
  "licence_data_value"
);
CREATE INDEX "licence_summary_idx" ON "permit"."licence" USING gin (
  "licence_summary"
);
