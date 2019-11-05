import React, { Component, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Modal, FormControl } from 'react-bootstrap';
import Axios from 'axios';
let value=false;
function AddMember(email,props) {
    {console.log("object",email)}

    Axios.post('http://localhost:8080/add-member?email='+JSON.parse(localStorage.getItem('beans'))+'&projectId='+localStorage.getItem('groupId')+'&newEmail='+email)
        .then((response) => {
            if (response.data.statusCode === 201) {
                value=true;
                console.log(response.data.statusCode)
               props.onHide()
            }
        }).catch((error) => {
            console.log(error)
        })
}

export const MyVerticallyCenteredModal = (props) => {
    var email='aa';
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text"><i className="fas fa-at" /></label>
                    </div>
                    <FormControl type="text" name="search" onChange={(event)=>{email=event.target.value}} />
                            
          
                    {console.log("object",email)}
                    <Button onClick={()=>{AddMember(email)}}>add</Button>
                    {console.log("===================",value)}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}



export const Architect = () => {

    return (
        <div>
            <Link to="/createProject" className="input-group-prepend tab">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </Link>
            <Link to="/taskPage" onClick={() => { localStorage.removeItem('groupId') }} className="navbar-brand input-group-prepend tab " >
                <i class="fas fa-list-ul iconTask">&nbsp; My Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-list-ul iconTask">&nbsp; Reported By Me</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>        
            <Link to="/getPeople" className="input-group-prepend iconTask">
                <i class="fas fa-users  iconTask">&nbsp; People</i>
            </Link>
        </div>
    )
}

export const Lead = () => {

    return (
        <div>
            <div className="input-group-prepend">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </div>
            <Link to="/taskPage" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; My Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>

            <Link to="/getPeople" className="input-group-prepend iconTask">
                <i class="fas fa-users  iconTask">&nbsp; People</i>
            </Link>

        </div>

    )
}


export const Employee = () => {

    return (
        <div>

            <Link to="/taskPage" className="navbar-brand input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; My Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>
      
            <Link to="/getPeople" className="input-group-prepend iconTask">
                <i class="fas fa-users  iconTask">&nbsp; People</i>
            </Link>
        </div>

    )
}


export const Architectproject = () => {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            <div onClick={() => setModalShow(true)} className="input-group iconTask tab">
                <i class="fas fa-user-plus" > &nbsp; Add User</i>
            </div>
            <div className="input-group iconTask tab">
                <i class="fas fa-user-times" >&nbsp; Remove User</i>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            
            <Link to="/members" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Project Members</i>
            </Link>
            <Link to="/createTask" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Add Task</i>
            </Link>
            <hr /><hr />
        </div>
    )
}


/* function Architectproject() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>
    );
  }
  
  render(<Architectproject />); */

export const Leadproject = () => {
    const [modalShow, setModalShow] = React.useState(false);


    return (
        <div>
             <div onClick={() => setModalShow(true)} className="input-group iconTask tab">
                <i class="fas fa-user-plus" > &nbsp; Add User</i>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="input-group-prepend iconTask">
                <i class="fas fa-user-times" >&nbsp; Remove User</i>g
            </div>
             
            <Link to="/members" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Project Members</i>
            </Link>
            <Link to="/createTask" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Add Task</i>
            </Link>
            <hr /><hr />

        </div>

    )
}


export const Employeeproject = () => {

    return (
        <div>
           
            <Link to="/members" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Project Members</i>
            </Link>
            <Link to="/createTask" className="input-group-prepend iconTask">
                <i class="fas fa-users">&nbsp; Add Task</i>
            </Link>
            <hr /><hr />

        </div>

    )
}