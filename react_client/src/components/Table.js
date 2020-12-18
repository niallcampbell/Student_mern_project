/**
 *  Class component for displaying the Student details in a table. 
 *  Gets an array of JSON object data from the Express API. 
 *  Sends each JSON object to the TableRow component to generate a row with the object's data. 
 */

import React from 'react';
import TableRow from './TableRow';

 class Table extends React.Component {

    render() {

        if(this.props.students){
            var studentDetails = this.props.students.map((s) => {
                return <TableRow key={s.id} student={s} deleteStudent={this.props.deleteStudent}
                                showEditStudentDiv={this.props.showEditStudentDiv}/>
            });
        } 
        
        // will render the TableRow objects in the studentDetails array
        return (
            <div className="StudentDetailsTable">
                <h2>Students</h2>
                <table className="center table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentDetails}
                    </tbody>
                </table>
            </div>
        );
    }
 }

 export default Table;
