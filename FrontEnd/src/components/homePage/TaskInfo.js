import React, { Component } from 'react';
import $ from 'jquery'
import Axios from 'axios'
import { Modal, Button, Card } from 'react-bootstrap'
import moment from 'moment'
import home from './HomePage'

export class TaskInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popup: JSON.parse(window.localStorage.getItem('popup')),
            user: JSON.parse(window.localStorage.getItem('useremp')),



        }
    }
    handleClose() {
        this.setState({ show: !this.state.show })
    }
    componentDidMount(){
        console.log("data called")
    }
    
    render() {
        return (
            <div className="mainHeader">
               <Modal show={this.state.show} onHide={this.handleClose.bind(this)}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Task Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          
                                <div className="col">
                                <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Email</span>
                                                </div>
                                                   
                                              
                                    <input type="text" 
                                        value={this.state.popup.subject} className="form-control" placeholder="Employee Name" readOnly />  </div>
                                </div>
                         
                               

                                <div className="col">
                                <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <span style={{ width: '100% '}} className="input-group-text" id="basic-addon1">End Date</span>
                                                </div>
                                               
                                    <input type="text" 
                                        value={ moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                                </div>
                         
                          
                            
                                <div className="col">
                                <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned By</span>
                                                </div>
                                                
                                    <input type="text" 
                                        value={this.state.user.empName} className="form-control" placeholder="Designation"readOnly /></div>
                                </div>

                                <div className="col">
                                <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assign Date</span>
                                                </div>
                                                
                                    <input type="text" 
                                        value={ moment(this.state.popup.assignDate).format("DD-MM-YYYY")}className="form-control" placeholder="Password"readOnly /></div>
                                </div>
                          
                        </Modal.Body>
                        <Modal.Footer>
   
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    
        }
    }

export default TaskInfo