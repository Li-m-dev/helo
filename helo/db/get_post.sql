SELECT posts.title, posts.img, posts.content,users.username, users.profile_pic
FROM posts
INNER JOIN users
ON posts.author_id = users.user_id
WHERE post_id=$1;