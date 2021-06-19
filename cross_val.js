const crossVal = require('ml-cross-validation');
const kNN = require('ml-knn');
const tf = require('@tensorflow/tfjs-node');

const app = require('./server');

let MODEL;

async function performTensorFlow() {
    let model = await performTf();
    console.log('WEIGHT');
    console.log(model.getWeights().toString());

    const predictData = {
        "LotArea": 11622,
        "TotalBsmtSF": 882,
        "GrLivArea": 896,
        "FullBath": 1,
        "BedroomAbvGr": 2,
        "TotRmsAbvGrd": 5,
        "WoodDeckSF": 140,
        "1stFlrSF": 896,
        "2ndFlrSF": 0,
        "GarageCars": 1
    };
}

async function performTf() {
    let docs;
    docs = await app.mongo.collection('train').find({}).toArray();
    const seletecedKeys = [
        "LotArea",
        "TotalBsmtSF",
        "GrLivArea",
        "FullBath",
        "TotRmsAbvGrd",
        "WoodDeckSF",
        "1stFlrSF",
        "2ndFlrSF",
        "BedroomAbvGr",
        "GarageCars"
    ];

    const trainX = docs.map(datum => {
        return Object.keys(datum).filter(k => seletecedKeys.includes(k)).map(k => {
            return parseFloat(datum[k]);
        })
    });

    const xTrainRawTensor = tf.tensor(trainX);

    const xTrain = minMaxNormalizer(xTrainRawTensor);

    const yTrain = tf.tensor(docs.map(data => parseFloat(data['SalePrice'])))

    const model = tf.sequential({
        layers: [
            tf.layers.dense({units: 100, inputShape: [10], activation: 'relu'}),
            tf.layers.dense({units: 100, activation: 'relu'}),
            tf.layers.dense({units: 100, activation: 'relu'}),
            tf.layers.dense({units: 1, activation: 'linear'})
        ]
    });
    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});
    await model.fit(xTrain, yTrain, {
        epochs: 50, validationSplit: 0.2, batchSize: 50, callbacks: {
            onEpochEnd: (epoch, {val_loss, loss}) => {
                history = {epoch, loss, val_loss}
            }
        }
    });
    MODEL = model;
    return model;
};

const minMaxNormalizer = (tensor) => {
    const xMin = tensor.min();
    const xMax = tensor.max()
    return tensor.sub(xMin).div(xMax.sub(xMin));
};

function getPredictors() {
    return new Promise(((resolve, reject) => {
        app.mongo.collection('train').aggregate(getKeysQuery()).toArray((err, docs) => {
            const res = docs[0]['allkeys'].reduce((result, item, index, array) => {
                if (item !== '_id' || item !== 'Id' || item !== 'SalePrice') {
                    result[item] = 1;
                }
                return result
            }, {});
            app.mongo.collection('train').find({}, res).toArray((err, docs) => {
                let grandArray = [];
                docs.forEach((doc) => {
                    delete doc['_id'];
                    delete doc['Id'];
                    delete doc['SalePrice'];
                    grandArray.push(Object.values(doc));
                });
                resolve(grandArray);
            })
        })
    }))
}

function predict(data) {
    const predictDataTensor = tf.tensor([data]);
    const predictDataTensorNormalized = minMaxNormalizer(predictDataTensor)

    return MODEL.predict(predictDataTensorNormalized).arraySync()[0][0];
}

function getResponse() {
    return new Promise(((resolve, reject) => {
        app.mongo.collection('train').find({}, {SalePrice: 1}).toArray((err, docsSale) => {
            let grandArray = [];
            docsSale.forEach((doc) => {
                grandArray.push(doc.SalePrice);
            });
            resolve(grandArray);
        })
    }))
}

function getKeysQuery() {
    return [
        {"$project": {"arrayofkeyvalue": {"$objectToArray": "$$ROOT"}}}
        , {"$unwind": "$arrayofkeyvalue"}
        , {
            "$group": {
                "_id": null,
                "allkeys": {"$addToSet": "$arrayofkeyvalue.k"}
            }
        }
    ]
}

module.exports = performTensorFlow;
module.exports.predict = predict;
