
import React, { Component } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import Axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Footer from '../navBar/footer'

import './myprofile.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';


export default class MyProfile1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: JSON.parse(window.localStorage.getItem('beans')),
            userBean: '',

            show: false,
            showSorry: false,

            employeeId: '',
            employeeName: '',
            employeeNameUpper: '',
            designation: '',
            loading: false
        }
        this.getProfile = this.getProfile.bind(this);
        console.log('bean inside constructor: ', this.state.email);

    } // End of constructor

    getProfile() {
        console.log('inside get profile')
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-profile?email=' + this.state.email).then((response) => {

                if (response.data.message === 'Success') {
                    this.setState({
                        userBean: response.data.userBean[0],
                        employeeId: response.data.userBean[0].employeeId,
                        employeeName: response.data.userBean[0].employeeName,
                        employeeNameUpper: response.data.userBean[0].employeeName.toUpperCase(),
                        designation: response.data.userBean[0].designation,
                    })
                    console.log("userBean", this.state.userBean);
                }
            }).catch((error) => {
                console.log('Error', error);
                this.NotifyServerOffline();
            })
        }// end of if
    } //End of getProfile


    componentDidMount() {
        this.getProfile();
    }


    editUser(bean) {
        let obj = this.state.userBean;
        this.setState({
            show: !this.state.show,
        })
    }   //end of edit user

    handleClose() {
        this.setState({ show: !this.state.show })
        this.getProfile();
    }
    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(<center> Server Did Not Respond</center>, {
            position: "top-center", autoClose: 7000,
        });
    }
}

    NotifyUpdateFailed = () => {
        if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(<center>Update Failed Server Did Not Respond</center>, {
            position: "top-center", autoClose: 7000,
        });
    }
}

    updateUserData() {
        this.setState({ loading: true })
        const beans = this.state;
        const userData = beans;
        console.log('AccountData', userData);
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.put('http://localhost:8080/update-user?id=' + this.state.userBean.employeeId, userData).then((response) => {

                this.handleClose();

                if (response.data.statusCode === 201) {
                    this.setState({ loading: false })
                    console.log('Updated Successfully');

                    console.log("       ", this.state.userBean)
                    this.NotifyUpdateSuccess();

                } else if (response.data.StatusCode === 401) {
                    this.setState({ loading: false })
                }

            }).catch((error) => {
                console.log('Error', error);
                this.setState({ loading: false })
                this.NotifyUpdateFailed();
            })
        }
    }  // end of update-User-Data


    NotifyUpdateSuccess = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>Profile updated Successfully</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }

    render() {
        let cardStyle = {
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            width: '35%',
            marginLeft: '30%',
            marginTop: '5%'
        }

        let containerStyle = {
            padding: '2px 16px'
        }
        console.log("==================", this.state.userBean)

        return (
            <div>
             
                <div class="container-fluid ">
                    <div style={{ textAlign: 'center' }}>

                        
                        <div style={cardStyle}>
                            <div><b style={{ fontSize: '40px', color: 'gray' }}>Profile Details</b>
                            </div>
                            <ToastContainer />
                            <hr></hr>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-I5E9Vn6dFsuJnrJfJVcpNp6KNQ74ZSjKoGn5t9-pGLddxDG" style={{ width: '40%' }} />
                            <div style={containerStyle}>
                                <h5 ><b className="h44">{this.state.userBean.employeeId}</b></h5>
                                <h5 ><b className="h44" >{this.state.employeeNameUpper}</b></h5>
                                <h5><b className="h33">{this.state.userBean.email}</b></h5>
                                <h5><b className="h33"> {this.state.userBean.designation}</b></h5>
                            </div>
                            <hr></hr>
                            <button onClick={this.editUser.bind(this, this.state.beans)} className="btn btn-outline-success">Edit</button>
                            <hr></hr>
                        </div>
                    </div>

                    <Modal centered show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ width: '100%', textAlign: 'center' }}>Update User Details </Modal.Title>
                            <br />


                        </Modal.Header>
                        <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
                            <PropagateLoader
                                size={10}
                                color={'#123abc'}
                                loading={this.state.loading}
                            />
                        </div>

                        <Modal.Body>
                            <div className="row ">
                                <div className="col-10" style={{ width: '100%', margin: 'auto' }}>
                                    <label>Name:</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend ">
                                            <label className="input-group-text"><i className="fas fa-user" /></label>
                                        </div>
                                        <input type="text" title="Change Name" onChange={(event) => { this.setState({ employeeName: event.target.value }) }}
                                            value={this.state.employeeName} className="form-control" placeholder="Employee Name" />
                                    </div>
                                    <label>Email:</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend ">
                                            <label className="input-group-text"><i className="fas fa-at" /></label>
                                        </div>
                                        <input type="text" title="Change Email" onChange={(event) => { this.setState({ email: event.target.value }) }}
                                            value={this.state.email} className="form-control" placeholder="Email" />
                                    </div>
                                    <label>Designation:</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend ">
                                            <label className="input-group-text"><i className="fas fa-user-tie" /></label>
                                        </div>
                                        <input type="text" title="Change Designation" onChange={(event) => { this.setState({ designation: event.target.value }) }}
                                            value={this.state.designation} className="form-control" placeholder="Designation" />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-success justify-content-center" onClick={this.updateUserData.bind(this)}>
                                Save Changes
</button>
                        </Modal.Footer>
                    </Modal>

                </div>
                <Footer />
            </div>
        )
    } // End of render()
}
