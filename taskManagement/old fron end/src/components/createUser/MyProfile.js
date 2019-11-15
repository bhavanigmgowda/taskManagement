import React, { Component } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import Axios from 'axios';
import SearchNavabar from '../navBar/SearchNavabar';
import './newprofile.css'

export default class MyProfile1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beans: JSON.parse(window.localStorage.getItem('beans')),
           // Id: '',
            show: false,
        }
        console.log('bean inside constructor', this.state.beans);

/*         this.state.beans = JSON.parse(localStorage.getItem("beans"));
 */    }



    editUser(bean) {

        this.setState({
            empName: bean.empName,
            email: bean.email,
            designation: bean.designation,
            show: !this.state.show,
            empId: bean.empId,
            password: bean.password
        })
        console.log("updatedata",this.state.beans)
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }

    updateUserData() {
        const beans = this.state;
        const userData = beans;
        console.log('AccountData',userData);
        if(JSON.parse(window.localStorage.getItem('isValid'))){
        Axios.put('http://localhost:8080/updateUser',userData).then((response) => {
            console.log('Updated Successfully');
            this.handleClose();

        }).catch((error) => {
            console.log('Error', error);
        })}
       
    }
    render() {
        return (
            <div>
                <SearchNavabar />
                <div class="container-fluid ">
                    <div class="row">
                        <div class=" offset-md-4 col-md-4 ">
                            <div class="card" id="myprofile">
                                <h4 id="chead" class="card-header" style={{ height: '60%' }}>
                                    <center>  User Details</center>
                                </h4>
                                <div class="card-body " id="card">

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '100px' }} className="input-group-text" id="basic-addon1">EId </span>
                                        </div>


                                        <h6 className="h5"> {this.state.beans.empId}</h6>


                                    </div>



                                    <div className="input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '100px' }} className="input-group-text" id="basic-addon1">Name </span>
                                        </div>

                                        <h6 className="h5"> {this.state.beans.empName}</h6>




                                    </div>



                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '100px' }} className="input-group-text" id="basic-addon1">Email </span>
                                        </div>


                                        <h6 className="h5"> {this.state.beans.email}</h6>


                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '100px' }} className="input-group-text" id="basic-addon1">Designation </span>
                                        </div>

                                        <h6 className="h5"> {this.state.beans.designation}</h6>
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '100px' }} className="input-group-text" id="basic-addon1">Password </span>
                                        </div>

                                        <h6 className="h5"> {this.state.beans.password}</h6>
                                    </div>



                                </div>
                                <div class="card-footer">
                                    <center>  <button onClick={this.editUser.bind(this, this.state.beans)} className="btn btn-outline-success">Edit</button></center>

                                </div>
                            </div>
                        </div>
                    </div>


                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col">
                                    <input type="text" onChange={(event) => { this.setState({ empName: event.target.value }) }}
                                        value={this.state.empName} className="form-control" placeholder="Employee Name" />
                                </div>

                                <div className="col">
                                    <input type="text" onChange={(event) => { this.setState({ email: event.target.value }) }}
                                        value={this.state.email} className="form-control" placeholder="Email" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <input type="text" onChange={(event) => { this.setState({ designation: event.target.value }) }}
                                        value={this.state.designation} className="form-control" placeholder="Designation" />
                                </div>

                                <div className="col">
                                    <input type="text" onChange={(event) => { this.setState({ password: event.target.value }) }}
                                        value={this.state.password} className="form-control" placeholder="Password" />
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
                    </Modal>
                </div>
            </div>
        )
    }
}



