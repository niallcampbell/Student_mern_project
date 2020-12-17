/**
 *  Class component for adding a student. 
 *  Renders a form that allows a user to create a new student. 
 */

 import React from 'react';

 class AddStudent extends React.Component {

    // state will store the details entered in the form
    state = {
        name: '',
        course: ''
    }

    /**
     *  Updates the state object as the user enters the info. 
     * @param e 
     */
    onChange = (e) => {
        if(e.target.id === "StudentName"){
            this.setState({ name: e.target.value });
        }else{
            this.setState({ course: e.target.value });
        }
    }

    /**
     *  When the user enters the data, it is passed back to App.js
     *  After it resets the state variable
     * @param e 
     */
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addStudentToDB(this.state.name, this.state.course);
        this.setState({ name: '', course: '' });

    }

    render() {
        return (
            <div className="formDiv">
                <h2>Add Student</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="StudentName">Name</label>
                        <input type="text" className="form-control" id="StudentName" placeholder="Enter student's name..." 
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label for="StudentCourse">Course</label>
                        <input type="text" className="form-control" id="StudentCourse" placeholder="Enter course name..."
                            onChange={this.onChange} />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
 }

 export default AddStudent;