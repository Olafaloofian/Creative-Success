insert into creative_users (first_name, last_name, email, password)
values (${firstName}, ${lastName}, ${email}, ${hashed})
returning first_name, last_name, email;