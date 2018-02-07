/* Replace with your SQL commands */
UPDATE permit.licence l
  SET licence_data_value = ld.licence_data_value
  FROM permit.licence_data ld
  WHERE l.licence_id = ld.licence_id AND l.licence_data_value IS NULL;
