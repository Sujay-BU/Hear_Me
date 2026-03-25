const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let mysql = require('mysql');

//default path produces a hello world message that can be used for testing purposes
app.get('/', function(req, res) {
    res.send("Hello world!")
});

//Deal with post requests that verifies professors username and password
app.post('/databaseCred', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let loginUsername = cred.username;
    let loginPassword = cred.password;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT * from credentials where university_email=" + JSON.stringify(loginUsername) +  " and password=" + JSON.stringify(loginPassword) + ";", function (err, rows, fields) {
        if (err) throw err;

        //If no results, return false, else return true
        (rows.length == 0 ? res.send({message: 'false'}) : res.send({message: 'true'}));
    })
    
    //Ending the connection to the database
    connection.end();
});

app.post('/createExam', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let examID = cred.examID;
    let examDate = cred.examDates;
    let examStartTime = cred.examStartTimes;
    let examEndTime = cred.examEndTimes;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("INSERT INTO exam (exam_id, date_of_exam, start_time, end_time) VALUES (" + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'), " + JSON.stringify(examStartTime) + ", " + JSON.stringify(examEndTime) + ");", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            throw err;
        }

        //Else send a json object which equates to true to the frontend
        res.send({message: 'true'});
    })
    
    //Ending the connection to the database
    connection.end();
});

app.post('/uploadQuestions', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let examID = cred.examID;
    let examDate = cred.examDate;
    let questionOne = cred.qOne;
    let questionTwo = cred.qTwo;
    let questionThree = cred.qThree;
    let questionFour = cred.qFour;
    let questionFive = cred.qFive;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("INSERT INTO questions (question_number, question, exam_id, date_of_exam) VALUES (" + 1 + ", " + JSON.stringify(questionOne) + ", " + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'));", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })
    
    //If the second question is not empty
    if(questionTwo != '') {
        //Executing a query
        connection.query("INSERT INTO questions (question_number, question, exam_id, date_of_exam) VALUES (" + 2 + ", " + JSON.stringify(questionTwo) + ", " + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'));", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the third question is not empty
    if(questionThree != '') {
        //Executing a query
        connection.query("INSERT INTO questions (question_number, question, exam_id, date_of_exam) VALUES (" + 3 + ", " + JSON.stringify(questionThree) + ", " + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'));", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the fourth question is not empty
    if(questionFour != '') {
        //Executing a query
        connection.query("INSERT INTO questions (question_number, question, exam_id, date_of_exam) VALUES (" + 4 + ", " + JSON.stringify(questionFour) + ", " + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'));", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the fifth question is not empty
    if(questionFive != '') {
        //Executing a query
        connection.query("INSERT INTO questions (question_number, question, exam_id, date_of_exam) VALUES (" + 5 + ", " + JSON.stringify(questionFive) + ", " + JSON.stringify(examID) + ", STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y'));", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/editExam', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let examID = cred.examID;
    let examDate = cred.examDate;
    let questionOne = cred.qOne;
    let questionTwo = cred.qTwo;
    let questionThree = cred.qThree;
    let questionFour = cred.qFour;
    let questionFive = cred.qFive;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //If the first question is not empty
    if (questionOne != '') {
        //Executing a query
        connection.query("UPDATE questions SET question=" + JSON.stringify(questionOne) + " WHERE exam_id=" + JSON.stringify(examID) + " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y') AND question_number=" + 1 + ";", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the second question is not empty
    if (questionTwo != '') {
        //Executing a query
        connection.query("UPDATE questions SET question=" + JSON.stringify(questionTwo) + " WHERE exam_id=" + JSON.stringify(examID) + " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y') AND question_number=" + 2 + ";", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the third question is not empty
    if (questionThree != '') {
        //Executing a query
        connection.query("UPDATE questions SET question=" + JSON.stringify(questionThree) + " WHERE exam_id=" + JSON.stringify(examID) + " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y') AND question_number=" + 3 + ";", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the fourth question is not empty
    if (questionFour != '') {
        //Executing a query
        connection.query("UPDATE questions SET question=" + JSON.stringify(questionFour) + " WHERE exam_id=" + JSON.stringify(examID) + " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y') AND question_number=" + 4 + ";", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //If the fifth question is not empty
    if (questionFive != '') {
        //Executing a query
        connection.query("UPDATE questions SET question=" + JSON.stringify(questionFive) + " WHERE exam_id=" + JSON.stringify(examID) + " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDate) + ", '%d-%m-%Y') AND question_number=" + 5 + ";", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }

    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/removeExam', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let examIDs = cred.examID;
    let examDates = cred.examDate;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("DELETE FROM questions WHERE exam_id=" + JSON.stringify(examIDs) + "AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDates) + ", '%d-%m-%Y');", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })

    //Executing a query
    connection.query("DELETE FROM exam WHERE exam_id=" + JSON.stringify(examIDs) + "AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDates) + ", '%d-%m-%Y');", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })

    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/viewExam', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let examIDs = cred.examID;
    let examDates = cred.examDate;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT question FROM questions WHERE exam_id=" + JSON.stringify(examIDs) +  " AND date_of_exam=STR_TO_DATE(" + JSON.stringify(examDates) + ", '%d-%m-%Y') ORDER BY question_number ASC;", function (err, rows, fields) {
        if (err) throw err;

        //Send a json object which equates to the rows retrieved by the database to the frontend if 1 or more rows exist in the database, else send false
        (rows.length != 0 ? res.send({message: rows}) : res.send({message: 'false'}));
    })
    
    //Ending the connection to the database
    connection.end();
});

app.post('/getStudentNames', function(req, res) {
    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT first_name, last_name, student_id FROM student;", function (err, rows, fields) {
        if (err) throw err;

        //Send a json object which equates to the rows retrieved by the database to the frontend if 1 or more rows exist in the database, else send false
        (rows.length != 0 ? res.send({message: rows}) : res.send({message: 'false'}));
    })
    
    //Ending the connection to the database
    connection.end();
});

app.post('/getStudentsSubjects', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let studentID = cred.studentID;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT exam_one, exam_two, exam_three FROM student WHERE student_id=" + studentID + ";", function (err, rows, fields) {
        if (err) throw err;

        //Send a json object which equates to the rows retrieved by the database to the frontend if 1 or more rows exist in the database, else send false
        (rows.length != 0 ? res.send({message: rows}) : res.send({message: 'false'}));
    })
    
    //Ending the connection to the database
    connection.end();
});

app.post('/uploadGrades', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let studentID = cred.studentID;
    let subject = cred.subjectID;
    let grades = cred.grade;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("INSERT INTO exam_results (exam_id, student_id, result) VALUES (" + JSON.stringify(subject) + ", " + studentID + ", " + JSON.stringify(grades) + ");", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })
    
    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/insertProfessor', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let firstName = cred.firName;
    let lastName = cred.lasName;
    let universityEmail = cred.email;
    let password = cred.password;
    let examOne = cred.exOne;
    let examTwo = cred.exTwo;
    let examThree = cred.exThree;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //If the examTwo and examThree fields are empty
    if(examTwo == '' && examThree == '') {
        //Executing a query
        connection.query("INSERT INTO credentials (first_name, last_name, university_email, password, exam_one) VALUES (" + JSON.stringify(firstName) + ", " + JSON.stringify(lastName) + ", " + JSON.stringify(universityEmail) + ", " + JSON.stringify(password) + ", " + JSON.stringify(examOne) + ");", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }
    //Else if the examThree field is empty
    else if(examThree == ''){
        //Executing a query
        connection.query("INSERT INTO credentials (first_name, last_name, university_email, password, exam_one, exam_two) VALUES (" + JSON.stringify(firstName) + ", " + JSON.stringify(lastName) + ", " + JSON.stringify(universityEmail) + ", " + JSON.stringify(password) + ", " + JSON.stringify(examOne) + ", " + JSON.stringify(examTwo) + ");", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }
    //Else if examTwo and examThree are not empty
    else if (examTwo != '' && examThree != '') {
        //Executing a query
        connection.query("INSERT INTO credentials (first_name, last_name, university_email, password, exam_one, exam_two, exam_three) VALUES (" + JSON.stringify(firstName) + ", " + JSON.stringify(lastName) + ", " + JSON.stringify(universityEmail) + ", " + JSON.stringify(password) + ", " + JSON.stringify(examOne) + ", " + JSON.stringify(examTwo) + ", " + JSON.stringify(examThree) + ");", function (err, result) {
            if (err) {
                //Send a json object which equates to false to the frontend
                res.send({message: 'false'});
                //Ending the connection to the database
                connection.end();
                throw err;
            }
        })
    }
    
    //Send a json object which equates to True to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/checkEmail', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let email = cred.email;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT university_email FROM credentials WHERE university_email=" + JSON.stringify(email) + ";", function (err, rows, fields) {
        if (err) throw err;

        //Send a json object which equates to true to the frontend if 1 or more rows exist in the database, else send false
        (rows.length != 0 ? res.send({message: 'true'}) : res.send({message: 'false'}));
    })
      
    connection.end();
});

app.post('/verifyCodeEntered', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let randomNumber = cred.numbers;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT random_number FROM forgotten_passwords WHERE random_number=" + randomNumber + ";", function (err, rows, fields) {
        if (err) throw err;

        //Send a json object which equates to true to the frontend if 1 or more rows exist in the database, else send false
        (rows.length != 0 ? res.send({message: 'true'}) : res.send({message: 'false'}));
    })

    //Ending the connection to the database
    connection.end();
});

app.post('/deleteCodes', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let email = cred.universityEmail;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("DELETE FROM forgotten_passwords WHERE university_email=" + JSON.stringify(email) + ";", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })

    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/addRandomNumber', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let universityEmail = cred.email;
    let randomNumber = cred.number;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("INSERT INTO forgotten_passwords (university_email, random_number) VALUES (" + JSON.stringify(universityEmail) + ", " + randomNumber + ");", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })
    
    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/updatePassword', function(req, res) {
    //Retrieving the data sent through the request
    let cred = req.body;
    //Unwrapping the data sent through the request
    let password = cred.pass;
    let email = cred.email;

    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("UPDATE credentials SET password=" + JSON.stringify(password) + " WHERE university_email=" + JSON.stringify(email) + ";", function (err, result) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }
    })

    //Send a json object which equates to true to the frontend
    res.send({message: 'true'});

    //Ending the connection to the database
    connection.end();
});

app.post('/getSubjectsAndGrades', function(req, res) {
    //Creating a mysql connection with appropriate details
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hearme'
    })

    //Connecting to the database
    connection.connect();

    //Executing a query
    connection.query("SELECT * FROM exam_results WHERE student_id=6943297;", function (err, rows, fields) {
        if (err) {
            //Send a json object which equates to false to the frontend
            res.send({message: 'false'});
            //Ending the connection to the database
            connection.end();
            throw err;
        }

        //Send a json object which equates to the rows retrieved by the database to the frontend
        res.send({message: rows});
    })

    //Ending the connection to the database
    connection.end();
});

//Start the server and listen on port 30000 and on ip address 192.168.0.147
app.listen(30000, '192.168.0.147', function() {
    console.log("Server is listening on port 30000...");
});