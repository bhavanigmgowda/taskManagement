import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import moment from 'moment';

import './HomePage.css';
import Footer from '../navBar/footer';
import '../login/welcom.css'
import { stickyHigh, stickyMedium, stickyLow, stickyCri } from './Sticky';
import { Architectproject, Leadproject, Employeeproject } from '../Architect/SideData';
import { LeadHomePage } from '../Lead/LeadHome';
import { ArchitectHomePage } from '../Architect/ArchitectHomePage';

export class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: [],
            complete: [],
            blocked: [],
            onProgress: [],
            containerName: '',
            showButton: false,
            isValid: JSON.parse(localStorage.getItem('isValid')) === 'true' ? true : false,
            show: false,
            popup: [],
            user: '',
            datas: [],
            mail: JSON.parse(window.localStorage.getItem('beans')),
            email: null,
            page: "To Me",
            loading: false,
            groupId: null,
            architect:false,
			lead:false,
            emp:false,
            groupId:localStorage.getItem('groupId'),

        }
        {
            this.state.userEmail = this.props.value

        }

    }

    onDragOver = (ev, a) => {
        var x = document.getElementById(a).id;
        this.setState({
            containerName: x
        })
        ev.preventDefault();
    }

    componentDidMount() {
        if (!this.props.value) {
            let userData = JSON.parse(window.localStorage.getItem('beans'))
            console.log("=mmmmmmm=============", userData)
            if (userData != null) {
                console.log("=========sdfdfs=====", userData)

                this.setState({
                    email: userData.email
                }, () => {
                    this.getTask()
                })
            }
        } else {
            this.setState({
                email: this.props.value
            }, () => {
                this.getTask()
            })
        }

        this.setState({
            groupId: localStorage.getItem('groupId')
        })

        if(this.state.role==="architect"){
            this.setState({
                architect:true
            })
        }else if(this.state.role==="lead"){
            this.setState({
                lead:true
            })
        }else{
            this.setState({
                emp:true
            })
        }

    }
    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Server Not Responding</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }

    getTask() {
        debugger
        console.log("==================", this.state.groupId)
        this.setState({ loading: true });
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get(localStorage.getItem('groupId') ? 'http://localhost:8080/get-task-for-project?groupId=' + localStorage.getItem('groupId')
                : 'http://localhost:8080/get-assigned-task?email=' + this.state.email)
                .then((response) => {
                    console.log("object", response.data.taskBean)
                    this.setState({ loading: false });

                    if (response.data.statusCode === 201) {
                        console.log("object", response.data.taskBean)
                        //setstat
                        const state = { ...this.state }
                        state.todo = response.data.taskBean.filter(item => item.status === 'todo');
                        state.blocked = response.data.taskBean.filter(item => item.status === 'blocked');
                        state.onProgress = response.data.taskBean.filter(item => item.status === 'onProgress');
                        this.setState({
                            ...state
                        })
                        this.setState({ loading: false });
                    }
                }).catch((error) => {
                    console.log(error)
                    this.setState({ loading: false });
                    this.NotifyServerOffline();
                })
        } else {
            this.props.history.push('/')
        }
    }
    updateCompleted(a, b) {
        var moment = require('moment');
        var moment = moment().format('YYYY-MM-DD');
        Axios.put('http://localhost:8080/update-task-completed-Date?taskId=' + a + '&status=' + b + '&completedDate=' + moment)
            .then((response) => {
                if (response.data.statusCode === 201) {
                    this.getTask();
                }
            }).catch((error) => {
                console.log(error)
                this.NotifyServerOffline();
            })
    }
    update(a, b) {
        var c = this.state.containerName;
        if (b === "todo") {
            b = "onProgress"
        } else if (b === "onProgress") {
            b = "blocked"
        }
        else if (b === "blocked") {
            b = "onProgress"
        }
        if (b === "onProgress" && c == "onProgress" || b === "blocked" && c == "blocked" || b === "completed") {
            this.setState({ loading: true });

            Axios.put('http://localhost:8080/update-task-status?taskId=' + a + '&status=' + b)
                .then((response) => {
                    this.setState(
                        { loading: false }
                    );
                    if (response.data.statusCode === 201) {
                        this.getTask();
                    }
                }).catch((error) => {
                    console.log(error)
                    this.setState({ loading: false });

                    this.NotifyServerOffline();
                })
        }
    }

    showvis(item, userBean) {
        this.setState({
            popup: item,
            user: userBean,
            page: "To Me"
        })
        console.log("aaaaaaaaaaaaaa", userBean)
        this.setState({ show: !this.state.show })
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }

    completedTask(e) {
        e.preventDefault();
        this.props.history.push('/completedTask')
    }

    pageName(data) {
        if (data === "By Me") {
            this.setState({
                page: data
            })
            this.props.byme()
            localStorage.setItem("pages", JSON.stringify("By Me"))
        } else {
            /*             localStorage.setItem("pages", JSON.stringify("To Me"))
             */
        }
    }
    rolePage() {
        let role = localStorage.getItem('role')
        console.log("aaaa", role)
        if (role === "architect") {
            return (
                ArchitectHomePage()
            )
        } else if (role === "lead") {
            return (
                LeadHomePage()
            )
        } else {
            return (
<ArchitectHomePage/>
                )
        }

    }

    render() {
        return (
            <div id="page-container" >
                {/* <Nav >
                    <div class="dropdown">
                        <button class="dropbtn">{this.state.page} &nbsp;
                            <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <NavLink onClick={this.props.clearSearch} className="nav-link linkbar" onClick={(event) => { this.pageName("To Me") }} to="/homePage"  >To Me</NavLink>

                            <NavLink onClick={this.props.clearSearch} className="nav-link linkbar" onClick={(event) => { this.pageName("By Me") }} to="/byme" >By Me</NavLink>
                        </div>
                    </div>

                    <Button onClick={(e) => { this.completedTask(e) }} className="com" style={{ marginLeft: '88%' }}>Completed Task</Button>

                </Nav> */}
                <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto', marginBottom: '1%' }}>
                    <PropagateLoader css={this.override} size={10} color={'#123abc'} loading={this.state.loading} />
                </div>
                <ToastContainer />


                <div id="content-wrap" >
                    {/*  popUp */}
                    <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className="" style={{ color: '#808080' }}>Subject - <span style={{ color: 'black' }}> {this.state.popup.subject} </span></div></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                            <div className="input-group mb-2">
                                <textarea style={{ color: 'black' }} value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
                            <label className="mb-0" style={{ color: '#808080' }}>Assigned By</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend ">
                                    <label className="input-group-text "><i className="fas fa-at" /></label>
                                </div>
                                <input type="text" value={this.state.user.email} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
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
                    {/* end of popup */}
                    {/*    {localStorage.getItem('groupId')? <Link to="/Ar">Project</Link> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2 cssCard" >
                                        <div class=" card-body  h-75">
                                            <div className="input-group mb-3 option">
                                            {this.state.architect?<Architectproject/>:null}
										{this.state.lead?<Leadproject/>:null}
										{this.state.emp?<Employeeproject/>:null}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-8">
                                        <div id="card" >
                                            <div class=" card-body ">
                                                <div className="container-fluid">
                                                    <center>
                                                        <div className="row container">
                                                            <div className="col-lg-4 col-md-3 col-sm-3" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                                                                <div className="col-auto">
                                                                    {/* ToDo */}
                                                                    <div id="card bg-default head" >
                                                                        <h5 id="card-header" className="card-header header">
                                                                            <center className="letter" >TODO</center>
                                                                        </h5>
                                                                    </div>
                                                                    <div className=" card-body cards">
                                                                        {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                                                            return (
                                                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyCri(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.todo.filter(item => item.priority === 'high').map(item => {
                                                                            return (
                                                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyHigh(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.todo.filter(item => item.priority === 'medium').map(item => {
                                                                            return (
                                                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyMedium(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.todo.filter(item => item.priority === 'low').map(item => {
                                                                            return (
                                                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
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
                                                            {/*End of  ToDo */}
                                                            {/* onProgress */}
                                                            <div className="col-lg-4 col-md-3 col-sm-4 col-3" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                                                                <div className="col-auto">
                                                                    <div id="card bg-default head" >
                                                                        <h5 id="card-header" className="card-header header">
                                                                            <center className="letter" > IN PROGRESS </center>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="card-body cards">
                                                                        {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                                                            return (
                                                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                                        <i class="far fa-check-circle"></i></div>

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
                                                                        {this.state.onProgress.filter(item => item.priority === 'high').map(item => {
                                                                            return (
                                                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                                        <i class="far fa-check-circle"></i></div>
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
                                                                        {this.state.onProgress.filter(item => item.priority === 'medium').map(item => {
                                                                            return (
                                                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                                        <i class="far fa-check-circle"></i></div>

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
                                                                        {this.state.onProgress.filter(item => (item.priority === 'low')).map(item => {
                                                                            return (
                                                                                <div className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >

                                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                                        <i class="far fa-check-circle"></i></div>
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
                                                            {/* End onProgress */}
                                                            {/* blocked */}

                                                            <div className="col-lg-4 col-md-3 col-sm-3" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                                                                <div className="col-auto">
                                                                    <div id="card bg-default head" >
                                                                        <h5 id="card-header" className="card-header header">
                                                                            <center className="letter"> BLOCKED </center>
                                                                        </h5>
                                                                    </div>
                                                                    <div className=" card-body cards">
                                                                        {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                                                            return (
                                                                                <div className="col-auto"
                                                                                    onDragEnd={() => this.update(item.taskId, item.status)} >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyCri(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.blocked.filter(item => item.priority === 'high').map(item => {
                                                                            return (
                                                                                <div className="col-auto"
                                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyHigh(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.blocked.filter(item => item.priority === 'medium').map(item => {
                                                                            return (
                                                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >
                                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                                    </div>
                                                                                    {stickyMedium(item)}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )}
                                                                        {this.state.blocked.filter(item => item.priority === 'low').map(item => {
                                                                            return (
                                                                                <div className="col-auto"
                                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                                >

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
                                                        {/*End Of blocked */}
                                                    </center>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 cssCard" >
                                        <div className="col-md-12">
                                            <div className="row">


                                                <div class=" card-body  h-75">
                                                    <div className="input-group mb-3 option">



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div> <Footer></Footer></div>
            </div>
        )
    }
}
export default withRouter(HomePage)


