import React, { Component, useState } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Button, Modal, FormControl, Fade } from 'react-bootstrap';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
let value = false;
function AddMember(email, props) {

    { console.log("object", email) }
    if (email !== '') {

        Axios.post('http://localhost:8080/add-member?email=' + JSON.parse(localStorage.getItem('beans')) + '&projectId=' + localStorage.getItem('groupId') + '&newEmail=' + email)
            .then((response) => {
                if (response.data.statusCode === 201) {
                    value = true;
                    console.log(response.data.statusCode)
                    props.onHide()
                } else {

                }
            }).catch((error) => {

            })
    } else {

    }
}
/* export const NotifyInvalidCrediatial = () => {

    console.log("aaaaaaaaa")
    if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(<center>Invalid Username and/or Password</center>, {
            position: "top-center", autoClose: 7000,
        });
    }
} */
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
            <Link to="/getPeople" className=" input-group-prepend tab">
                <i class="fas fa-users  iconTask">&nbsp; People</i><br /><br />
            </Link>
            <Link to="/searchPage" className=" input-group-prepend tab">
                <i class="fas fa-search  iconTask">&nbsp; Search</i><br /><br />
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
                <i class="fas fa-list-ul iconTask">&nbsp;  To Me</i><br /><br />
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
            <Link to="/searchPage" className=" input-group-prepend tab">
                <i class="fas fa-search  iconTask">&nbsp; Search</i><br /><br />
            </Link>

            <hr /><hr />
        </div>

    )
}


export const Employee = () => {

    return (
        <div>

            <Link to="/taskPage" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; To Me</i><br /><br />
            </Link>
            <Link to="/byme" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Reported By Me</i><br /><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>

            <Link to="/getPeople" className=" input-group-prepend tab" >
                <i class="fas fa-users iconTask">&nbsp; People</i><br />
            </Link>
            <Link to="/searchPage" className=" input-group-prepend tab">
                <i class="fas fa-search  iconTask">&nbsp; Search</i><br /><br />
            </Link>
            <hr /><hr />
        </div>

    )
}


export const Architectproject = () => {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            <Link to="/CreateTask" className="input-group  tab">
                <i class="fas fa-users iconTask">&nbsp; Add Task</i><br /><br />
            </Link>
            <Link to="/completedTask" className=" input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i><br /><br />
            </Link>
            <Link onClick={() => setModalShow(true)} className="input-group  tab">
                <i class="fas fa-user-plus iconTask" > &nbsp; Add User</i><br /><br />
            </Link>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Link to="/members" className="input-group  tab">
                <i class="fas fa-users iconTask">&nbsp; Project Members</i><br /><br />
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






/* export const Example = (props) => {
    const [open, setOpen] = useState(false);
    console.log("=============aaaaaaaa==", props.sendCount)
    var i = 0;
    return (
        <div>

            <small
                onClick={() => setOpen(!open)}
                aria-controls="example-fade-text"
                aria-expanded={open}
                style={{ cursor: 'pointer', color: 'black', fontSize: '110%' }}
            >
                click here to know more Project details
        </small>
            <Fade in={open}>
                <div id="example-fade-text">

                    <div style={{ marginLeft: "2%", marginTop: '5%' }}>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ProjectId</th>
                                    <th scope="col">Project Name</th>
                                    <th scope="col">People</th>
                                    <th scope="col">Creation Date</th>
                                    <th scope="col">Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.sendData.map((projectData) => {
                                        console.log('tabledate', projectData.id)
                                        return (
                                            <tr className="ProjectTable" onClick={() => {
                                                {
                                                    TaskHome.taskHome(props, projectData)
                                                }
                                            }}>
                                                <td scope="row">{projectData.projectPkBean.projectId}</td>
                                                <td >{projectData.projectName}</td>

                                                <td>{props.sendCount[i++]}</td>

                                                <td>{projectData.createdDate}</td>
                                                <td>{projectData.deadline}</td>
                                            </tr>

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fade>
        </div>
    );
} */