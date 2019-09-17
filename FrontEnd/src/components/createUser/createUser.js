import React, { Component } from 'react';
import $ from 'jquery'
import Axios from 'axios'
import './createUser.css'
import SimpleNavBar from '../navBar/SimpleNavBar';

export class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeId: '',
            employeeName: '',
            email: '',
            password: '',
            designation: '',
            show: false,
            show2:false

        }
    }
    cancel(e) {
        e.preventDefault();
        this.props.history.push('/')
    }
    create(e) {
        e.preventDefault();

        Axios.post('http://localhost:8080/create-user', this.state)
            .then((response) => {
                console.log(" details" + this.state.employeeId)

                console.log(response.data.message)
                if (response.data.statusCode === 201) {
                    document.getElementById("success").hidden = false;
                    $('#successMessage').html("User Created successfully Redirecting to loginPage");  
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 1000);              
                    this.props.history.push('/');

                } else if(response.data.statusCode === 401){
                    this.setState({ show2: true })
                    setTimeout(() => {
                        this.setState(  this.setState({ show2: false })    )
                    }, 2000);
                }

            }).catch((error) => {
                this.setState({ show: true })
                setTimeout(() => {
                    this.setState(  this.setState({ show: false })    )
                }, 2000);
                console.log(error);
            })
    }

    componentDidMount() {
        $(document).ready(function () {
            $('#submit').click(function (e) {
                var pass = (document.getElementById("password").value);
                var rpass = (document.getElementById('password_confirmation').value);
                var name = (document.getElementById("Name").value).trim();
                var designation = (document.getElementById("Designation").value).trim();

                var email = (document.getElementById("email").value).trim();

                if (name == "" && designation == "" && email == "" && pass == "" && rpass == "") {
                    document.getElementById("alert").hidden = false;
                    $('#message').html("All fields are Mandatory").css('font-size', '12px');
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 2000);
                    
                    return false;


                }
                else if (name == "") {

                    document.getElementById("alert").hidden = false;
                    $('#message').html("Name field is Empty ").css('font-size', '12px').css('text-align', 'center');
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 4000);
                    return false;
                }
                else if (designation == "") {

                    document.getElementById("alert").hidden = false;
                    $('#message').html("designation is Empty ").css('font-size', '12px').css('text-align', 'center');
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 4000);
                    return false;
                }
                else if (pass != rpass) {

                    document.getElementById("alert").hidden = false;
                    $('#message').html("Passwords do not match").css('font-size', '12px').css('text-align', 'center');
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 2000);
                    return false;
                } else {
                    $('#message').html("");
                    document.getElementById("alert").hidden = true;
                    return true;
                }
            });
        });
    }
    render() {
        return (
            <div>
            <SimpleNavBar/>
            <div className="container-fluid mt-5">

                {this.state.show ? <div id="alertHead" class="alert alert-danger" role="alert" >User Creation Failed server not responding </div> : null}
                {this.state.show2 ? <div id="alertHead" class="alert alert-danger" role="alert">User Creation Failed email already exist </div> : null}
                <div style={{ textAlign: '"center"' }}>
                                        <div id="success" className="alert alert-success" role="success" hidden="true">
                                            <h6 id="successMessage" />
                                        </div>
                                    </div>
                <div className="row">
                    <div id="container" className="col-auto container mt-5">
                        <div id="create" className="card ">
                            <div id="cardHead" className="card-header">
                                <legend className="text-center">Create User</legend>
                            </div>
                            <div className="card-body">
                                <form role="form" onSubmit={this.create.bind(this)}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-user" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="text" name="Name" title="Enter Name" id="Name" placeholder="Enter name of Employee" onChange={(event) => {
                                            this.setState({
                                                employeeName: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-at" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="email" name="email" id="email" title="Enter Email" placeholder="Enter Email" onChange={(event) => {
                                            this.setState({
                                                email: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-user-tie" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="text" name="Designation" title="Enter Desination" id="Designation" placeholder="Enter Designation" onChange={(event) => {
                                            this.setState({
                                                designation: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-key" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="password" name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="form-control-plaintext input-group-text"><i className="fas fa-key" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="password" title="Confirm Password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" />
                                    </div>
                                    <div style={{ textAlign: '"center"' }}>
                                        <div id="alert" className="alert alert-danger" role="alert" hidden="true">
                                            <h6 id="message" />
                                        </div>
                                    </div>
                                    <div className="input-group mb-3 container-fluid">
                                        <input type="reset" id="reset" title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm" />

                                        <input type="submit" id="submit" title="submit" className="form-control-plaintext btn btn-outline-success btn-sm" />
                                        <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-info btn-sm" onClick={this.cancel.bind(this)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        )
    }
}

export default CreateUser