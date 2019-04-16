const fs = require('fs');

module.exports = function () {

  var module = {};

  module.addPostsPage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    res.render('add-posts.ejs', {
      title: "Add a new Post",
      message: '',
      connected: connected
    });
  };

  module.addPosts = function(req, res) {
    if (!req.session.username)
      res.render('add-posts.ejs', {
        title: "Add a new Post",
        message: 'You need to sign in before adding a post !',
        connected: false
      });
    else {
      let content = req.body.content.replace(/'/g, "\\'");
      let now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      let title = req.body.title.replace(/'/g, "\\'");
      let query = "INSERT INTO `posts` (date, user_id, content, title) VALUES ('" + now + "', '" + 0 + "', '" + content + "', '" + title + "')";

      db.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect('/');
      });
    }
  };

  module.editPostsPage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    let postId = req.params.id;
    let query = "SELECT * FROM `posts` WHERE id = '" + postId + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('edit-posts.ejs', {
        post: result[0],
        title: "Edit a post",
        message: '',
        connected: connected
      });
    });
  };

  module.viewPostsPage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    let postId = req.params.id;
    let query = "SELECT * FROM `posts` WHERE id = '" + postId + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('view-posts.ejs', {
        post: result[0],
        title: "Article",
        message: '',
        connected: connected
      });
    });
  };

  module.editPosts = function(req, res) {
    if (!req.session.username) {
      let post = {};
      post.title = req.body.title;
      post.content = req.body.content;
      res.render('edit-posts.ejs', {
        title: "Edit a Post",
        message: 'You need to sign in before editing a post !',
        post: post,
        connected: false
      });
    }
    else {
      let postId = req.params.id;
      let content = req.body.content.replace(/'/g, "\\'");
      let title = req.body.title.replace(/'/g, "\\'");
      let query = "UPDATE `posts` SET title = '" + title + "', content = '" + content + "' WHERE `posts`.`id` = '" + postId + "'";

      db.query(query, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect('/');
      });
    }
  };

  module.deletePost = function(req, res) {
    let postId = req.params.id;
    let deletePostQuery = 'DELETE FROM posts WHERE id = "' + postId + '"';

    db.query(deletePostQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  };

  module.loginPage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    res.render('login.ejs', {
      title: "Sign in",
      message: '',
      connected: connected
    })
  };

  module.login = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    let username = req.body.username;
    let password = req.body.password;
    let query = "SELECT * FROM `user` WHERE username = '" + username + "' AND password = '" + password + "'";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result[0]) {
        req.session.username = username;
        req.session.password = password;
        res.redirect('/');
      }
      else {
        res.render('login.ejs', {
          title: 'Sign in',
          message: 'Username or password is incorrect',
          connected: connected
        });
      }
    });
  };

  module.registerPage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    console.log(req.session);
    res.render('register.ejs', {
      title: "Sign up",
      connected: connected
    })
  };

  module.register = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let query = "INSERT INTO `user` (username, password) VALUES ('" + username + "', '" + password + "')";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  };

  module.logout = function(req, res) {
    req.session.destroy((err) => {
      if(err) {
        return console.log(err);
      }
      res.redirect('/');
    });
  };

  return module;
};
