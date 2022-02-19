CREATE DATABASE student_space;

USE student_space;
CREATE TABLE user(	username varchar(20) PRIMARY KEY, 
					password varchar(20), 
                    first_name char(20), 
                    last_name char(20), 
                    email varchar(40), 
                    profile_pic blob);
DESCRIBE user;
INSERT INTO user(username,password,first_name,last_name,email) VALUES ('username','password','John','Doe','example@example.com');
SELECT * FROM user;

CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';
SELECT USER FROM mysql.user;
GRANT ALL PRIVILEGES ON *.* TO 'user1'@localhost;
SHOW GRANTS FOR 'user1'@localhost;
SELECT * FROM USER;
