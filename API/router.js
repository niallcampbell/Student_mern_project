/*
    API router for handling CRUD requests to the Express web server. 
    Handles requests to the /api/student/ endpoint
*/

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// Create express router object
const router = express.Router();

/*
    Handle GET request. 
    Returns all of the Students in the DB. 
*/
router.get('/', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        var dbObj = db.db("School_DB");
        dbObj.collection("Students").find({}).toArray((err, result) => {
            if(err) throw err;
            res.json(result);
            db.close();
        });
    });
});

module.exports = router;