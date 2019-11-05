import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate';
import Footer from '../navBar/footer';
import $ from 'jquery';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';


export class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			showEmail: false,
			showPassword: false,
			type: 'password',
			loading: false

		}
		
	}

	hideEmail = () => {
		this.setState({
			showEmail: false
		})
	}
	hidePassword = () => {
		this.setState({
			showPassword: false
		})
	}


	handleClick = () => this.setState(({ type }) => ({
		type: type === 'text' ? 'password' : 'text'
	}))

	login(event) {
		event.preventDefault();
		this.setState({loading:true});

		Axios.post('http://localhost:8080/login', null,
			{
				params: {
					email: this.state.email,
					password: this.state.password
				},
				credentials: 'same-origin'
			}
		).then((response) => {
			this.setState({loading:false});

			console.log('RESPONSE DATA', response)
			console.log(response.data.message)

			if (response.data.statusCode === 201) {
				console.log("=====sssssss==aaaaaaa=================",response.data.userBean[0].role)


				console.log('data', response.data)
				this.setState({

					isValid: true,
					userData: response.data.userBean[0]
				}, () => {
					console.log(localStorage.setItem("beans", JSON.stringify(this.state.userData.email )));
					localStorage.setItem("role", JSON.stringify(this.state.userData.role ))
					console.log("=====sssssss==aaaaaaa=================",response.data.userBean[0].role)
						this.props.history.push('/homePage')
				})

				console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));

				this.props.clicked(this.state.userData.email)
			
			}
			else if (response.data.statusCode === 401) {

				this.NotifyInvalidCrediatial();

			}
			else if (response.data.statusCode === 501) {
				this.NotifyInvalidCrediatial();

			}
		}).catch((error) => {
			this.NotifyServerOffline();
			this.setState({loading:false});
		})
	}




	forgot = () => {
		this.props.history.push("/getEmail")
	}
	componentDidMount() {
		var that = this;
		$(document).ready(function () {
			$('#Loginbtn').click(function (e) {
				var email = (document.getElementById("email").value).trim();
				var password = (document.getElementById("password").value).trim();

				if (password === "") {
					that.setState({ showPassword: true })
				}
				if (email === "") {
					that.setState({ showEmail: true })
				}


				if (email !== "" && password !== "") {
					return true;
				}
				else {
					return false;
				}
			});
		});
	}
	NotifyInvalidCrediatial = () => {
		if (! toast.isActive(this.toastId)) {
		this.toastId=toast.error(<center>Invalid Username and/or Password</center>, {
			position: "top-center", autoClose: 7000,});
	}
}

	NotifyServerOffline = () => {
		if (! toast.isActive(this.toastId)) {
			this.toastId=toast.error(<center>Server Not Responding</center>, {
			position: "top-center", autoClose: 7000,});
	}
}


	render() {
	
		return (
			<div id="form-container" >
				<div id="content-wrap">
					<SimpleNavBarCreate />

					<div className="container-fluid mt-5 pb-3 ">


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
										<p>Enter your email and password</p>
										<div className="w-100" style={{marginLeft: '50%',marginRight:'auto'}}>
										<PropagateLoader 
											css={this.override}
											size={10}
											 color={'#123abc'}
											loading={this.state.loading}
										/>
										</div>
									</div>
									<div className="card-body">
										<form role="form" onSubmit={this.login.bind(this)}>
											<div className="input-group mb-3">
												<div className="input-group-prepend">
													<label className="input-group-text"><i className="fas fa-at" /></label>
												</div>
												<input className="form-control" autoComplete="off" type="email" name="email" onKeyPress={this.hideEmail} title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
													this.setState({
														email: event.target.value
													})
												}} />

											</div>
											{this.state.showEmail ? <div id="errordiv" className="container-fluid">Please enter Email** </div> : null}
											<div className="input-group mb-3">
												<div className="input-group-prepend">
													<label className="input-group-text"><i className="fas fa-key" /></label>
												</div>
												<input className="form-control border border-right-0" onKeyPress={this.hidePassword} autoComplete="off" type={this.state.type} name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
													this.setState({
														password: event.target.value
													})
												}} />

												<div className="input-group-append btn" style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i style={{ color: '#495057' }} class="far fa-eye-slash mt-1 "></i> : <i style={{ color: '#495057' }} class="far fa-eye mt-1"></i>}</div>

											</div>
											{this.state.showPassword ? <div id="errordiv" className="container-fluid">Please enter password** </div> : null}
											
											<div className="input-group mb-2 mt-2 container-fluid">
											</div>
											<div>
												<input type="submit" id="Loginbtn" title="submit" value="Login" className=" form-control-plaintext btn btn-outline-primary btn-sm " />
											</div>
										</form>
										<div>
											<Link to="/getEmail">Forgot Password </Link>
											<ToastContainer />
										</div>
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
export default withRouter(Login)






























































































