-- Randomize IDs
-- Taken from http://wiki.postgresql.org/wiki/Pseudo_encrypt
-- Enter into SQL table to make pseudo_encrypt and make_random_id functions. To get random ids, use data type 'bigint primary key default make_random_id()'
CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns bigint AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
    l1:= (VALUE >> 16) & 65535;
    r1:= VALUE & 65535;
    WHILE i < 3 LOOP
        l2 := r1;
        r2 := l1 # ((((1366.0 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
        l1 := l2;
        r1 := r2;
        i := i + 1;
    END LOOP;
    RETURN ((l1::bigint << 16) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;

create sequence random_int_seq;

create function make_random_id() returns bigint as $$
    select pseudo_encrypt(nextval('random_int_seq')::int)
$$ language sql;
-- --

create table creative_users(
    id bigint PRIMARY KEY default make_random_id(),
    first_name text,
    last_name text,
    email text unique,
    password text 
);
-- insert into creative_users (username, email, password)
-- values ('Freeps', 'Greeps@me.com', 'Test123'); 

-- insert into creative_users (username, email, password)
-- values ('Lepels', 'zotiloto@yum.com', 'password000');

create table creative_images (
    id bigint PRIMARY KEY default make_random_id(),
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id bigint references creative_users(id),
    url text,
    location varchar(40),
    project_id bigint references creative_projects(id),
    cover_image boolean
);

create table creative_projects (
    id bigint PRIMARY KEY default make_random_id(),
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id bigint references creative_users(id),
    project_name text,
    description text
);

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9034.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9036.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9150.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9153.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_0434.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_0156.jpg', 'home');

insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_0158.jpg', 'home');
insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9153.jpg', 'home');
insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9153.jpg', 'home');
insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9153.jpg', 'home');
insert into creative_images (user_id, url, location)
values (1500453386, 'https://s3.amazonaws.com/michaelkerr-projectmedia/img_9153.jpg', 'home');