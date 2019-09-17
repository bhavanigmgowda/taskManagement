import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './forgot.css'
import Axios from 'axios'
import $ from 'jquery'

export default class ConfirmPassword extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmpassword:'',
            show: false,
            email:''

        }
        
    }


        checkPass=()=>{
        var pass  = document.getElementById("password").value;
        var rpass  = document.getElementById("rpassword").value;
       if(pass != rpass){
           document.getElementById("btnlogin").disabled = true;
           $('#missmatch').html("Entered Password is not matching!!");
           document.getElementById('alert').hidden=false;
       }else{
           $('#missmatch').html("");
           document.getElementById("btnlogin").disabled = false;
           document.getElementById('alert').hidden=true;
       }
}
     
    
    
    setPassword=(event)=>{
        console.log("props"+this.props.history.location.state.email)  
        let email=this.props.history.location.state.email;
        event.preventDefault();
        Axios.get('http://localhost:8080/setPassword'+"?password="+this.state.password+'&email='+email)
        .then((response) => {
            console.log(response)

            if (response.data.statusCode == 201) {
                console.log("Data Found ...");
                 alert("password Changed")
                this.props.history.push("/")
            }
            else {
                console.log("Data Not Found ...");


            }
           
        }).catch((error) => {
      
           console.log(error)
        })


    }

    render() {
        return (
            <div>
                  <nav style={{height:'60px'}}  class="navbar navbar-dark bg-dark">
                  <Link class="navbar-brand" to="/">Task Manager</Link>
                </nav>
                <div className='a'><center>
                    <p className="hidden" ref={this.pRef}>{this.error}</p></center>
                    <div className="d-flex justify-content-center h-100">
                        <div style={{height: '300px'}} className="cardlogin">
                            <div className="cardheader">
                            </div>
                            <div className="cardbody">
                                <form onSubmit={this.setPassword.bind(this)} >
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '150px' }} className="input-group-text"><i className="fas fa-user">New Password</i></span>
                                        </div>
                                        <input  id='password' required type="password" className="form-control" placeholder="Password" value={this.state.password} 
                                           onChange={(event) => { this.setState({ password: event.target.value }) }}  />

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '150px' }} className="input-group-text"><i className="fas fa-user">Confirm Password</i></span>
                                        </div>
                                        <input id='rpassword' required type="password" className="form-control" placeholder="Confirm Password" value={this.state.confirmpassword} 
                                           onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} onKeyUp={this.checkPass} />

                                    </div>
                                    {this.state.show ? <div class="alert alert-success" style={{textAlign:'center',fontSize:'12px'}} >Password Change Successfully...!</div> : null}
                                    <div style={{marginBottom:'8px'}} id='alert' class="alert alert-danger" role="alert" hidden><h6  style={{textAlign:'center',fontSize:'12px'}} id='missmatch'></h6></div>
                                    <div id="loginButtton">
                                    <button id="btnlogin"  className="btn btn-outline-success" type="submit">Login</button>
                                        <br></br>

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