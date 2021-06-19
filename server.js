var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConn = require('./lib/dbConnection');
var cross_val = require('./cross_val');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var predictRouter = require('./routes/prediction');
var propertiesRouter = require('./routes/properties');

var app = express();
const port = 8080;

app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: false
}));
app.use(bodyParser.json({limit: "5mb"}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/predict', predictRouter);
app.use('/properties', propertiesRouter);

app.use(express.static(__dirname +"/CI-CD-Part2/dist/CI-CD-Part2"));

var init = () => {
    dbConn.mongoConnect()
        .then((data) => {
            console.log('MongoDB Connection: OK');
            exports.mongo = data;
            cross_val();
        })
        .catch((err) => {
            console.log(err);
            console.log('MongoDB connection: Not OK!');
        })
};



init();

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;
