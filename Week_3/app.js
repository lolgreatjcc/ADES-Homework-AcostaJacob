const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3000


/**
 *  Homework 2 Submission
 *  Name: Acosta Jan Jacob Domalanta
 *  Admin No.: P2026271
 *  Class: DIT/2B03
*/

app.use(cors());
app.use(bodyParser.json());

const pool = require('./databaseModel.js')

// GET all tasks
app.get('/tasks', function (req,res) {
    pool.query('SELECT * FROM tasks', function (err, results) {
        if(!err) {
            res.status(200).send({ "Results" : results })
        }
        else {
            console.log(err);
            res.status(500).send({ "ErrorMsg" : "Something went wrong!"})
        }
    })
})

// CREATE new task
app.post('/tasks', function (req,res) {
    var content = req.body.content;
    pool.query('INSERT INTO tasks (content) VALUES (?)', [content], function (err,results) {
        if(!err) {
            res.status(201).send({ "insertId" : results.insertId})
        }
        else {
            console.log(err);
            res.status(500).send({ "ErrorMsg" : "Something went wrong!"})
        }
    })
})

// UPDATE task status
app.put('/tasks', function (req,res) {
    var task_id = req.body.task_id;
    var done = req.body.done;
    pool.query('UPDATE tasks SET done = ? WHERE task_id = ?', [done, task_id], function (err, results) {
        if(!err) {
            if (results.affectedRows == 0) {
                res.status(400).send({ "ErrorMsg" : "Task not found. Update not complete."})
            }
            else if (results.changedRows == 0) {
                res.status(400).send({ "ErrorMsg" : "Task already has this status. Update not complete."})
            }
            else {
                res.status(200).send({ "Message" : "Task updated Successfully."});
            }
        }
        else {
            console.log(err);
            res.status(500).send({ "ErrorMsg" : "Something went wrong!"})
        }
    })
})

// DELETE task
app.delete('/tasks', function (req,res) {
    var task_id = req.body.task_id;
    pool.query('DELETE FROM tasks WHERE task_id = ?', [task_id], function (err, results) {
        if(!err) {
            if(results.affectedRows == 0) {
                res.status(400).send({ "ErrorMsg" : "Task not found. Delete not complete."})
            }
            else {
                res.status(200).send({ "Message" : "Task deleted successfully."});
            }
        }
        else {
            res.status(500).send({ "ErrorMsg" : "Something went wrong!"})
        }
    })
})

app.use(serveStatic(__dirname + "/public"));

app.use(function (req, res, next) {
    res.status(404).send({ "ErrorMsg": "Resouce not found!"});
})

app.listen(port, () => {
    console.log(`Homework 2 App listening at http://localhost:${port}`);
})