import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import './Login.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios'
import { NavLink } from 'react-router-dom';

import { UserProvider } from '../UserContext'
import HomePage from '../homePage/HomePage';

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            show: false,
            isValid:'',
            beans:[]

        }
        this.pRef = React.createRef();
        this.error = "Login failed"

    }
    login(event) {
        event.preventDefault();
        Axios.post('http://localhost:8080/login', null,
            {
                params: {
                    email: this.state.email,
                    password: this.state.password
                },
                withCredentials: false,
             
            }
        ).then((response) => {
            console.log('RESPONSE DATA',response)
            console.log(response.data.message)
            if (response.data.message === 'Success') {
                console.log('data', response.data)
                this.setState({
                    isValid:true,
                    beans:response.data.userBean[0]
                })
                console.log(localStorage.setItem("beans", JSON.stringify(response.data.userBean[0])));
                console.log("beans",this.state.beans);

                
                console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));

                this.props.history.push('/homePage')
               
            }
            else{
                this.setState({
                    show: true
                })
            }

        }).catch((error) => {
            console.log("Login Failed", error)

            this.setState({
                show: true
            })


        })
    }

    forgot=()=>{
         this.props.history.push("/forgot")
    }
    create=()=>{
        this.props.history.push("/createUser")
    }


    render() {
        const user = this.state.beans

        return (
            <body >
                <div>
      

                   <nav style={{height:'60px'}}  to="/"  class="navbar navbar-dark bg-dark">
                        <a class="navbar-brand" href="/">Task Manager</a>

            
                    </nav>
 
                <div className=''>
                    <div className="d-flex justify-content-center h-100">
                        <div className="cardlogin">
                            <div className="cardheader">
                                <h3 style={{ marginTop: '25px' }}><img src='https://icon-library.net/images/login-icon/login-icon-2.jpg' className="imgcss" /> </h3>
                            </div>
                            <div className="cardbody">
                                <form onSubmit={this.login.bind(this)}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '95px' }} className="input-group-text"><i className="fas fa-user">Email</i></span>
                                        </div>
                                        <input required type="Email" className="form-control" value={this.state.email} placeholder="Enter Email" onChange={(event) => { this.setState({ email: event.target.value }) }} />

                                    </div>
                                    
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '95px' }} className="input-group-text">Password<i className="fas fa-key"></i></span>
                                        </div>
                                        <input required type="password" className="form-control" placeholder="Enter Password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }} />
                                    </div>
                                    {this.state.show ? <div class="alert alert-danger" style={{ color: "red" }} >Invalid Credentials</div> : null}

                                    <div id="loginButtton">
                                        <button id="btnlogin" className="btn btn-outline-success" type="submit">Login</button>
                                    </div>
                                </form>
                                 <br/>
                                 <br/>
                                <Link id="forgot" onClick={this.create} >Create Account</Link>
                                <Link id="create" onClick={this.forgot}>Forgot Password?</Link>
                             
                            </div>

                            
                        </div>
                    </div>

                </div>
                </div>
            </body>
        )
    }
}
export default Login
