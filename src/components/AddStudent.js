import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'



// properties addStudent is required, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, student:{ student_name: '', student_email: '', student_statusCode:'' } };
	  //this.state = {student: {student_name: '', student_email: '', student_statusCode:'' }};

    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };


	/* enter input values into component state info on field change */

    handleChange = (event) => {
      this.setState({student:{student_email: event.target.value}});
	  this.setState({student:{student_name: event.target.value}});
	  // Initialize student registration status code to 0 (no holds)
  	  this.setState({student:{student_statusCode: 0}});

    }

  // Save Student and close modal form
    handleAdd = () => {
       this.props.addStudent(this.state.student);
       this.handleClose();
    }
	
	
	
/* **** **** **** **** **** **** **** DAVDEV **** **** **** **** **** **** **** **** **** */
	/*
	 * fetch command needs a lot of help here.
	 * 
	*/
	
	// Add student
	addStudent = (student) => {
		const token = Cookies.get('XSRF-TOKEN');
	 
		fetch(`${SERVER_URL}/addStudent`,
		  { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
					   'X-XSRF-TOKEN': token  }, 
			body: JSON.stringify(student)
		  })
		.then(res => {
			if (res.ok) {
			  toast.success("Student successfully added", {
				  position: toast.POSITION.BOTTOM_LEFT
			  });
			  //this.fetchCourses();
			} else {
			  toast.error("Error when adding", {
				  position: toast.POSITION.BOTTOM_LEFT
			  });
			  console.error('Post http status =' + res.status);
			}})
		.catch(err => {
		  toast.error("Error when adding", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			console.error(err);
		})
	} 
	
/* **** **** **** **** **** **** **** END DAVDEV **** **** **** **** **** **** **** **** **** */


    render()  { 
	/*
		return (
			<div>
				<h4>Add Student</h4>
					
					<form>
						<label>
							Student name:&nbsp;
						</label>
						<input type="text" name="student_name" value={this.state.student_name} />
					</form>
					
					<form>
						<label>
							Student email:&nbsp;
						</label>
						<input type="text" name="student_email" value={this.state.student_email} />
					</form>
				
				<Button id="AddStudent" variant="outlined" color="primary" style=  {{margin: 10}} onClick={this.handleSubmit} >
					Add Student
				</Button>
				
				<Button component={Link} to={{pathname:'/'}} 
					variant="outlined" color="primary" style={{margin: 10}}>
					Home
				</Button>
				
			</div>
		);
	*/
	
	
      return (
          <div>
            <Button id="addStudentPopup" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
			<Button id="home" component={Link} to={{pathname:'/'}} 
				variant="outlined" color="primary" style={{margin: 10}}>
			  Home
			</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth id="email" label="Student Email" name="student_email" onChange={this.handleChange}  />
				  <TextField autoFocus fullWidth id="name" label="Student Name" name="student_name" onChange={this.handleChange}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
	  
      ); 
	
    }
}

// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;