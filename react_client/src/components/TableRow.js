/**
 *  Class component for a table row to display student details. 
 *  Props: student object - {id, name, course}
 *  Renders a table row with the data in the cells. 
 */

 import React from 'react';

 class TableRow extends React.Component {

    /**
     *  Check if the value has been returned yet from the server
     */
    render(){
        return (
            <tr>
                <td>{this.props.student ? this.props.student.id : null}</td>
                <td>{this.props.student ? this.props.student.name : null}</td>
                <td>{this.props.student ? this.props.student.course : null}</td>
                <td><button type="button" class="btn btn-primary">Edit</button>  <button type="button" class="btn btn-danger">Delete</button></td>
            </tr>
        );
    }
 }

 export default TableRow;