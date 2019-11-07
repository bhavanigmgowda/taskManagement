import React, { Component } from 'react'
import { Architect, Employee, Lead } from '../Architect/SideData';
export default class userInfo extends Component {

       constructor(props){
           super(props);
            this.state={
                userInfo:'',
                projectInfo:''
            }
       }
    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2">
                            <Architect />
                        </div>
                        <div className="row" style={{ height: "220px", width: "84.5%", backgroundImage: "linear-gradient(to right, rgb(234, 223, 223), rgb(46, 104, 210))" }} >
                            <div class="col-md-3" >
                                <div style={{ textAlign: "center" }} >
                                    <img style={{
                                        height: "10%",
                                        width: "160px",
                                        marginLeft: "8px",
                                        marginTop: "140px",
                                        marginRight: "auto"
                                    }} src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="Smiley face" />
                                    <h3 style={{ fontWeight: "800" }} >Aman</h3>
                                </div>

                                <div class="card">
                                    <h5 style={{ fontWeight: "800" }} class="card-header">Manage Your Account</h5>
                                    <div class="card-body">
                                        
                                        <h5 style={{ fontWeight: "600" }} class="card-title">About</h5>
                                          
                                        
                                      
                                        
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-7">

                                <div class="card" style={{ marginTop: "341px" }} >
                                    <h5 style={{ fontWeight: "800" }} class="card-header">Worked On</h5>
                                    <div class="card-body">
                                        <h5 style={{ fontWeight: "600" }} class="card-title">Project Information</h5>

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
