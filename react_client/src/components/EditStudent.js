/**
 *  Component for editing Student. 
 */

 import React from 'react';

 class EditStudent extends React.Component {

    // state will store the details entered in the form
    state = {
        id: '',
        name: '',
        course: ''
    }

    /**
     *  Updates the state object as the user enters the info. 
     */
    onChange = (e) => {
        if(e.target.id === "StudentName"){
            this.setState({ name: e.target.value });
        }else{
            this.setState({ course: e.target.value });
        }
    }

    /**
     *  Triggered when user clicks submit button. 
     *  When the user enters the data, it is passed back to App.js
     *  After it resets the state variable
     * @param e 
     */
    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateStudentDetails(this.props.studentEditID, this.state.name, this.state.course);
        this.setState({ name: '', course: '' });
    }

    render()
    {
        return (
            <div className="formDiv">
                <h2>Edit Student</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="StudentName">New Name</label>
                        <input type="text" className="form-control" id="StudentName" placeholder="Enter student's name..." 
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label for="StudentCourse">New Course</label>
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

 export default EditStudent;