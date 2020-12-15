# Student_mern_project
MERN Stack App for Student Database

App will allow user to add, edit, delete and list students. 

React will be used to render the Frontend web pages, Node JS and Express will be used to run the server/API and Mongo will act as the Database to store the student data. 

Steps to create the Mongo DB data:

> mongo
> use School_DB
> db.createsCollection('Students')
> db.Students.insert( {id: "1", name: "Niall Campbell", course: "CSSE"} )
> db.Students.insert( {id: "2", name: "John Smith", course: "History"} )
> db.Students.find().pretty()

