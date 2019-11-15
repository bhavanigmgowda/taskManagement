import React, { Component } from 'react'
import Axios from 'axios';
import SearchNavabar from '../navBar/SearchNavabar';
import './HomePage.css';
import { Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { Modal, Button, Card } from 'react-bootstrap'
import moment from 'moment';
export default class Byme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Byme: [],
            email: JSON.parse(window.localStorage.getItem('beans')),
            show: false,
            popup: [],
            user: ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/getAssignToTask?email=' + this.state.email.email

            ).then((response) => {
                console.log('Response taskBean', response);
                if (response.data.message === "Success") {
                    this.setState({
                        Byme: response.data.taskBean

                    })
                }
            }).catch((error) => {
                console.log('Error', error);
            })

        } else {
            this.props.history.push('/')

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
        return (

            <div>
                <SearchNavabar />
                <Nav >
                    <NavDropdown title="ByMe" id="basic-nav-dropdown">
                        <NavLink className="nav-link" to="/homePage" >To Me</NavLink>
                        <NavLink className="nav-link" to="/byme">By Me</NavLink>
                    </NavDropdown>
                    <NavLink className="nav-link" to="/completedTask" style={{ marginLeft: '91%', marginTop: '-46px' }}>Completed Task</NavLink>
                </Nav>
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
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned By</span>
                                </div>

                                <input type="text"
                                    value={this.state.user.empName} className="form-control" placeholder="Designation" readOnly /></div>
                        </div>

                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assign Date</span>
                                </div>

                                <input type="text"
                                    value={moment(this.state.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">End Date</span>
                                </div>

                                <input type="text"
                                    value={moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>



                <div className="container-fluid ">
<center>                    <div className="row container ">
                        <div className="col-auto" id="todo" >
                            <div className="col-md-12">
                                <div id="card bg-default" >
                                    <h5 id="card-header" className="card-header header">
                                        <center >TO DO</center>
                                    </h5>

                                </div>
                                <div className=" card-body cards">


                                    {this.state.Byme.filter(item => (item.priority === 'high') && (item.status === 'todo')).map(item => {
                                        return (
                                            <div className="col-auto"  >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                    <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>


                                                <p id="drag1" className="prHigh"  >
                                                    <div id="div" className="textarea">{item.description} </div></p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.state.Byme.filter(item => (item.priority === 'intermediate') && (item.status === 'todo')).map(item => {
                                        return (

                                            <div className="col-auto" >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                    <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>



                                                <p div id="drag2" className="prInit"   >
                                                    <div id="d2" className="textarea">{item.taskId}{item.description} </div></p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.state.Byme.filter(item => (item.priority === 'low') && (item.status === 'todo')).map(item => {
                                        return (
                                            <div className="col-auto"  >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                    <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>

                                                <p id="drag3" className="prLow"   >
                                                    <div id="d3" className="textarea">{item.description} </div></p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="col-auto"  id="onProgress" >
                            <div className="row">

                                <div className="col-auto">
                                    <div id="card bg-default" >
                                        <h5 id="card-header" className="card-header header">
                                            <center> On Progress </center>
                                        </h5>
                                    </div>
                                    <div className=" card-body cards">
                                        {this.state.Byme.filter(item => (item.priority === 'high') && (item.status === 'onProgress')).map(item => {
                                            return (
                                                <div className="col-auto" >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>

                                                    <p id="drag4" class="prHigh"  >
                                                        <div id="d4" className="textarea ">{item.description} </div></p>


                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.Byme.filter(item => (item.priority === 'intermediate') && (item.status === 'onProgress')).map(item => {
                                            return (

                                                <div className="col-auto"  >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>

                                                    <p id="drag5" class="prInit ">
                                                        <div id="d5" className="textarea ">{item.description} </div></p>

                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.Byme.filter(item => (item.priority === 'low') && (item.status === 'onProgress')).map(item => {
                                            return (
                                                <div className="col-auto" >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>

                                                    <p id="drag6" class="prLow ">
                                                        <div id="d6" className="textarea ">{item.description} </div></p>
                                                </div>


                                            )
                                        }
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto " >
                            <div className="row">

                                <div className="col-auto">
                                    <div id="card bg-default" >
                                        <h5 id="card-header" className="card-header header">
                                            <center> Blocked </center>
                                        </h5>
                                    </div>
                                    <div className=" card-body cards">

                                        {this.state.Byme.filter(item => (item.priority === 'high') && (item.status === 'blocked')).map(item => {

                                            return (

                                                <div >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>


                                                    <p id="drag7" class="prHigh ">

                                                        <div id="d7" className="textarea">{item.description} </div></p>

                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.Byme.filter(item => (item.priority === 'intermediate') && (item.status === 'blocked')).map(item => {

                                            return (

                                                <div  >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>


                                                    <p id="drag8" class="prInit ">
                                                        <div id="d8" className="textarea">{item.description} </div></p>

                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.Byme.filter(item => (item.priority === 'low') && (item.status === 'blocked')).map(item => {

                                            return (

                                                <div >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <img onClick={() => this.showvis(item, item.userBean)} className="icon" src="https://cdn4.iconfinder.com/data/icons/miu/24/circle-info-more-information-detail-outline-stroke-512.png" /></div>


                                                    <p id="drag9" class="prLow ">
                                                        <div id="d9" className="textarea">{item.description} </div></p>

                                                </div>
                                            )
                                        }
                                        )}

                                    </div>
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