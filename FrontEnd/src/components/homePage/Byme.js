import React, { Component } from 'react'
import Axios from 'axios';
import './HomePage.css';
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
   
    componentDidMount(){
        debugger
        if(!this.props.searchData){   
            this.props.byme()
        }
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
        if(this.props.searchData){
            console.log("searchData",this.props.searchData)
        return (
            <div>   
                 <Nav >
                    <NavDropdown title="By Me" id="basic-nav-dropdown">
                        <NavLink onClick={this.props.clearSearch}   className="nav-link" to="/homePage" >To Me</NavLink>
                        <NavLink   className="nav-link" onClick={this.props.byme} >By Me</NavLink>
                    </NavDropdown>
                    <NavLink className="nav-link" onClick={this.props.clearSearch} to="/completedTask" style={{ marginLeft: '91%', marginTop: '-46px' }}>Completed Task</NavLink>
                </Nav>          
               <Modal centered size="md" show={this.state.show}  onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="" style={{color:'#808080'}}>Subject - <span style={{color:'black'}}> {this.state.popup.subject} </span></div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <label className="mb-0" style={{color:'#808080'}}>Description</label>
                    <div className="input-group mb-2">
                        <textarea style={{color:'black'}} value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
                        <label className="mb-0" style={{color:'#808080'}}>Assigned By</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend ">
                            <label className="input-group-text "><i className="fas fa-at" /></label>
                        </div>
                        <input type="text" value={this.state.popup.assignedTo} style={{color:'black'}} className="form-control" placeholder="Designation" readOnly /></div>
                        <label className="mb-0" style={{color:'#808080'}}>Assigned On</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                        </div>
                        <input type="text" style={{color:'black'}}
                            value={moment(this.state.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                            <label className="mb-0" style={{color:'#808080'}}>Deadline</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                        </div>

                        <input type="text" style={{color:'black'}}
                            value={moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                            <label className="mb-0" style={{color:'#808080'}}>Priority</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i class="fas fa-tasks"></i></label>

                        </div>
                        {console.log("prio", this.state.popup.priority)}
                        <input type="text" style={{color:'black'}}
                            value={this.state.popup.priority} className="form-control" readOnly /> </div>


                </Modal.Body>
                <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
                    Number of days: {moment(this.state.popup.endDate).diff(moment(this.state.popup.assignDate), 'days')}
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
                                    }else{
                                        return(<div><h1>No Records Found</h1></div>)
                                    }
                           
    }
    }