import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment';

import './HomePage.css';
import Footer from '../navBar/footer';
import '../login/welcom.css'
import { stickyHigh, stickyMedium, stickyLow, stickyCri } from './Sticky';
import { Architectproject, SideNavBar } from '../Architect/SideData';
import { Project } from '../Architect/ProjectInfo';
import '../createTask/home.css'
import TaskInfo from './TaskInfo';

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
            taskBean: [],
            user: '',
            datas: [],
            mail: JSON.parse(window.localStorage.getItem('beans')),
            email: null,
            page: "To Me",
            loading: false,
            groupId: null,
            architect: false,
            lead: false,
            emp: false,
            groupId: localStorage.getItem('groupId'),
            role: JSON.parse(window.localStorage.getItem('role')),
            project: null,
            showData: false,
            userBean: null,
            edit: false,
            updateComment: null,
            commentBean: [],
            comment: ''

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

        if (this.state.role === "architect") {
            this.setState({
                architect: true
            })
        } else if (this.state.role === "lead") {
            this.setState({
                lead: true
            })
        } else {
            this.setState({
                emp: true
            })
        }

    }
    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Server Not Responding</center>, {
                position: "top-center", autoClose: false,
            });
        }
    }

    NotifyNoTaskAssigned = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>No Task Exists</center>, {
                position: "top-center", autoClose: false
            });
        }
    }

    NotifyCompletedTask = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>All Tasks are completed, check the completed task section for details</center>, {
                position: "top-center", autoClose: false
            });
        }
    }



    NotifyUpdatedTask = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>Task Updated Successfully</center>, {
                position: "top-center", autoClose: false,
            });
        }
    }


    getTask() {
        console.log("==================", this.state.groupId)
        this.setState({ loading: true });
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get(localStorage.getItem('groupId') ? 'http://localhost:8080/get-task-for-project?groupId=' + localStorage.getItem('groupId') + '&email=' + this.state.email
                : 'http://localhost:8080/get-assigned-task?email=' + this.state.email)
                .then((response) => {
                    this.setState({ loading: false });

                    if (response.data.statusCode === 201) {
                        //setstate
                        const state = { ...this.state }
                        state.todo = response.data.taskBean.filter(item => item.status === 'todo');
                        state.blocked = response.data.taskBean.filter(item => item.status === 'blocked');
                        state.onProgress = response.data.taskBean.filter(item => item.status === 'onProgress');
                        state.project = response.data.taskBean[0].projectBean
                        state.completed = response.data.taskBean.filter(item => item.status === 'completed')
                        state.userBean = response.data.bean
                        this.setState({
                            ...state
                        })
                        this.setState({ loading: false });

                        if (this.state.todo.length === 0 && this.state.blocked.length === 0 && this.state.onProgress.length === 0 && this.state.completed.length != 0) {
                            this.NotifyCompletedTask();
                        }

                    } else if (response.data.statusCode === 401) {
                        this.NotifyNoTaskAssigned();

                    }
                }).catch((error) => {
                    console.log("error", error)
                    this.setState({ loading: false });
                    this.NotifyServerOffline();
                })
        } else {
            this.props.history.push('/')
        }
    }
    updateCompleted(a, b) {
        this.setState({
            showData: false
        })
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
    addComment() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/add-comment',
            data: this.state
        }).then((response) => {
            if (response.data.statusCode === 201) {
                this.setState({
                    comment: null
                }, () => {
                    this.comment();
                })
            }
        }).catch((error) => {
            console.log(error)
            this.setState({ loading: false });
            this.NotifyServerOffline();
        })
    }
close=(data)=>{
    if(data=="close"){
        this.setState({
            showData:false
        })
    }
}
    getCommentData = (data) => {
        console.log("comment=============", data)
     


        if (data && data != '') {
            this.setState({
                comment: data
            }, () => { this.addComment() })
        } else {
            this.setState({
                showData: false
            }, () => {
                this.NotifyUpdatedTask();
                this.getTask()
            })
        }
    }

    comment() {
        Axios.get('http://localhost:8080/get-All-comment?taskId=' + this.state.taskBean.taskId)
            .then((response) => {

                if (response.data.statusCode === 201) {
                    this.setState(
                        {
                            commentBean: response.data.commentBean,
                            comment: '',
                        }, () => {
                            this.setState({
                                showData: true
                            })
                        }
                    )
                }
            }).catch((error) => {
                console.log(error)
                this.setState({ loading: false });
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
            taskBean: item,
            user: userBean,
            page: "To Me"
        })
        console.log("aaaaaaaaaaaaaa", userBean)
        this.setState({ show: !this.state.show })
    }

    showData(item, userBean) {
        console.log("aaaaaaaaaaaaaa ============== userBean", userBean)
        console.log("aaaaaaaaaaaaaa ============= item", item)
        this.setState({
            taskBean: item,
            user: userBean,
        }, () => this.comment())
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


    render() {
        return (

<div id="page-container"  >

<div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
    <PropagateLoader css={this.override} size={10} color={'#123abc'} loading={this.state.loading} />
</div>
<ToastContainer />


    {/*  popUp */}
    <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
        <Modal.Header closeButton>
            <Modal.Title>
                <div className="" style={{ color: '#808080' }}>Subject - <span style={{ color: 'black' }}> {this.state.taskBean.subject} </span></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label className="mb-0" style={{ color: '#808080' }}>Description</label>
            <div className="input-group mb-2">
                <textarea style={{ color: 'black' }} value={this.state.taskBean.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
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
                    value={moment(this.state.taskBean.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
            <label className="mb-0" style={{ color: '#808080' }}>Deadline</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                </div>

                <input type="text" style={{ color: 'black' }}
                    value={moment(this.state.taskBean.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
            <label className="mb-0" style={{ color: '#808080' }}>Priority</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i class="fas fa-tasks"></i></label>

                </div>
                {console.log("prio", this.state.taskBean.priority)}
                <input type="text" style={{ color: 'black' }}
                    value={this.state.taskBean.priority} className="form-control" readOnly /> </div>
        </Modal.Body>
        <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
            Number of days : {moment(this.state.taskBean.endDate).diff(moment(this.state.taskBean.assignDate), 'days')}
        </Modal.Footer>
    </Modal>
    {/* end of taskBean */}
   
    <div class="container-fluid">
                <div class="row">
            <div className="col-md-12">
                <div className="row">
                               {localStorage.getItem("groupId")?<Architectproject/> :<SideNavBar/>} 
                               <div class="col-md-8 col-sm-12"><br/>
                               {localStorage.getItem('groupId')?<div className="projectName"><Link style={{color:'black'}} onClick={()=>{this.props.history.push('/homePage')}} className="dark">Project</Link>&nbsp;/&nbsp;
                                            <Link style={{color:'black'}} to='/taskPage'>{localStorage.getItem("projectName")}</Link></div>:null} 
                                 <br/>
                               <div class="row">

                              {/*  */}           <div class="col-md-4 col-sm-12" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                                            <div class="card">
                                                    {/* ToDo */}
                                                    <div  className="card-header header">
                                                            <center className="letter" >TODO</center>
                                                        </div>
                                                  
                                                    <div className=" card-body cards">
                                                        {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)}  className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyCri(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'high').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyHigh(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'medium').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyMedium(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'low').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
                                                                    <div id="i7" className=" a" >
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
                                            <div className="col-sm-4" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                                                <div className="card">
                                                <div className="card-header header">
                                                            <center className="letter" > IN PROGRESS </center>
                                                        </div>
                                                    <div className="card-body cards">
                                                        {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>

                                                                    <div id="i7" className=" a" >
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
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>
                                                                    <div id="i7" className=" a" >
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
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>

                                                                    <div id="i7" className=" a" >
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
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >

                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>
                                                                    <div id="i7" className=" a" >
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

                                            <div className="col-sm-4" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                                                <div className="card">
                                                <div className="card-header header">
                                                            <center className="letter"> BLOCKED </center>
                                                        </div>
                                                    <div className=" card-body cards">
                                                        {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div  onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)} >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyCri(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'high').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyHigh(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'medium').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className=" a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyMedium(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'low').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >

                                                                    <div id="i7" className=" a" >
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


                                        {/*End Of blocked */}

                        </div>
                    </div>
                    <div class="col-md-2 col-sm-12">


{this.state.showData?
<div>

<TaskInfo  taskBean={this.state.taskBean} user={this.state.user} close={()=>this.setState({showData:false})} showUpadtaed={()=>this.getData()} comment={this.getCommentData.bind()} commentBean={this.state.commentBean}  />
 </div>
:null}
                            </div>
</div>
</div>

                        </div>
                    
   </div>

<div> <Footer style={{}}/></div>
</div>



        )
    }
}
export default withRouter(HomePage)


