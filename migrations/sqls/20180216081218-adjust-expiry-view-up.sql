DROP VIEW "permit"."view_expiring_licences";

CREATE VIEW "permit"."view_expiring_licences" AS  SELECT licence.licence_status_id,
    licence.licence_type_id,
    licence.licence_regime_id,
    licence.licence_id,
    licence.licence_search_key,
    licence.is_public_domain,
    licence.licence_start_dt,
    licence.licence_end_dt,
    licence.licence_ref
   FROM permit.licence
  WHERE (licence.licence_end_dt > now())
	and licence.licence_end_dt < current_date + interval '4 month';
