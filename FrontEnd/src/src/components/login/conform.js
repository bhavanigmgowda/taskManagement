import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './forgotPasswordEmailCheck.css'
import Axios from 'axios'
import $ from 'jquery'
import { isDebuggerStatement } from '@babel/types';
import Cookies from 'js-cookie';
export default class ConfirmPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmpassword: '',
            show: false,
            email: '',
            showServer:''

        }

    }


    add = (callback) => {

        this.setState({
            show: true
        })

        callback();
    }

    disp = () => {
        setTimeout( function(props){
            this.props.history.push('/');
        }, 1000 );
    }

     first=(props)=>{
        setTimeout( function(props){
            this.props.history.push('/');
        }, 1000 );
      }




    setPassword = (event) => {
        debugger;
        event.preventDefault();
        debugger;
        var pass = document.getElementById("password").value;
        var rpass = document.getElementById("password_confirmation").value;
        if (pass != rpass) {

            $('#message').html("Password is not matching!!");
            document.getElementById('alert').hidden = false;
            setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 2000);
           
          

        }
        else {
            $('#message').html("");

            document.getElementById('alert').hidden = true;
            console.log("props" + this.props.history.location.state.email)
            let email = this.props.history.location.state.email;
            event.preventDefault();
            Axios.get('http://localhost:8080/update-password' + "?password=" + this.state.password + '&email=' + email)
                .then((response) => {
                    console.log(response)

                    if (response.data.statusCode == 201) {
                        console.log("Data Found ...");
                        this.setState({
                            show: true
                        })
                        this.add(this.disp)
                     // this.props.history.push('/')
                    }
                    else {
                        console.log("Data Not Found ...");


                    }

                }).catch((error) => {

             this.setState(
                {
                    showServer:true
                }
            ) 
            setTimeout(()=> { this.setState(this.setState({
               showServer: false
           }))    
           }, 2000);

                    console.log(error)
                })


        }
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
                                <form role="form" onSubmit={this.setPassword}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-key" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="password" name="Name" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text"><i className="fas fa-key" /></label>
                                        </div>
                                        <input className="form-control" required="required" type="password" name="Name" title="Confirm Passsword" id="password_confirmation" placeholder="Confirm Password" onChange={(event) => {
                                            this.setState({
                                                confirmpassword: event.target.value
                                            })
                                        }} />
                                    </div>
                                    {this.state.show ? <div id="success" className="alert alert-success">
                                        <h6 id="success">Password Changed Successfully</h6>
                                    </div> : null}
                                    {this.state.showServer ? <div>
                                            <h6 id="alert" className="alert alert-danger" >Server Not Responding</h6>
                                        </div> : null}
                                    <div style={{ textAlign: '"center"' }}>
                                        <div id="alert" className="alert alert-danger" role="alert" hidden="true">
                                            <h6 id="message" />
                                        </div>
                                    </div>

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
}