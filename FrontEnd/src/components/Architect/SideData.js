import React, { Component, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Modal, FormControl } from 'react-bootstrap';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
let value = false;
function AddMember(email, props) {

    { console.log("object", email) }
    if(email!==''){

    Axios.post('http://localhost:8080/add-member?email=' + JSON.parse(localStorage.getItem('beans')) + '&projectId=' + localStorage.getItem('groupId') + '&newEmail=' + email)
        .then((response) => {
            if (response.data.statusCode === 201) {
                value = true;
                console.log(response.data.statusCode)
                props.onHide()
            } else {

            }
        }).catch((error) => {
            NotifyInvalidCrediatial();

        })
    }else{
        NotifyInvalidCrediatial();

    }

}
export const NotifyInvalidCrediatial = () => {

    console.log("aaaaaaaaa")
    if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(<center>Invalid Username and/or Password</center>, {
            position: "top-center", autoClose: 7000,
        });
    }
}
export const MyVerticallyCenteredModal = (props) => {
 
    var email = '';

    return (
        <div>
        <ToastContainer />

        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ width: '25%', marginLeft: ' 35%' }} >

        <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-vcenter" >
                Add a User
      </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i className="fas fa-at" /></label>
                </div>
                <FormControl type="text" name="search" onChange={(event) => { email = event.target.value }} />


                {console.log("object", email)}
               <div onClick={props.onHide}> <Button variant="success" onClick={() => { AddMember(email) }} >add</Button></div>
                {console.log("===================", value)}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </div>
        
    )

}



export const Architect = () => {

    return (
        <div>
            <Link to="/createProject" className="input-group-prepend tab">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i><br /><br />
            </Link>
            <Link to="/taskPage" onClick={() => { localStorage.removeItem('groupId') }} className=" input-group-prepend tab " >
                <i class="fas fa-list-ul iconTask">&nbsp; My Task</i><br /><br />
            </Link>
            <Link to="/byme" className=" input-group-prepend tab" >
                <i class="fas fa-list-ul iconTask">&nbsp; Reported By Me</i><br /><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
           
        {/*     <Link to="/" className=" input-group-prepend tab">
                <i class="fas  fa-user-plus iconTask">&nbsp; Add User</i><br /><br />
            </Link> */}
            <Link to="/getPeople" className=" input-group-prepend tab">
                <i class="fas fa-users  iconTask">&nbsp; People</i><br /><br />
            </Link>
        </div>
    )
}

export const Lead = () => {

    return (
        <div>
            < Link to="/createProject" className=" input-group-prepend tab">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i><br /><br />
            </Link>

            <Link to="/taskPage" onClick={() => { localStorage.removeItem('groupId') }} className=" input-group-prepend tab " >
                <i class="fas fa-list-ul iconTask">&nbsp; My Task</i><br /><br />
            </Link>

            <Link to="/byme" className=" input-group-prepend tab" >
                <i class="fas fa-list-ul iconTask">&nbsp; Reported By Me</i><br /><br />
            </Link>

            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
          
            <Link to="/getPeople" className=" input-group-prepend tab" >
                <i class="fas fa-users  iconTask">&nbsp; People</i><br /><br />
            </Link>

            <hr /><hr />
        </div>

    )
}


export const Employee = () => {

    return (
        <div>

            <Link to="/taskPage" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; My Task</i><br /><br />
            </Link>
            <Link to="/byme" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i><br /><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
          
            <Link to="/getPeople" className=" input-group-prepend tab" >
                <i class="fas fa-users iconTask">&nbsp; People</i><br />
            </Link>
            <hr /><hr />
        </div>

    )
}


export const Architectproject = () => {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
             <Link to="/CreateTask"  className="input-group  tab">
                <i class="fas fa-users iconTask">&nbsp; Add Task</i><br/><br/>
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
            <Link onClick={() => setModalShow(true)} className="input-group  tab">
                <i class="fas fa-user-plus iconTask" > &nbsp; Add User</i><br/><br/>
            </Link>
         
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Link to="/members"  className="input-group  tab">
                    <i class="fas fa-users iconTask">&nbsp; Project Members</i><br/><br/>
            </Link>

           
            <hr /><hr />
        </div>
    )
}



export const Leadproject = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            <Link to="/CreateTask" className="input-group-prepend tab">
                <i class="fas fa-users iconTask">&nbsp; Add Task</i><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
            <Link onClick={() => setModalShow(true)} className="input-group-prepend tab">
                <i class="fas fa-user-plus iconTask" > &nbsp; Add User</i><br /><br />
            </Link>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
   
            <Link to="/members" className="input-group-prepend tab" >
                <i class="fas fa-users iconTask">&nbsp; Project Members</i><br /><br />
            </Link>

            
            <hr /><hr />
        </div>
    )
}


export const Employeeproject = () => {

    return (
        <div>
            <Link to="/CreateTask" className="input-group-prepend tab">
                <i class="fas fa-users iconTask">&nbsp; Add Task</i><br /><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
            <Link to="/members" className="input-group-prepend tab">
                <i class="fas fa-users iconTask">&nbsp; Project Members</i><br /><br />
            </Link>
           
            <hr /><hr />

        </div>

    )
}