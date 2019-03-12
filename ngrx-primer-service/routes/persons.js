var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {


    if (err) throw err;

    var db = client.db('ngrx-primer');
    var personCollection = db.collection("persons");

    /**
     * @swagger
     *
     * /persons:
     *   get:
     *     description: Retrieve the full list of persons
     *     produces:
     *       - application/json
     *     parameters:
     *     responses:
     *       200:
     *         description: persons 
     */    
    router.get('/', function (req, res, next) {
        personCollection.find().toArray(function (err, result) {

            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        });
    });

    /* GET single person. */
    router.get('/:id', function (req, res, next) {
        personCollection.findOne({
                _id: new ObjectId(req.params.id)
            })
            .then(function (result) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));

            })
            .catch(function(err) {
                throw(err);
            });
    });

    /* POST single person */
    router.post('/', function (req, res, next) {
        personCollection.insertOne(req.body)
            .then(function (result) {

                res.setHeader('Content-Type', 'application/json');
                res.send(req.body);
            })
            .catch(function (err) {
                throw (err);
            });
    });
});

module.exports = router;