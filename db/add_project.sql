insert into creative_projects (project_name, user_id, description)
values (${project_name}, ${user_id}, ${description})
returning id;