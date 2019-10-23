import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import Axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { CardBody } from 'react-bootstrap/Card';
import './homepage.css';
import { Button } from 'react-bootstrap';


export class ArchitectHomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}

	}


	render() {

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-2 cssCard" >
								<div class=" card-body  h-75">
								<div className="input-group mb-3 option">
                                                <div className="input-group-prepend">
													<i class="fas fa-users iconTask"> &nbsp; Create Project</i>												
                                                </div>
												<div className="input-group-prepend">
													<i class="fas fa-tasks iconTask">&nbsp; My Task</i>	
													</div>	
													<div className="input-group-prepend">
													<i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>	
													</div>		
													<div className="input-group-prepend">
													<i class="fas fa-th-list iconTask" style={{marginTop:"20"}}>&nbsp; Completed Task</i>
													</div>	
													<div className="input-group-prepend">
													<i class="fas  fa-plus-circle iconTask">&nbsp; Add User</i>
													</div>		
                                                  </div>
								</div>
							</div>


							<div className="col-md-8">
								<div id="card" >
									<div class=" card-body ">

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
export default withRouter(ArchitectHomePage)
