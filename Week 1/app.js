const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3000


/**
 *  Homework 1 Submission
 *  Name: Acosta Jan Jacob Domalanta
 *  Admin No.: P2026271
 *  Class: DIT/2B03
 */

app.use(cors());
app.use(bodyParser.json())

function logRequests(req,res,next) {
    // Logs the original path
    console.log(req);

    // Logs the request path.
    //console.log(req.path)
    
    next();
}
app.use(logRequests);

app.get("/timenow", function (req, res) {
    const d = new Date();
    var timenow = `${d.getHours()}h:${d.getMinutes()}m:${d.getSeconds()}s`
    res.status(200).send(timenow);
})

app.post("/squareValue", function (req, res) {
    var value = req.query.value;
    setTimeout(() => {
        if (isNaN(value)) {
            res.status(500).send({ "errorMsg": "Please input a number." })
        }
        else {
            var output = value * value;
            res.status(200).send({ "output": output + "" });
        }
    }, 1000);


})

app.post("/cubeValue", function (req, res) {
    var value = req.body.value;
    setTimeout(() => {
        if (isNaN(value)) {
            res.status(500).send({ "errorMsg": "Please input a number." })
        }
        else {
            var output = value * value * value;
            res.status(200).send({ "output": output + "" });
        }  
    }, 1000);

})

app.use(function (req, res, next) {
    res.status(404).send({ "errorMsg": "Resouce not found!"});
})

app.listen(port, () => {
    console.log(`Homework 1 App listening at http://localhost:${port}`);
})