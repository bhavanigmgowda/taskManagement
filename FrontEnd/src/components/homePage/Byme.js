import React, { Component } from 'react'
import Axios from 'axios';
import SearchNavabar from '../navBar/SearchNavabar';
import '../css/HomePage.css';
import { Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { Modal} from 'react-bootstrap'
import moment from 'moment';
export default class Byme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: [],
            complete: [],
            blocked: [],
            onProgress: [],
            email: JSON.parse(window.localStorage.getItem('beans')),
            show: false,
            popup: [],
            user: ''
        }
    }
    getData() {
        if(this.props.searchData==null){
            this.props.byme()
        }
    }
    componentDidMount(){
    }
    handleClose() {
        this.setState({ show: !this.state.show })
    }
    showvis(item, userBean) {
        console.log("showvis")
        this.setState({
            popup: item,
            user: userBean
        })
        this.setState({ show: !this.state.show })
    }
    render() {
        if(this.props.searchData!=null){
            console.log("searchData",this.props.searchData)
        return (
            <div>   
                 <Nav >
                    <NavDropdown title="By Me" id="basic-nav-dropdown">
                        <NavLink   className="nav-link" to="/homePage" >To Me</NavLink>
                        <NavLink  className="nav-link" onClick={this.props.byme} >By Me</NavLink>
                    </NavDropdown>
                    <NavLink className="nav-link" to="/completedTask" style={{ marginLeft: '91%', marginTop: '-46px' }}>Completed Task</NavLink>
                </Nav>          
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Task Details
                        <div>subject  {this.state.popup.subject}</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <textarea value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned To</span>
                            </div>
                            <input type="text"
                                value={this.state.popup.assignedTo} className="form-control" placeholder="Designation" readOnly /></div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assign Date</span>
                            </div>

                            <input type="text"
                                value={moment(this.state.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">End Date</span>
                            </div>

                            <input type="text"
                                value={moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Priority</span>
                            </div>
                            {console.log("prio", this.state.popup.priority)}
                            <input type="text"
                                value={this.state.popup.priority} className="form-control" readOnly /> </div>
                    </Modal.Body>
                    <Modal.Footer style={{ color: 'red' }} >
                        Number of days {moment(this.state.popup.endDate).diff(moment(this.state.popup.assignDate), 'days')}
                    </Modal.Footer>
                </Modal>
                <div className="container-fluid">
                    <center>
                        <div className="row container">
                            <div className="col-lg-4 col-md-3 col-sm-3" id="todo"  >
                            <div className="col-auto">

                                <div id="card bg-default head" >
                                    <h5 id="card-header" className="card-header header">
                                        <center className="letter" >To Do</center>
                                    </h5>
                                </div>
                                <div className=" card-body cards">
                                   {this.props.searchData.filter(item => (item.priority === 'critical')&&(item.status==='todo')).map(item => {
                                        return (
                                            <div className="col-auto"
                                                >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p id="drag1"  className="prCri"  >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.props.searchData.filter(item => (item.priority === 'high')&&(item.status==='todo')).map(item => {
                                        return (
                                            <div className="col-auto"
                                                >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p id="drag1"  className="prHigh"  >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.props.searchData.filter(item => (item.priority === 'intermediate')&&(item.status==='todo')).map(item => {
                                        return (
                                            <div className="col-auto">
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p div id="drag2"  className="prInit"   >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea>
                                                </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.props.searchData.filter(item => (item.priority === 'low')&&(item.status==='todo')).map(item => {
                                        return (
                                            <div className="col-auto">
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div> <p id="drag3"  className="prLow"   >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea>
                                                </p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                    </div>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-3" id="onProgress" >
                                <div className="col-auto">
                                    <div id="card bg-default head" >
                                        <h5 id="card-header" className="card-header header">
                                            <center className="letter" > In Progress </center>
                                        </h5>
                                    </div>
                                    <div className="  card-body cards">
                                        {this.props.searchData.filter(item => (item.priority === 'critical')&&(item.status==='onProgress')).map(item => {
                                            return (
                                                <div className="col-auto container">
                                                  
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prCri ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>

                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'high')&&(item.status==='onProgress')).map(item => {
                                            return (
                                                <div className="col-auto container"
                                                     >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prHigh ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'intermediate')&&(item.status==='onProgress')).map(item => {
                                            return (
                                                <div className="col-auto container"
                                                     >
                                                   

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prInit ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'low')&&(item.status==='onProgress')).map(item => {
                                            return (
                                                <div className="col-auto" 
                                                     >

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prLow ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-3" id="blocked">
                                <div className="col-auto">
                                    <div id="card bg-default head" >
                                        <h5 id="card-header" className="card-header header">
                                            <center className="letter"> Blocked </center>
                                        </h5>
                                    </div>
                                    <div className=" card-body cards">
                                        {this.props.searchData.filter(item => (item.priority === 'critical')&&(item.status==='blocked')).map(item => {
                                            return (
                                                <div className="col-auto"
                                                   
                                                     >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prCri ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'high')&&(item.status==='blocked')).map(item => {
                                            return (
                                                <div className="col-auto"
                                                   
                                                     >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prHigh ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'intermediate')&&(item.status==='blocked')).map(item => {
                                            return (
                                                <div className="col-auto"
                                                     >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prInit ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.props.searchData.filter(item => (item.priority === 'low')&&(item.status==='blocked')).map(item => {
                                            return (
                                                <div className="col-auto"
                                                   
                                                     >

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6"  class="prLow ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </center>
                </div>
            </div>

        )
                                    }
                           
    }
    }