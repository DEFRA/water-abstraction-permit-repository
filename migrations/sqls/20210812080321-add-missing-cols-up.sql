/* Replace with your SQL commands */

ALTER table permit.licence ADD COLUMN IF NOT EXISTS date_licence_version_purpose_conditions_last_copied timestamp;

ALTER table permit.licence ADD COLUMN IF NOT EXISTS date_gauging_station_links_last_copied timestamp;


