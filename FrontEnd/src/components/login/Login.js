import React, { Component } from 'react';
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
			showInvalid: false,
			showServer: false,
			showName:false,
			type:'password'

		}
	}
	handleClick = () => this.setState(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
      }))

	login(event) {
		event.preventDefault();
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

			if (response.data.message === 'Success') {
				debugger;
				console.log('data', response.data)
				this.setState({
					isValid: true
				})
				console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));

				console.log(localStorage.setItem("beans", JSON.stringify(response.data.userBean[0])));

				this.props.history.push('/homePage')
			}
			else if (response.data.message === 'Failed') {
				
				this.setState({showInvalid:true})

				setTimeout((() => {
					this.setState({
						showInvalid: false
					})
				}), 3000);

			}



		}).catch((error) => {
			this.setState(
				{
					showServer: true
				}
			)
			setTimeout(() => {
				this.setState({
					showServer: false
				})
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
											<input className="form-control" autoComplete="off" required="required" type="email" name="email" title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
												this.setState({
													email: event.target.value
												})
											}} />
										</div>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label className="input-group-text"><i className="fas fa-key" /></label>
											</div>
											<input className="form-control border border-right-0" autoComplete="off" required="required" type={this.state.type} name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
												this.setState({
													password: event.target.value
												})
											}} />
											 <div className="input-group-append btn" style={{borderRadius:'0px 5px 5px 0px' ,border:"1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ?<i class="far fa-eye-slash mt-1 "></i>  : <i class="far fa-eye mt-1"></i>}</div>
											{this.state.showEmail ? <div id="alertHead" className="alert alert-danger font-weight-bold" role="alert"><small>Please fill out Email field**</small> </div> : null}
										</div>
										{this.state.showInvalid ? <div>
											<small  className="alert alert-danger container-fluid text-center font-weight-bold d-block" >Invalid Username and/or Password</small>
										</div> : null}
										{this.state.showServer ? <div>
											<small className="alert alert-danger container-fluid text-center font-weight-bold d-block" >Server Not Responding</small>
										</div> : null}
										<div className="input-group mb-2 mt-2 container-fluid">
										</div>
										<div>
											<input type="submit" id="Loginbtn" title="submit" value="Login" className="form-control-plaintext btn btn-outline-primary btn-sm " />
										</div>
									</form>
									<div>
										<Link  to="/getEmail">Forgot Password </Link>
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
export default Login