const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var mysql = require ('mysql');
var bodyParser = require('body-parser');


var connection = mysql.createConnection({
    host: 'student-space.c9udzjhcbdqh.us-east-1.rds.amazonaws.com', 
    user: 'root',
    password: 'password',
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

app.post('/login', function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var conf_pass = req.body.confirm_pass;
    var email = req.body.email;
    
    var sql = `INSERT INTO user (username, password, first_name, last_name, email) VALUES ("${user}", "${pass}", "${'First_Name'}","${'Last_Name'}", "${email}")`;
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/');
    });
  });

app.listen(port, () => {
    console.log(`app listning on port ${port}`)
})