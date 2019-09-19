import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios'
import '../login/Login.css'
import $ from 'jquery'
import Cookies from 'js-cookie';
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            show: false,
            showServer: false,


        }


    }


    login(event) {
        event.preventDefault();
        Axios.defaults.withCredentials = 'true';
        Axios.defaults.crossDomain = 'true';
        Axios.defaults.headers.post['Content-Type'] = 'application/json';
        Axios.defaults.headers.post['withCredentials'] = 'true';
        Axios.post('http://localhost:8080/login', null,
            {
                params: {
                    email: this.state.email,
                    password: this.state.password
                },
                credentials: 'same-origin'
            }
        ).then((response) => {
            console.log('RESPONSE DATA', response)
            console.log(response.data.message)
            debugger;
            if (response.data.message === 'Success') {
                console.log('data', response.data)
                this.setState({
                    isValid: true
                })
                console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));

                console.log(localStorage.setItem("beans", JSON.stringify(response.data.userBean[0])));

                this.props.history.push('/homePage')
            }
            else if (response.data.statusCode === '401') {


                setTimeout((() => {
                    this.setState(this.setState({
                        show: true
                    }));
                }), 3000);

            }



        }).catch((error) => {

            this.setState(
                {
                    showServer: true
                }
            )
            setTimeout(() => {
                this.setState(this.setState({
                    showServer: false
                }))
            }, 2000);


        })
    }

    forgot = () => {
        this.props.history.push("/getEmail")
    }



    render() {
        return (

            <div>

                <div className="container-fluid mt-5">


                    <div style={{ textAlign: '"center"' }}>
                        <div id="success" className="alert alert-success" role="success" hidden="true">
                            <h6 id="successMessage" />
                        </div>
                    </div>
                    <div className="row">
                        <div id="container" className="col-auto container mt-5">
                            <div id="Page" className="card ">
                                <div id="cardHead" className="card-header">
                                    <legend className="text-center">Login</legend>
                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={this.login.bind(this)}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-at" /></label>
                                            </div>
                                            <input className="form-control" required="required" type="email" name="email" title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
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
                                        {this.state.show ? <div>
                                            <h6 id="alert" className="alert alert-danger" >Invalid Credentials</h6>
                                        </div> : null}
                                        {this.state.showServer ? <div>
                                            <h6 id="alert" className="alert alert-danger" >Server Not Responding</h6>
                                        </div> : null}

                                        <div className="input-group mb-3 container-fluid">

                                        </div>
                                        <div>
                                            <input type="submit" id="btn" title="submit" value="Login" className="form-control-plaintext btn btn-outline-success btn-sm" />

                                        </div>

                                    </form>
                                    <div id="fPass">
                                        <Link to="/getEmail">Forgot Password ?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default Login