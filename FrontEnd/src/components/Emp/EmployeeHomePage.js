import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import Axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { CardBody } from 'react-bootstrap/Card';
import '../Architect/homepage.css';
import { Button } from 'react-bootstrap';
import { Employee } from '../Architect/SideData';


export class EmployeeHomePage extends Component {
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
								{Employee()}	
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
export default withRouter(EmployeeHomePage)
