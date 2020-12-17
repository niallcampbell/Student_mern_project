/*
    Index.js will be used to run the Express web server. 
*/

const express = require('express');
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware 
app.use(express.json()); //required for handling POST requests
app.use(express.urlencoded({extended: false}));
app.use(cors()); //required for allowing requests from external servers

app.listen(PORT, () => {
    console.log(`Express web server listening on port ${PORT}`);
});

const apiRouter = require('./API/router');
app.use('/api/student', apiRouter);

