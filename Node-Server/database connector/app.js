const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000
const path = require('path');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
var database = require('./student_space_db');
var queries = require('./queries.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload())

app.get('/', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('instructorLogin.html', {root: './public/html pages'});
})

app.get('/html%20pages/home', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('mainsite-instructor.html', {root: './public/html pages'});
})

app.get('/home', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('mainsite-instructor.html', {root: './public/html pages'});
})

app.get('/students', async (req, res) => {
    database.query("SELECT * FROM user", function(err, rows) {
        if (err) throw err
        res.send(rows); 
    });
         
})

app.get('/assignment-upload', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('assignment-upload.html', {root: './public/html pages'});
})

app.get('/create-groups', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('create-groups-instructor.html', {root: './public/html pages'});
})

app.post('/createAccount', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var conf_pass = req.body.confirm_pass;
    var email = req.body.email;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    
    if(queries.user_exists(user)){
        //username exists do not allow user to create account.
        console.log("USERNAME EXISTS: Do not allow account creation.")
        res.send(`<script>alert("An account with that username already exists, please try again."); window.location.href = "/"; </script>`);
    }
     else{
        var sql = `INSERT INTO user (username, password, first_name, last_name, email, status) VALUES ("${user}", "${pass}", "${firstName}","${lastName}", "${email}", "${false}")`;
        database.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/');
        });
    }
  });

  app.post('/login', function(req, res, next) {
    var user = req.body.log_username;
    var pass = req.body.log_pass;
      
    database.query(`SELECT * FROM user WHERE username = "${user}"`, function (err, result, fields) {
        if (err) throw err;
        if(result[0] !== undefined){
            if(result[0].password === pass) {
                //username matches password continue to main page.
                console.log("USERNAME EXISTS: Continue to main page.")
                res.redirect('html%20pages/home')
            }
            else {
                console.log("Invalid username/password Combination.")
                res.send(`<script>alert("Incorrect username and password, please try again."); window.location.href = "/"; </script>`);
                
            }
        }
        else{
            console.log("Invalid username/password Combination.")
            res.send(`<script>alert("Incorrect username and password, please try again."); window.location.href = "/"; </script>`);
        }
      }); 
  }); 
  
  app.post('/fileUpload',(req, res) => {
    let file;
    var fileName = req.body.fileName;

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send("File failed to upload.")
    }

    file = req.files.sampleFile;
    var sql = `INSERT INTO assignment (assign_id, document) VALUES ("${fileName}", "${file}")`;
    database.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        });
    res.send("File uploaded.")    
  })

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
