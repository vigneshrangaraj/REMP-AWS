const CONFIG = require('../config'),
    f = require('util').format,
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient;

let mongoEnv = CONFIG.mongoEnv();

module.exports = {
    mongoConnect: function () {
        return new Promise(((resolve, reject) => {
            fs.readFile(__dirname.replace('lib', '') + '/rds-combined-ca-bundle.pem', (fserr, cert) => {
                if (fserr) {
                    console.log('MongoDB cert error ' + fserr);
                    throw fserr;
                } else {
                    let mongoOptions = {
                        sslValidate: true,
                        sslCA:cert,
                        useNewUrlParser: true
                    };

                    let url = `mongodb://${mongoEnv.mongoUser}:${mongoEnv.mongoPassword}@${mongoEnv.mongoHost}:${mongoEnv.mongoPort}/${mongoEnv.mongoDatabase}?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

                    console.log('Connecting to MongoDB server...');
                    console.log(url);

                    MongoClient.connect(url, mongoOptions, (err, client) => {
                        if (err) {
                            console.log('MongoDB connection error');
                            console.log(err);
                            reject();
                        } else {
                            console.log('Successfully established connection to: ' + url);
                        }

                        resolve(client.db(mongoEnv.mongoDatabase));
                    })
                }
            });

        }))
    }
};
