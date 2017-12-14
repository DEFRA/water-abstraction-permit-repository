/* Replace with your SQL commands */

ALTER TABLE "permit"."licence"
  ADD CONSTRAINT "regime_type_key" UNIQUE ("licence_regime_id", "licence_type_id", "licence_ref");
