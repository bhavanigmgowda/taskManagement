import React, { Component } from 'react'
import '../createUser/create.css'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
import Footer from '../navBar/footer'
import $ from 'jquery'
import './ConfirmPassword.css'

export default class forgotPasswordEmailCheck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            showNoEmail: false,
            showServer: false,
            showEmail: false
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
                    this.setState({ showNoEmail: true })
                    setTimeout(() => {
                        this.setState({
                            showNoEmail: false
                        })
                    }, 3000);
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
                }, 3000);
            })
    }
    componentDidMount() {
        var that = this;

        $(document).ready(function () {
            $('#submit').click(function (e) {

                var email = (document.getElementById("email").value).trim();

                if (email === "") {
                    that.setState({ showEmail: true })
                }

            });
        });
    }

    render() {
        return (
            <div id="form-container">
                <div id="content-wrap">

                    <SimpleNavBarCreate />

                    <div className="container-fluid mt-5 ">
                    </div>
                    <div className="row mr-0 mt-5 pb-2">
                        <div id="container" className="col-auto container-fluid mt-5">
                            <div id="create" className="card shadow-lg" style={{ width: '100%' }}>
                                <div id="cardHead" className="card-header text-center">
                                    <h3>Account Recovery</h3>
                                    <p>Enter your email</p>
                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={this.checkEmail}>
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-at" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" required="required" type="email" name="email" title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
                                                })
                                            }} />
                                            {this.state.showEmail ? <div id="alertHead" className="container-fluid">
                                                <small >Please Enter Email**</small>
                                            </div> : null}
                                        </div>
                                        {this.state.showNoEmail ? <div id="alert" className="alert alert-danger">
                                            <small className="text-center font-weight-bold d-block" >Email not found</small>
                                        </div> : null}
                                        {this.state.showServer ? <div id="alert" className="alert alert-danger">
                                            <small className="text-center font-weight-bold d-block" >Server failed to respond</small>
                                        </div> : null}
                                        <div className="input-group container float-right clearfix" style={{ width: '30%', padding: '0%' }}>
                                            <button type="submit" title="submit" className="form-control-plaintext btn btn-outline-primary btn-sm" >Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        )
    }
}