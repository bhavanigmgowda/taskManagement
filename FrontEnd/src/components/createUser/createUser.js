
import React, { Component } from 'react';
import $ from 'jquery'
import Axios from 'axios'
import './create.css'
import Footer from '../navBar/footer'
import SimpleNavBar from '../navBar/SimpleNavBar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeId: '',
            employeeName: '',
            email: '',
            password: '',
            designation: '',
            showName: false,
            showEmail: false,
            showDesignation: false,
            showPassword: false,
            showConfirmPassword: false,
            type: 'password',
            typec: 'password',
            showPasswordCriteria: false,
            showEmailInvalid: false,
            loading: false
        }
    }

    handleClick = () => this.setState(({ type }) => ({ type: type === 'text' ? 'password' : 'text' }))
    handleClickConfirm = () => this.setState(({ typec }) => ({ typec: typec === 'text' ? 'password' : 'text' }))

    cancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }
    create(e) {

        e.preventDefault();
        this.setState({ loading: true });
        Axios.post('http://localhost:8080/create-user', this.state)
            .then((response) => {
                console.log(" details" + this.state.employeeId)

                console.log(response.data.message)
                if (response.data.statusCode === 201) {
                    this.setState({ loading: false });

                    this.NotifyRegistrationSuccess();
                    setTimeout(() => {
                        this.props.history.push('/Login');
                    }, 3000)

                } else if (response.data.statusCode === 401) {
                    this.setState({ loading: false });
                    this.NotifyEmailExists();
                }

            }).catch((error) => {
                this.NotifyServerOffline();
                this.setState({ loading: false })
                console.log(error);
            })
    }
    hideOnReset = () => {
        this.hideName();
        this.hidePassword();
        this.hideCPassword();
        this.hideEmail();
        this.hideDesignation();
        this.setState({ showEmailInvalid: false });
        this.setState({ showPasswordCriteria: false });
    }

    hideName = () => {
        this.setState({
            showName: false
        })
    }
    hideEmail = () => {
        this.setState({
            showEmail: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }
    hidePassword = () => {
        this.setState({
            showPassword: false
        })
    }
    hideCPassword = () => {
        this.setState({
            showConfirmPassword: false
        })
    }


    handleEmail = () => {
        var that = this;
        var email = document.getElementById('email').value.trim();
        if (email !== "") {
            let lastAtPos = (document.getElementById("email").value).lastIndexOf('@');
            let lastDotPos = (document.getElementById("email").value).lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && (document.getElementById("email").value).indexOf('@@') == -1 && lastDotPos > 2 && ((document.getElementById("email").value).length - lastDotPos) > 2)) {
                that.setState({ showEmailInvalid: true })
                return false;
            }
        }
        that.setState({ showEmailInvalid: false })
        return true;
    }


    handleChange = (pass) => {
        var pass = document.getElementById('password').value;
        var that = this;
        var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        var test = reg.test(pass);
        if (test) {
            that.setState({ showPasswordCriteria: false })
            return true;
        } else {
            that.setState({ showPasswordCriteria: true })
            return false;
        }
    }

    NotifyFieldMandatory = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.info(<center>All Fields Are Mandatory</center>, {
                position: "top-center", autoClose: 5000
            });
        }
    }
    NotifyMismatchPassword = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Passwords Didn't Match Try Again</center>, {
                position: "top-center", autoClose: 5000,
            });
        }
    }

    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Registration Failed Server Did Not Respond</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    NotifyEmailExists = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.warning(<center>Registration Failed Email Already Exist</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    NotifyRegistrationSuccess = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>Registration Success</center>, {
                position: "top-center", autoClose: false,
            });
        }
    }

    componentDidMount() {
        var that = this;
        $(document).ready(function () {
            $('#submit').click(function (e) {

                var pass = (document.getElementById("password").value).trim();
                var rpass = (document.getElementById('password_confirmation').value).trim();
                var name = (document.getElementById("Name").value).trim();
                var designation = (document.getElementById("Designation").value).trim();
                var email = (document.getElementById("email").value).trim();

                if (pass !== rpass) {
                    that.NotifyMismatchPassword();
                }
                if (rpass === "") {
                    that.setState({ showConfirmPassword: true })
                }
                if (pass === "") {
                    that.setState({ showPasswordCriteria: false })
                    that.setState({ showPassword: true })
                }
                if (designation === "") {
                    that.setState({ showDesignation: true })
                }
                if (email === "") {
                    that.setState({ showEmail: true })
                }
                if (name === "") {
                    that.setState({ showName: true })
                }
                if (name === "" && designation === "" && email === "" && pass === "" && rpass === "") {
                    that.NotifyFieldMandatory();
                }
                if (pass != "") {
                    that.handleChange();
                }

                if (name !== "" && designation !== "" && email !== "" && that.handleEmail() == true && (pass === rpass) && that.handleChange() == true) {
                    return true;
                }
                else {
                    return false;
                }
            });
        });

    }

    render() {
        return (
            <div id="page-container" >
                <div id="content-wrap" className="mb-0">
                    <SimpleNavBar />
                    <div className="container-fluid ">
                        <div className="row">
                            <div id="container" className="col-auto container mt-5 pb-5">
                                <div id="create" className="card shadow-lg mt-5">
                                    <div id="cardHead" className="card-header">
                                        <legend className="text-center">Registration Form</legend>
                                        <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
                                            <PropagateLoader
                                                size={10}
                                                color={'#123abc'}
                                                loading={this.state.loading}
                                            />
                                        </div>
                                    </div>
                                    <ToastContainer />
                                    <div className="card-body">
                                        <form id="apply-form" onSubmit={this.create.bind(this)}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend ">
                                                    <label className="input-group-text"><i className="fas fa-user" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hideName} type="text" name="Name" title="Enter Name" id="Name" placeholder="Enter name of Employee" onChange={(event) => {
                                                    this.setState({
                                                        employeeName: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showName ? <div id="errordiv" className="container-fluid">Please fill out Name field** </div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-at" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hideEmail} type="email" name="email" id="email" title="Enter Email" placeholder="Enter Email" onChange={(event) => {
                                                    this.setState({
                                                        email: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showEmailInvalid ? <div id="errordiv" className="container-fluid" >Please enter a valid email address</div> : null}
                                            {this.state.showEmail ? <div id="errordiv" className="container-fluid" >Please fill out Email field**</div> : null}

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-user-tie" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hideDesignation} type="text" name="Designation" title="Enter Desination" id="Designation" placeholder="Enter Designation" onChange={(event) => {
                                                    this.setState({
                                                        designation: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showDesignation ? <div id="errordiv" className="container-fluid " >Please fill out Designation field** </div> : null}

                                            <div className="input-group  mb-3">
                                                <div className="input-group-prepend ">
                                                    <label className="input-group-text"><i className="fas fa-key" /></label>
                                                </div>
                                                <input className="form-control border border-right-0" onKeyPress={this.hidePassword} type={this.state.type} name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
                                                    this.setState({
                                                        password: event.target.value
                                                    })
                                                }} />
                                                <div className="input-group-append btn " style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i style={{ color: '#495057' }} class="far fa-eye mt-1"></i>}</div>
                                            </div>
                                            {this.state.showPassword ? <div id="errordiv" className="container-fluid">Please fill out Password field**</div> : null}

                                            {this.state.showPasswordCriteria ? <div id="errordiv" className="container-fluid "><span className="text-center">Password min. 6 characters containing atleast 1 uppercase, 1 lowecase alphabet and 1 digit</span></div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="form-control-plaintext input-group-text"><i className="fas fa-key" /></label>
                                                </div>
                                                <input className="form-control border  border-right-0" onKeyPress={this.hideCPassword} type={this.state.typec} title="Confirm Password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" />
                                                <div className="input-group-append btn " style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClickConfirm}>{this.state.typec === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i style={{ color: '#495057' }} class="far fa-eye mt-1"></i>}</div>
                                            </div>
                                            {this.state.showConfirmPassword ? <div id="errordiv" className="container-fluid">Please set Confirm Password**</div> : null}


                                            <div className="input-group mb-3 container-fluid">
                                                <input type="reset" id="reset" title="reset" onClick={this.hideOnReset} className="form-control-plaintext btn btn-outline-primary btn-sm" />

                                                <input type="submit" onSubmit={this.validate} id="submit" title="submit" className="form-control-plaintext btn btn-outline-success btn-sm" />
                                                <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-danger btn-sm" onClick={this.cancel.bind(this)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default User
