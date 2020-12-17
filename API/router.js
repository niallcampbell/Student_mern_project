/*
    API router for handling CRUD requests to the Express web server. 
    Handles requests to the /api/student/ endpoint
*/

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const uuid = require('uuid');

// Create express router object
const router = express.Router();

/*
    Handle GET request. 
    Returns all of the Students in the DB. 
*/
router.get('/', (req, res) => {

    console.log("GET request received.");

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

/*
    Handle GET request for specific ID.
    Returns the student with the given id. 
*/
router.get('/:id', (req, res) => {

    var id = req.params.id;
    console.log(`Searching for student with id ${id}`);
    var query = {id};

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        var dbObj = db.db("School_DB");
        dbObj.collection("Students").findOne(query, (err, result) => {
            if(err) throw err;

            if(result != null){
                var dbStudent = {
                    id: result.id,
                    name: result.name,
                    course: result.course
                };
                res.json(dbStudent);
            }else{
                res.status(400).json({ msg: `No student with id ${id} found.` });
            }
            db.close();
        });
    });
});

/*
    Handle POST requests to the API. 
    Creates a new student in the DB based on the info passed in the Post request. 
*/
router.post('/', (req, res) => {

    var newStudent = {
        id: uuid.v4(),
        name: req.body.name,
        course: req.body.course
    };

    if(newStudent.name == null || newStudent.course == null){
        res.status(400).json({ msg: "Please supply a valid name and course." });
    }

    MongoClient.connect(url, (err, db) => {

        if(err) throw err;
        var dbObj = db.db('School_DB');
        dbObj.collection('Students').insertOne(newStudent, (err, result) => {
            if(err) throw err;
            console.log(`Added new student: ${newStudent.name}`);
            db.close();
        });
    });

    res.status(200).json(newStudent);
});

/**
 *  Handles PUT requests to the API. 
 *  Updates a given Student entry with the specified values. 
 */
router.put('/:id', (req, res) => {

    var id = req.params.id;
    var query = {id};

    var studentDetails = {};
    if(req.body.name) studentDetails.name = req.body.name;
    if(req.body.course) studentDetails.course = req.body.course;

    var updateDetails = { 
        $set: studentDetails
    };

    if(req.body.name == null && req.body.course == null){
        res.status(400).json({msg: `Please provide either a name or course value to be updated for id ${id}`});
    }

    MongoClient.connect(url, (err, db) => {

        if(err) throw err;
        var dbObj = db.db('School_DB');
        dbObj.collection('Students').updateOne(query, updateDetails, (err, result) => {
            if(err) throw err;
            if(result != null){
                console.log(`Updated student with id ${id}: ${result.result}`);
                res.json(result);
            }else{
                res.status(400).json({ msg: `Item with id ${id} not found.`});
            }
            db.close();
        });
    });
});

/**
 *  Handle DELETE requests. 
 *  Deletes the student with the given id. 
 */
router.delete('/:id', (req, res) => {

    var id = req.params.id;
    var query = {id};

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        const dbObj = db.db("School_DB");
        dbObj.collection('Students').deleteOne(query, (err, result) => {
            if(err) throw err;
            if(result != null){
                console.log(`Deleting student with id ${id}`);
                res.json(result);
            }else{
                res.status(400).json({msg: `Student with id ${id} not found.`})
            }
            db.close();
        });
    });

});

module.exports = router;