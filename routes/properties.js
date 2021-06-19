var express = require('express');
var router = express.Router();
var app = require('../server');

router.get('/', function (req, res, next) {
    app.mongo.collection('properties').find().toArray(function(err, data) {
        if (err) {
            console.log('/properties: Error getting properties');
            console.log(err);
            res.json({err: err});
        } else {
            res.json(data);
        }
    })
});

router.post('/createProp', function (req, res, next) {
    var body = req.body;
    var keys = Object.keys(req.body);
    try {
        var body1 = JSON.parse(keys[0])
    } catch (e) {
        console.log('Error', e);
    }

    app.mongo.collection('properties').insertOne(body1, function(err, results) {
        if (err) {
            console.log('/properties: Error inserting item');
            console.log();
            console.log(err);
            res.json({err: err});
        } else {
            res.json({"res": "Success"});
        }
    })
});


router.post('/editProp', function (req, res, next) {
    var body = req.body
    var keys = Object.keys(req.body);
    try {
        var body1 = JSON.parse(keys[0])
    } catch (e) {
        console.log('Error', e);
    }

    app.mongo.collection('properties').update({uuid: body1.uuid}, {$set: body1}, {upsert: false}, function(err, results) {
        if (err) {
            console.log('/properties: Error editing item');
            console.log();
            console.log(err);
            res.json({err: err});
        } else {
            res.json({"res": "Success"});
        }
    })
});

router.post('/deleteProp/', function (req, res, next) {
    var body = req.body
    var keys = Object.keys(req.body);
    try {
        var body1 = JSON.parse(keys[0])
    } catch (e) {
        console.log('Error', e);
    }

    app.mongo.collection('properties').remove({uuid: body1.uuid}, function(err, results) {
        if (err) {
            console.log('/properties: Error editing item');
            console.log();
            console.log(err);
            res.json({err: err});
        } else {
            res.json({"res": "Success"});
        }
    })
});

module.exports = router;
