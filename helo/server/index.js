require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
// const cors = require("cors");
const massive = require("massive");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 4000;

const {
  getUsers,
  createUser,
  selectUser,
  getPosts,
  getPost,
  createPost,
  logout,
  getMe
} = require(`${__dirname}/controller.js`);

app.use(json());
// app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//users endpoints
app.get("/api/users", getUsers);
app.post("/api/users/new", createUser);
app.post("/api/user", selectUser);
app.post("/api/auth/logout", logout);
app.get("/api/auth/me", getMe);

//posts endpoints
app.get(`/api/posts`, getPosts);
app.get(`/api/post/:post_id`, getPost);
app.post(`/api/post/new`, createPost);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    console.log("database is connecting");
    app.set("db", db);
  })
  .catch(err => {
    app.set("db", db);
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
