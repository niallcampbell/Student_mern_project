/*
    Index.js will be used to run the Express web server. 
*/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
    console.log(`Express web server listening on port ${PORT}`);
});

const apiRouter = require('./API/router');
app.use('/api/student', apiRouter);

