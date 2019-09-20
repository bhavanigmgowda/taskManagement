import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate';
import Footer from '../navBar/footer';

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

			<div >
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
									<h3>Login</h3>
									<p>Please enter your email and password</p>
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
										<div className="input-group mb-2 mt-2 container-fluid">
										</div>
										<div>
											<input type="submit" id="Loginbtn" title="submit" value="Login" className="form-control-plaintext btn btn-outline-primary btn-sm " />
										</div>

									</form>
									<div>
										<Link  to="/getEmail">Forgot Password ?</Link>
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
=======
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import './Login.css'
import { BrowserRouter as Router, Route, Link,withRouter } from 'react-router-dom'
import Axios from 'axios'
import { NavLink } from 'react-router-dom';

import { UserContext } from '../UserContext'
import HomePage from '../homePage/HomePage';
let user= [];

 class Login extends Component {
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
                console.log("===========user")
                console.log(localStorage.setItem("beans", JSON.stringify(this.state.beans)));
                console.log("beans",this.state.beans);
                this.props.clicked(this.state.beans)
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
        let user= [];

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
>>>>>>> 8c04e41d54144d1230e5bdd6f65321a8ff7358a5
}
export default withRouter(Login)
