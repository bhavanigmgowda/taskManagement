import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './forgot.css'
import Axios from 'axios'

export default class forgotPasswordEmailCheck extends Component {

           constructor(props){
                  super(props)
                  this.state={
                    email: '',
                    show: false
                  }

           }

           checkEmail=(event)=>{
            event.preventDefault();
 
            Axios.get('http://localhost:8080/checkEmail'+"?email"+"="+this.state.email)
            .then((response) => {
                console.log(response)

                if (response.data.statusCode == 201) {
                    console.log("Data Found ...");

                    this.props.history.push({pathname:'/conform',
                                            state: {email:this.state.email}})
                               console.log("props"+this.props.history.location.state.email)              
                }
                else {
                    console.log("Data Not Found ...");
                    this.setState({show:true})

                }
               
            }).catch((error) => {
          
               console.log(error)
               this.setState({show:true})
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
                        <div style={{height: '257px'}} className="cardlogin">
                            <div className="cardheader">
                            </div>
                            <div className="cardbody">
                                <form onSubmit={this.checkEmail.bind(this)} >
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span style={{ width: '95px' }} className="input-group-text"><i className="fas fa-user">Email</i></span>
                                        </div>
                                        <input required type="Email" className="form-control" placeholder="Enter Email" value={this.state.email} 
                                           onChange={(event) => { this.setState({ email: event.target.value }) }}  />

                                    </div>
                                    {this.state.show ? <div class="alert alert-danger" style={{textAlign:'center',fontSize:'12px'}} role="alert">EMAIL NOT FOUND...!</div> : null}
                                    <div id="loginButtton">
                                    <button id="btnlogin" className="btn btn-outline-success" type="submit">Login</button>
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
    
   // 
   //
   // 
}
