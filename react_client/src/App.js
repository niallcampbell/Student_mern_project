import React from  'react';
import './App.css';
import Header from './components/layout/Header';
import Table from './components/Table';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Axios from 'axios';

class App extends React.Component {

  //state will store the current list of students in the DB
  state = {
    students: [],
    showTable: true,
    showAddStudent: true,
    showEdit: false,
    studentEditID: ''
  }

  /**
   *  GET the students currently in the DB
   */
  componentDidMount() {
    Axios.get('http://localhost:5000/api/student').then((res) => {
        console.log(res.data);
        this.setState({ students: res.data });
    });
  }

  /**
   *  Info entered by user is passed back from the AddStudent.js form. 
   *  POST this info to the Express API. 
   *  Reload the page with the updated list of students. 
   */
  addStudentToDB(name, course) {
      Axios.post('http://localhost:5000/api/student',
            {
                name,
                course
            }
      ).then((res) => {
        console.log(res.data);
        alert(`Successfully added student ${name}`);
        window.location.reload();
      });
  }

  /**
   *  Remove student from DB. 
   */
  deleteStudent(id){
    Axios.delete(`http://localhost:5000/api/student/${id}`).then(() => {
      console.log(`Deleted student with id ${id}`);
      window.location.reload();
      alert(`Deleted student with id ${id}`);
    });
  }

  /**
   *  Update the details of the student. 
   */
  updateStudentDetails(id, name, course){

    Axios.put(`http://localhost:5000/api/student/${id}`, 
            {
              name,
              course
            }
    ).then(() => {
        console.log(`Updated student with id ${id}`);
        window.location.reload();
        alert(`Updated student with id ${id}`);
    });
  }

  /**
   *  Hide student table and show the edit div for given student. 
   *  show == boolean
   */
  showEditStudentDiv = (id) => {

    this.setState({ studentEditID: id, showEdit: true, showAddStudent: false, showTable: false});

  }
  
  render(){
    return (
      <div className="App">
          <Header />
          <p>App to list all the students in the school. </p>
          <br/>
          {this.state.showAddStudent && <AddStudent addStudentToDB={this.addStudentToDB} />}
          <br/>
          <br/>
          {this.state.showTable && <Table students={this.state.students} deleteStudent={this.deleteStudent}
              showEditStudentDiv={this.showEditStudentDiv}    />}
          <br/>
          {this.state.showEdit && <EditStudent updateStudentDetails={this.updateStudentDetails} studentEditID={this.state.studentEditID} />}
      </div>
    );
  }
  
}

export default App;
