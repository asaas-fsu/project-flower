const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
// need cookieParser middleware before we can do anything with cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());


var connection = mysql.createConnection({
    host: 'financial-lit.clk0inmtrme1.us-east-1.rds.amazonaws.com', 
    user: 'developer',
    password: 'developer1',
    database: 'student_space'
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile('mainsite-student.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "true") {
        res.sendFile('mainsite-instructor.html', {root: './public/html pages'});
    }
})

app.get('/students', async (req, res) => {
    connection.query("SELECT * FROM user", function(err, rows) {
       if (err) throw err;
       res.send(rows); 
    });
         
})

app.post('/login', function(req, res, next) {
    var user = req.body.log_username;
    var pass = req.body.log_pass;
      
    connection.query(`SELECT * FROM user WHERE username = "${user}"`, function (err, result, fields) {
        if (err) throw err;
        if(result[0] !== undefined){
            if(result[0].password === pass) {
                //username matches password continue to main page.
                // check if client sent cookie
                var cookies = req.cookies;
                if (cookies.user === undefined) {
                    res.cookie('user',user, { maxAge: 900000});
                    if (result[0].status === 1) {
                        res.cookie('instructor',"true", { maxAge: 900000});
                    }
                    else {
                        res.cookie('instructor', "false", {maxAge: 900000});
                    }
                    console.log('cookie created successfully');
                } else {
                    // yes, cookie was already present 
                    console.log('cookie exists', cookies);
                }
                console.log("USERNAME EXISTS: Continue to main page.")
                res.redirect('/')
            }
            else {
                console.log("Invlaid username/password Combination.")
                res.redirect('/')
            }
        }
        else{
            console.log("Invlaid username/password Combination.")
            res.redirect('/')
        }
    }); 
});

app.get('/lms', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile('lms-student.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "true") {
        res.sendFile('lms-instructor.html', {root: './public/html pages'});
    }
    else {
        res.send(`<script>alert("Error: User logged in but not designated instructor or student."); window.location.href = "/"; </script>`);
    }
})

app.get('/lms/poll', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile('polls-student.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "true") {
        res.sendFile('polls-instructor.html', {root: './public/html pages'});
    }
    else {
        res.send(`<script>alert("Error: User logged in but not designated instructor or student."); window.location.href = "/"; </script>`);
    }
})

app.get('/lms/content', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile('assignment-download.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "true") {
        res.sendFile('assignment-upload.html', {root: './public/html pages'});
    }
    else {
        res.send(`<script>alert("Error: User logged in but not designated instructor or student."); window.location.href = "/"; </script>`);
    }
})

app.get('/lms/discussion', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile();
    }
    else if (cookies.instructor === "true") {
        res.sendFile();
    }
    else {
        res.send(`<script>alert("Error: User logged in but not designated instructor or student."); window.location.href = "/"; </script>`);
    }
})

app.get('/lms/groups', (req, res) => {
    app.use(express.static('public'))
    var cookies = req.cookies;
    if (cookies.user === undefined) {
        res.sendFile('instructorLogin.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "false") {
        res.sendFile('groups-students.html', {root: './public/html pages'});
    }
    else if (cookies.instructor === "true") {
        res.sendFile('create-groups-instructor.html', {root: './public/html pages'});
    }
    else {
        res.send(`<script>alert("Error: User logged in but not designated instructor or student."); window.location.href = "/"; </script>`);
    }
})

app.listen(port, () => {
    console.log(`app listning on port ${port}`)
})

// let static middleware do its job
app.use(express.static('public'));