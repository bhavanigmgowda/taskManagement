import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './forgotPasswordEmailCheck.css'
import Axios from 'axios'

export default class forgotPasswordEmailCheck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            show: false,
            showServer: false
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
                        pathname: '/setPassword',
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
        return (
            <div>
                <div className="container-fluid mt-5">
                </div>
                <div className="row">
                    <div id="container" className="col-auto container mt-5">
                        <div id="Page" className="card ">

                            <div className="card-body">
                                <form role="form" onSubmit={this.checkEmail}>
                                    <div className="input-group mb-3">
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

                                    <div className="input-group mb-3 container-fluid">

                                    </div>
                                    <div>
                                        <input type="submit" id="btn" title="submit" value="Submit" className="form-control-plaintext btn btn-outline-success btn-sm" />

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    // 
    //
    // 
}