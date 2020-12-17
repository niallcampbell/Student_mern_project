import React from  'react';
import './App.css';
import Header from './components/layout/Header';
import Table from './components/Table';

class App extends React.Component {

  render(){
    return (
      <div className="App">
          <Header />
          <p>App to list all the students in the school. </p>
          <br/>
          <Table />
      </div>
    );
  }
  
}

export default App;
