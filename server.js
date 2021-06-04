const http = require('http');
var dbConn = require('./lib/dbConnection');
var express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');

var app = express();
const port = 8080;

app.use(cors());

console.log('dirname');
console.log(__dirname);

app.use(express.static(__dirname +"/CI-CD-Part2/dist/CI-CD-Part2"));

app.use('/', indexRouter);

var init = () => {
    dbConn.mongoConnect()
        .then((data) => {
            console.log('MongoDB Connection: OK');
            exports.mongo = data;

        })
        .catch((err) => {
            console.log(err);
            console.log('MongoDB connection: Not OK!');
        })
};

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

init();
