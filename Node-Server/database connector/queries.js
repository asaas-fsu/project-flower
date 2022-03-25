var database = require('./student_space_db');


//Checks the user table's username attribute for the value passed into it. It returns True if found and False if not found. 
function user_exists(username){
    bool_val = database.query(`SELECT username FROM user WHERE username = "${username}"`, function (err, result, fields) {
        if (err) throw err;
        if(result[0] !== undefined){
            return true;
        }
        else{
            return false;
        }
      })
    return bool_val;  
    }


function test(){
    console.log("test")
}    

    module.exports = {user_exists,test}