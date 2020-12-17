import React from  'react';
import './App.css';
import Header from './components/layout/Header';
import Table from './components/Table';
import AddStudent from './components/AddStudent';
import Axios from 'axios';

class App extends React.Component {

  //state will store the current list of students in the DB
  state = {
    students: []
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
        window.location.reload();
      });
  }

  render(){
    return (
      <div className="App">
          <Header />
          <p>App to list all the students in the school. </p>
          <br/>
          <AddStudent addStudentToDB={this.addStudentToDB} />
          <br/>
          <br/>
          <Table students={this.state.students}/>
          <br/>
      </div>
    );
  }
  
}

export default App;
