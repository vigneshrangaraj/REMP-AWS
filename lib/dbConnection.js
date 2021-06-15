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
                    let mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

                    let url = `mongodb+srv://${mongoEnv.mongoUser}:${mongoEnv.mongoPassword}@${mongoEnv.mongoHost}/${mongoEnv.mongoDatabase}?retryWrites=true&w=majority`;

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
