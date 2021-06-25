do $$ declare gsRow record;
begin for gsRow in (
select
hydrology_station_id as oldguid,
gauging_station_id as newguid
from
water.gauging_stations
where hydrology_station_id is not null) loop
update
permit.licence
set
licence_data_value = replace( licence_data_value::text, gsRow.oldguid::text, gsRow.newguid::text )::jsonb
where
licence_type_id = 10
and licence_data_value::text ilike '%' || gsRow.oldguid::text || '%';
end loop;
end;
$$