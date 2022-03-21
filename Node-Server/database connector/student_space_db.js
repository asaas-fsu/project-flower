var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'financial-lit.clk0inmtrme1.us-east-1.rds.amazonaws.com',
    user: 'developer',
    password: 'developer1',
    database: 'student_space'
});


module.exports = connection;
