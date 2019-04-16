const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session');
const port = 8080;

//main page
const {getHomePage} = require('./routes/index')();
//routes for managing posts and users
const {addPostsPage, addPosts, editPostsPage, editPosts,
  deletePost, viewPostsPage, loginPage, login, registerPage,
  register, logout} = require('./routes/posts')();


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

db.connect((err) => {
    if (err) {
        console.log('Cannot connect to database');
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.use(session({secret: 'blogCookie'}));

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


app.get('/', getHomePage);
app.get('/add', addPostsPage);
app.get('/edit/:id', editPostsPage);
app.post('/add', addPosts);
app.post('/edit/:id', editPosts);
app.get('/delete/:id', deletePost);
app.get('/view/:id', viewPostsPage);
app.get('/login', loginPage);
app.post('/login', login);
app.get('/register', registerPage);
app.post('/register', register);
app.get('/logout', logout);

// 404 route
app.get('*', function(req, res){
  res.status(404).send('Not found :(');
});

// Listen on port 8080
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
