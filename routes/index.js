var express = require('express');
var router = express.Router();
let app = require('../server');

/* GET home page. */
router.get('/message', function(req, res, next) {
  console.log('Get message');
  app.mongo.collection("test_coll").find().toArray((err, data) => {
    res.send(data[0]);
  });
});

module.exports = router;
