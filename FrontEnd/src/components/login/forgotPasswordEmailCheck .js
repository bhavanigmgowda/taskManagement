import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../createUser/create.css'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
import Footer from '../navBar/footer'
import Modal from "react-responsive-modal";

export default class forgotPasswordEmailCheck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            show: false,
            showServer: false,
        }

    }


    checkEmail = (event) => {
        event.preventDefault();

        Axios.get('http://localhost:8080/check-email' + "?email" + "=" + this.state.email)
            .then((response) => {
                console.log(response)

                if (response.data.statusCode == 201) {
                    console.log("Data Found ...");

                    this.props.history.push({
                        pathname: '/confirmPassword',
                        state: { email: this.state.email }
                    })
                    console.log("props" + this.props.history.location.state.email)
                }
                else {
                    console.log("Data Not Found ...");
                    this.setState({ show: true })

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




    render() {
        const { open } = this.state;
        return (
            <div>
                <SimpleNavBarCreate  />

                <div className="container-fluid mt-5">
                </div>
                <div className="row mr-0 mt-5">
                    <div id="container" className="col-auto container-fluid mt-5">
                        <div id="create" className="card shadow-lg" style={{width:'100%'}}>
                        <div id="cardHead" className="card-header text-center">
									<h3>Account Recovery</h3>
									<p>Please enter your email</p>
								</div>
                            <div className="card-body">
                                <form role="form" onSubmit={this.checkEmail}>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-at" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="email" name="Name" title="Enter Name" id="email" placeholder="Enter Email" onChange={(event) => {
                                            this.setState({
                                                email: event.target.value
                                            })
                                        }} />
                                    </div>
                                    {this.state.show ? <div id="alert" className="alert alert-danger">
                                        <h6 id="message">EMAIL NOT FOUND</h6>
                                    </div> : null}
                                    {this.state.showServer ? <div>
                                        <h6 id="alert" className="alert alert-danger" >Server Not Responding</h6>
                                    </div> : null}
                                    <div className="input-group container float-right clearfix" style={{width:'30%'}}>
                                        <button type="submit" title="submit" className="form-control-plaintext btn btn-outline-primary btn-sm" >Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}