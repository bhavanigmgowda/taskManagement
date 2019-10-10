import React, { Component } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import Axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Footer from '../navBar/footer'

import './myprofile.css'

export default class MyProfile1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: JSON.parse(window.localStorage.getItem('beans')),
            userBean: '',

            show: false,
            showMessage: false,
            showServer: false,
            showSorry: false,

            employeeId: '',
            employeeName: '',
            designation: '',



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
            })
        }// end of if
    } //End of getProfile


    componentDidMount() {
        this.getProfile();
    }


    editUser(bean) {
        let obj = this.state.userBean;
        this.setState({
            //     employeeName:  '',
            //     email:'',
            //     designation:'',
            show: !this.state.show,
            //     employeeId: '',
            //     password: ''
        })
        // obj.employeeName = bean.employeeName;
        // obj.employeeId = bean.employeeId;
        // obj.email = bean.email;
        // obj.designation = bean.designation;
        // console.log("updatedata", this.state.beans)
    }   //end of edit user

    handleClose() {
        this.setState({ show: !this.state.show })
        this.getProfile();
    }




    updateUserData() {
        debugger
        // var obj = {
        //     employeeName: 'this.state.employeeName',
        //     designation: 'this.state.designation',
        //     email: 'this.state.email'
        // }
        const beans = this.state;
        const userData = beans;
        console.log('AccountData', userData);
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.put('http://localhost:8080/update-user?id=' + this.state.userBean.employeeId, userData).then((response) => {

                this.handleClose();

                if (response.data.statusCode === 201) {
                    console.log('Updated Successfully');

                    console.log("       ", this.state.userBean)

                    this.setState({ showMessage: true })
                    setTimeout(() => {
                        this.setState({
                            showMessage: false
                        })
                    }, 10000);
                } else if (response.data.StatusCode === 401) {


                } 

            }).catch((error) => {
                console.log('Error', error);

                this.setState({ showServer: true })
                setTimeout(() => {
                    this.setState({
                        showServer: false
                    })
                }, 10000);
            })
        }
    }  // end of update-User-Data

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
                {/* <SearchNavabar /> */}
                <div class="container-fluid ">


                    <div style={{ textAlign: 'center' }}>

                    {this.state.showMessage ? <div id="alertHead" className="alert alert-success " ><h6 className="font-weight-bold">Profile updated Successfully</h6> </div> : null}

                        {this.state.showSorry ? <div id="alertHead" className="alert alert-danger " ><h6 className="font-weight-bold">sorry, you haven't done any changes to update the profile!!</h6> </div> : null}
                        <div style={cardStyle}>
                            <div><b style={{ fontSize: '40px', color: 'gray' }}>Profile Details</b></div>
                            <hr></hr>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ub9pAdXyp3SunhYlBjGcqu82RL20pRSumjUnJ3e2tRiF_bS4" style={{ width: '40%' }} />
                            <div style={containerStyle}>


                                <h4  ><b className="h4">{this.state.userBean.employeeId}</b></h4>
                                <h4 ><b className="h4" >{this.state.employeeNameUpper}</b></h4>

                                <h4 ><b className="h3">{this.state.userBean.email}</b></h4>
                                <h5 ><b className="h3"> {this.state.userBean.designation}</b></h5>
                            </div>
                            <hr></hr>
                            <button onClick={this.editUser.bind(this, this.state.beans)} className="btn btn-outline-success">Edit</button>
                            <hr></hr>
                        </div>
                    </div>



                    <Modal centered show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>

                            <Modal.Title style={{ width: '100%', textAlign: 'center' }}>Update User Details </Modal.Title><br />
                            {this.state.showServer ? <div id="alertHead" className="alert alert-danger " role="alert" ><h6 className="font-weight-bold">update Failed Server Failed to Respond</h6> </div> : null}

                        </Modal.Header>
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






                    {/* 
                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Name</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ employeeName: event.target.value }) }}
                                        value={this.state.userBean.employeeName} className="form-control" placeholder="Employee Name" />
                                </div>

                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Email</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ email: event.target.value }) }}
                                        value={this.state.userBean.email} className="form-control" placeholder="Email" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Designation</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ designation: event.target.value }) }}
                                        value={this.state.userBean.designation} className="form-control" placeholder="Designation" />
                                </div>


                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-danger" onClick={this.handleClose.bind(this)}>
                                Close
</button>
                            <button className="btn btn-outline-success" onClick={this.updateUserData.bind(this)}>
                                Save Changes
</button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
                <Footer />
            </div>
        )
    } // End of render()
}



