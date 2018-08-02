const getUsers = (req, res, next) => {
  req.app
    .get("db")
    .get_users()
    .then(response => {
      console.log("check here 1", response);
      res.status(200).json(response);
    });
};

const getMe = (req, res, next) => {
  const { user_id } = req.session;
  console.log("getme session: ", req.session);
  req.app
    .get("db")
    .get_me(user_id)
    .then(response => {
      console.log("getMe", response);
      res.status(200).json(response);
    });
  next();
};

const createUser = (req, res, next) => {
  const { username, password, profile_pic } = req.body;
  // console.log(req.body);
  req.app
    .get("db")
    .create_user([username, password, profile_pic])
    .then(response => {
      // console.log("check here 2", response);
      req.session.user_id = response[0].user_id;
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

const selectUser = (req, res, next) => {
  // console.log(req.body);
  const { username, password } = req.body;
  req.app
    .get("db")
    .select_user([username, password])
    .then(response => {
      console.log("check here 3", response);
      req.session.user_id = response[0].user_id;
      console.log("req.session: ", req.session);

      return res.status(200).json(response);
    });
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

const createPost = (req, res, next) => {
  const { user_id } = req.session;
  console.log("look session", req.session);
  const { title, img, content } = req.body;
  req.app
    .get("db")
    .create_post([title, img, content, user_id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

const getPost = (req, res, next) => {
  const { post_id } = req.params;
  req.app
    .get("db")
    .get_post([post_id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

const getPosts = (req, res, next) => {
  const { userposts, search } = req.query;
  const { user_id } = req.session;
  req.app
    .get("db")
    .get_posts()
    .then(posts => {
      // console.log(posts);
      // console.log("params id", user_id);
      // console.log({ userposts, search });
      if (userposts === "true" && search !== "") {
        let filteredPosts = posts.filter(post => post.title.includes(search));
        // console.log("1");
        res.status(200).json(filteredPosts);
      } else if (userposts === "false" && search === "") {
        let filteredPosts = posts.filter(post => {
          // console.log("author id!!!   ", post.author_id);
          return user_id != post.author_id;
        });
        // let filteredPosts = posts.filter(post => {
        //   console.log("post", post);
        //   console.log("check here  ", post.author_id);
        //   post.author_id === id;
        // });
        console.log("2");
        // console.log(filteredPosts);
        res.status(200).json(filteredPosts);
      } else if (userposts === "false" && search !== "") {
        let filteredPosts = posts.filter(
          post => post.author_id != user_id && post.title.includes(search)
        );
        // console.log("3");
        res.status(200).json(filteredPosts);
      } else {
        // console.log("4");
        res.status(200).json(posts);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  selectUser,
  getPosts,
  getPost,
  createPost,
  logout,
  getMe
};
