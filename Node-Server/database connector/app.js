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

app.get('/groups', async (req, res) => {
    database.query("SELECT * FROM group_info", function(err, rows) {
        if (err) throw err
        res.send(rows);
    })
})

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
  
app.get('/lms/create-groups', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('create-groups-instructor.html', {root: './public/html pages'});
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
