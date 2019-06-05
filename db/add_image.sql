insert into creative_images (user_id, url, location, project_id, cover_image)
values (${user_id}, ${url}, ${location}, ${project_id}, ${cover_image})
returning *;