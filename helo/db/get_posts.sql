SELECT * FROM posts
INNER JOIN users
ON posts.author_id = users.user_id
-- WHERE IS NOT NULL;