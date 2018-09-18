
drop function if exists permit.updateUserSequence();

create function permit.updateUserSequence() returns void as
$$

begin

  if exists (
    select schema_name
    from information_schema.schemata
    where schema_name = 'idm'
  )
  then
    create sequence if not exists idm.users_id_seq
    start 100000
    owned by idm.users.user_id;

    alter table idm.users
       alter column user_id set default nextval('idm.users_id_seq');
  end if;

end;
$$ LANGUAGE plpgsql;

select permit.updateUserSequence();

drop table if exists permit.x_licence_shortcode;
drop table if exists permit.user_licence;
drop table if exists permit.x_user_licence;
drop table if exists permit.users;
drop table if exists permit.x_users;
drop table if exists permit.licence_data;
drop table if exists permit.licence_shortcode;

drop function permit.updateUserSequence();

