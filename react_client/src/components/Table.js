/**
 *  Class component for displaying the Student details in a table. 
 *  Gets an array of JSON object data from the Express API. 
 *  Sends each JSON object to the TableRow component to generate a row with the object's data. 
 */

import React from 'react';
import TableRow from './TableRow';

 class Table extends React.Component {

    state = {
        students: null
    }

    componentDidMount() {
        this.callExpressAPI()
            .then((res) => {

                // create array with values
                var array = res.map((student) => {
                    var x = {id: student.id, name: student.name, course: student.course};
                    return x;
                });

                this.setState({students: array});
            })
            .catch(err => console.log(err));
    }

    /**
     *  GET the students data from the Express API
     */
    callExpressAPI = async () => {
        const response = await fetch('http://localhost:5000/api/student');
        const body = await response.json();

        if(response.status !== 200){
            throw Error(body.message);
        }

        return body;
    };

    render() {

        if(this.state.students){
            var studentDetails = this.state.students.map((s) => {
                return <TableRow key={s.id} student={s} />
            });
        } 
        
        // will render the TableRow objects in the studentDetails array
        return (
            <div className="StudentDetailsTable">
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
