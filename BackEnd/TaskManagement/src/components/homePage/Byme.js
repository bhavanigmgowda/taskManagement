import React, { Component } from 'react'
import './HomePage.css';
import { Nav, NavDropdown, Button } from 'react-bootstrap'
import { NavLink, withRouter, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import Axios from 'axios';
import { stickyLow, stickyMedium, stickyCri, stickyHigh } from './Sticky';
class Byme extends Component {
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
            user: '',
            page: 'By Me',
            loading: false

        }
    }
    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Server Not Responding</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    componentDidMount() {
        if (!this.props.searchData) {
            this.props.byme()
        }
    }

    delete(a) {
     
            Axios.delete('http://localhost:8080/remove-task?taskId=' + a )
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        this.props.byme()
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    

    completedTask(e) {
        e.preventDefault();
        this.props.history.push('/completedTask')
        this.props.clearSearch()
    }
    pageName(data) {
        if (data === "To Me") {
            this.setState({
                page: data

            })
            localStorage.setItem("pages", JSON.stringify("To Me"))
            this.props.history.push('/taskPage')
        } else {
            localStorage.setItem("pages", JSON.stringify("By Me"))
            this.props.history.push('/byme')
        }
        this.props.clearSearch()



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
        if (this.props.searchData) {
            console.log("searchData", this.props.searchData)
            return (
                <div>
                    <Nav >

                        <div class="dropdown">
                            <button class="dropbtn">{this.props.searchPage ? this.props.searchPage : "By Me"} &nbsp;
        <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                                <NavLink onClick={this.props.clearSearch} className="nav-link linkbar" onClick={(event) => { this.pageName("To Me") }} to="/taskPage"  >To Me</NavLink>
                                <NavLink onClick={this.props.clearSearch} className="nav-link linkbar" onClick={(event) => { this.pageName("By Me") }} to="/byme" >By Me</NavLink>
                            </div>
                        </div>

                        <Button onClick={(e) => { this.completedTask(e) }} className="com" style={{ marginLeft: '88%' }}>Completed Task</Button>

                    </Nav>
                    <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto', marginBottom: '1%' }}>
                        <PropagateLoader
                            css={this.override}
                            size={10}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>
                    <ToastContainer />

                    <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className="" style={{ color: '#808080' }}>Subject -                             
                                      <textarea style={{ color: 'black', resize: "none",   width:"209%" }}  class="form-control"  value={this.state.popup.subject} id="exampleFormControlTextarea1" rows="1" readOnly/>
  </div></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                            <div className="input-group mb-2">
                                <textarea style={{ color: 'black' }} value={this.state.popup.description} type="text" className="form-control textarea" placeholder="Designation" readOnly />  </div>
                            <label className="mb-0" style={{ color: '#808080' }}>Assigned To</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend ">
                                    <label className="input-group-text "><i className="fas fa-at" /></label>
                                </div>
                                <input type="text" value={this.state.popup.assignedTo} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
                            <label className="mb-0" style={{ color: '#808080' }}>Assigned On</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                                </div>

                                <input type="text" style={{ color: 'black' }}
                                    value={moment(this.state.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                            <label className="mb-0" style={{ color: '#808080' }}>Deadline</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                                </div>

                                <input type="text" style={{ color: 'black' }}
                                    value={moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                            <label className="mb-0" style={{ color: '#808080' }}>Priority</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text"><i class="fas fa-tasks"></i></label>

                                </div>
                                {console.log("prio", this.state.popup.priority)}
                                <input type="text" style={{ color: 'black' }}
                                    value={this.state.popup.priority} className="form-control" readOnly /> </div>


                        </Modal.Body>
                        <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
                            Number of days : {moment(this.state.popup.endDate).diff(moment(this.state.popup.assignDate), 'days')}
                        </Modal.Footer>
                    </Modal>
                    <div className="container-fluid">
                        <center>
                            <div className="row container">
                                <div className="col-lg-4 col-md-3 col-sm-3" id="todo"  >
                                    <div className="col-auto">

                                        <div id="card bg-default head" >
                                            <h5 id="card-header" className="card-header header">
                                                <center className="letter" >TODO</center>
                                            </h5>
                                        </div>
                                        <div className=" card-body cards">
                                            {this.props.searchData.filter(item => (item.priority === 'critical') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto" >
                                                           <div className="cor" >
                                                           <i class="fas fa-times-circle" onClick={() => this.delete(item.taskId, "completed")}></i>
                                                     </div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                       {stickyCri(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'high') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto">
                                                          <div className="cor" >
                                                          <i class="fas fa-times-circle" onClick={() => this.delete(item.taskId, "completed")}></i>
                                                     </div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyHigh(item)}
                                                </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'medium') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto">
                                                    <div className="cor" >
                                                    <i class="fas fa-times-circle" onClick={() => this.delete(item.taskId, "completed")}></i>
                                                     </div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyMedium(item)}

                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'low') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto">
                                                          <div className="cor" >
                                                          <i class="fas fa-times-circle" onClick={() => this.delete(item.taskId, "completed")}></i>
                                                     </div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div> 
                                                        {stickyLow(item)}
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
                                                <center className="letter" > IN PROGRESS </center>
                                            </h5>
                                        </div>
                                        <div className="  card-body cards">
                                            {this.props.searchData.filter(item => (item.priority === 'critical') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto container">

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyCri(item)}

                                                        <div class="container-fluid">
                                                        </div>

                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'high') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto container">
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyHigh(item)}

                                                        <div class="container-fluid">
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'medium') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto container">


                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyMedium(item)}

                                                        <div class="container-fluid">
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'low') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto">

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyLow(item)}

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
                                                <center className="letter"> BLOCKED </center>
                                            </h5>
                                        </div>
                                        <div className=" card-body cards">
                                            {this.props.searchData.filter(item => (item.priority === 'critical') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto" >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyCri(item)}

                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'high') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto">
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                      {stickyHigh(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'medium') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto">
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        
                                                        {stickyMedium(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.props.searchData.filter(item => (item.priority === 'low') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto">

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyLow(item)}

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
        } else {
            return (<center><h3>No Records Found</h3></center>)
        }

    }
}
export default withRouter(Byme)



