var express = require('express');
var router = express.Router();
var app = require('../server');
var ObjectId = require('mongodb').ObjectId;

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

    app.mongo.collection('properties').insertOne(body, function(err, results) {
        if (err) {
            console.log('/properties: Error inserting item');
            console.log();
            console.log(err);
            res.json({err: err});
        } else {
            res.json(results.ops[0]);
        }
    })
});

router.post('/editProp', function (req, res, next) {
    var body = req.body;

    var _id = body._id;
    delete body._id;

    app.mongo.collection('properties').update({_id: ObjectId(_id)}, {$set: body}, {upsert: false}, function(err, results) {
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
    var body = req.body;

    app.mongo.collection('properties').remove({_id: ObjectId(body._id)}, function(err, results) {
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
