const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');


var connection = mysql.createPool({
    host: 'financial-lit.clk0inmtrme1.us-east-1.rds.amazonaws.com',
    user: 'developer',
    password: 'developer1',
    database: 'student_space'
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    app.use(express.static('public'))
    res.sendFile('instructorLogin.html', {root: './public/html pages'});
})

app.get('/students', async (req, res) => {
    connection.query("SELECT * FROM user", function(err, rows) {
       if (err) throw err
       res.send(rows); 
    });
         
})

app.post('/createAccount', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var conf_pass = req.body.confirm_pass;
    var email = req.body.email;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
      
    connection.query(`SELECT username FROM user WHERE username = "${user}"`, function (err, result, fields) {
        if (err) throw err;
        if(JSON.stringify(result).length > 2){
          //username exists do not allow user to create account.
          console.log("USERNAME EXISTS: Do not allow account creation.")
          res.redirect('/')
        }
        else{
          var sql = `INSERT INTO user (username, password, first_name, last_name, email) VALUES ("${user}", "${pass}", "${firstName}","${lastName}", "${email}")`;
          connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.redirect('/');
          });
        }
      }); 



  });

  app.post('/login', function(req, res, next) {
    var user = req.body.log_username;
    var pass = req.body.log_pass;
      
    connection.query(`SELECT username FROM user WHERE username = "${user}"`, function (err, result, fields) {
        if (err) throw err;
        if(JSON.stringify(result).length > 2){
          connection.query(`SELECT password FROM user WHERE username = "${user}" AND password = "${pass}"`, function (err, result, fields) {
            if (err) throw err;
            if(JSON.stringify(result).length > 2){
              //username exists continue to main page.
              console.log("USERNAME EXISTS: Continue to main page.")
              res.redirect('/')
            }
            else{
              console.log("Invlaid username/password Combination.")
              res.redirect('/')
            }
          });
        }
        else{
          console.log("Invlaid username/password Combination.")
          res.redirect('/')
        }
      }); 



  });  

app.listen(port, () => {
    console.log(`app listning on port ${port}`)
})
