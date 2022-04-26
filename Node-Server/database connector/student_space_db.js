var mysql = require ('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'user1',
    password: 'password1',
    database: 'student_space'
});

function getStudents() {
    var results
    connection.connect(function(err) {
        if (err) throw err
        console.log('Successfully connected...')
        connection.query("SELECT * FROM user", function(err, rows) {
           if (err) throw err
           connection.end();
           results = rows;
           
        });
        
    }) 
    
    
    
results;  
}

module.exports = {getStudents}