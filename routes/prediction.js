var express = require('express');
var router = express.Router();
var cross_val = require('../cross_val');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var body = req.body;
    // try {
    //     var body = JSON.parse(req.body);
    // } catch (e) {
    //     console.log('Error parsing JSON');
    //     console.log(e);
    //     res.json({e: e});
    // }

    console.log(body);
    var values = [
        body["LotArea"],
        body["TotalBsmtSF"],
        body["GrLivArea"],
        body["FullBath"],
        body["BedroomAbvGr"],
        body["TotRmsAbvGrd"],
        body["WoodDeckSF"],
        body["1stFlrSF"],
        body["2ndFlrSF"],
        body["GarageCars"]
    ];
    var data = cross_val.predict(values);
    res.json({data: data});
});

module.exports = router;
