module.exports = function() {
  var module = {};

  module.getHomePage = function(req, res) {
    let connected = false;
    if (req.session.username)
      connected = true;
    let query = "SELECT * FROM `posts` order by id desc limit 10"; // query database to get last 10 posts
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        title: "Welcome to my Blog | View Posts", posts: result, connected: connected
      });
    });
  };

  return module;
};
