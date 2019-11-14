import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import Axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import './homepage.css';
import { Architect, Employee, Lead, SideNavBar } from './SideData';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../navBar/footer';
import Example from './Example';


export class ProjectHomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: JSON.parse(window.localStorage.getItem('beans')),
			projectData: [],
			projectTaskData: [],
			count: [],

		}
	}
	NotifyNoTaskAssigned = () => {
		debugger
		if (!toast.isActive(this.toastId)) {
			this.toastId = toast.error(<center>No Project Exists</center>, {
				position: "top-center", autoClose: 7000,
			});
		}
	}

	NotifyServerOffline = () => {
		if (!toast.isActive(this.toastId)) {
			this.toastId = toast.error(<center>Server Not Responding</center>, {
				position: "top-center", autoClose: 7000,
			});
		}
	}

	componentDidMount() {
		Axios.get('http://localhost:8080/get-projects-by-email?email=' + this.state.email)
			.then((response) => {
				if (response.data.statusCode === 201) {
					this.setState({
						projectData: response.data.projectBeans,
						projectTaskData: response.data.projectBean,
						count: response.data.count,

					})
					console.log("===============", response.data.projectBeans)
				} else if (response.data.statusCode === 401) {
					this.NotifyNoTaskAssigned();
				}
			}).catch((error) => {
				console.log("==========error", error)
				this.NotifyServerOffline();
			})

	
	}

	page(group) {
		localStorage.setItem("groupId", group.projectPkBean.projectId)
		localStorage.setItem("projectName", group.projectName)
		this.props.history.push('/taskPage')
	}

	render() {
		var i = 0

		return (
			<div className="container-fluid">
				{console.log("object", this.state.projectData.email)}
				<ToastContainer />
				<div className="row">
						
										{ SideNavBar() }
								
							<div className="col-md-8">
								<div id="card" >
									<div class=" card-body ">
										<h4><b>Projects</b></h4>
										<div>
											<div className="row">
												{this.state.projectTaskData.map(item => {
													return (
														<div onClick={() => {
															this.page(item)
														}} className='col-sm-4'>
															<p id="drag1" className="stickys">
																< textarea id="d2" className="textarea" rows="5" readOnly>{item.projectName}</textarea> </p>
															<p />
														</div>
													)
												})
												}

											</div>

											<Example sendCount={this.state.count} sendData={this.state.projectData} />

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
export default withRouter(ProjectHomePage)
