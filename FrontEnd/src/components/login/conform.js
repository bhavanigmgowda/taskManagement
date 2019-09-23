import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './forgotPasswordEmailCheck.css'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
import Footer from '../navBar/footer'
export default class ConfirmPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmpassword: '',
            show: false,
            email: ''
        }

    }



    setPassword = (event) => {
        console.log("props" + this.props.history.location.state.email)
        let email = this.props.history.location.state.email;
        event.preventDefault();
        Axios.patch('http://localhost:8080/update-password' + "?password=" + this.state.password + '&email=' + email)
            .then((response) => {
                console.log(response)

                if (response.data.statusCode == 201) {
                    console.log("Data Found ...");
                    alert("password Changed")
                    this.props.history.push("/")
                }
                else {
                    console.log("Data Not Found ...");


                }

            }).catch((error) => {

                console.log(error)
            })


    }

    render() {
        return (
            <div>
                <SimpleNavBarCreate />

                <div className="container-fluid mt-5">
                    <div style={{ textAlign: '"center"' }}>
                        <div id="success" className="alert alert-success" role="success" hidden="true">
                            <h6 id="successMessage" />
                        </div>
                    </div>
                    <div className="row">
                        <div id="container" className="col-auto container mt-5">
                            <div id="create" className="card shadow-lg ">
                                <div id="cardHead" className="card-header text-center">
                                    <h3>Change Password</h3>
                                    <p>Please enter new password and confirm password</p>
                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={this.setPassword.bind(this)}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-key" /></label>
                                            </div>
                                            <input required type="password" className="form-control" placeholder="Enter New Password" value={this.state.password}
                                                onChange={(event) => { this.setState({ password: event.target.value }) }} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-key" /></label>
                                            </div>
                                            <input required type="password" className="form-control" placeholder="Enter Confirm Password" value={this.state.confirmpassword}
                                                onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} />
                                        </div>
                                        {this.state.show ? <div>
                                            <h6 id="alert" className="alert alert-danger" >Invalid Credentials</h6>
                                        </div> : null}
                                        {this.state.showServer ? <div>
                                            <h6 id="alert" className="alert alert-danger" >Server Not Responding</h6>
                                        </div> : null}
                                        <div className="input-group mb-2 mt-2 container-fluid">
                                        </div>
                                        {this.state.show ? <div class="alert alert-success" style={{ color: "White" }} >Password Change Successfully...!</div> : null}
                                        <div id="loginButtton">
                                            <button id="btnlogin" className="btn btn-primary" type="submit">Change</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
               
            </div>
        )
    }
}
