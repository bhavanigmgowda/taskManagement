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
import { Architectproject, Leadproject, Employeeproject, Architect, Lead, Employee } from '../Architect/SideData';
import { Project } from '../Architect/ProjectInfo';
import '../createTask/home.css'

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
            showData:false,
            comment:null,
            userBean:null,
            commentBean:[],
            edit:false,
            updateComment:null,

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
    updateComment(item){
        console.log("===================update",item.comment,this.state.updateComment)
        if(item.comment!==this.state.updateComment&&this.state.updateComment!=null &&this.state.updateComment!==''){
            this.setState({
                comment:this.state.updateComment
            },()=>{
               item.comment=this.state.comment
            Axios({
                method: 'put',
                url: 'http://localhost:8080/update-comment',
                          data:item
              }).then((response) => {
                    if (response.data.statusCode === 201) {
                      this.setState({
                          updateComment:''
                      })
                    }
                    this.comment();
                }).catch((error) => {
                    console.log(error)
                    this.setState({ loading: false });
                    this.NotifyServerOffline();
                })
            })
  }
    }
addComment(){
    
  
        Axios({
            method: 'post',
            url: 'http://localhost:8080/add-comment',
                      data:this.state
          }).then((response) => {
                if (response.data.statusCode === 201) {
                  this.setState({
                      comment:null
                  },()=>{
                    this.comment();
                  })
                }
                
            }).catch((error) => {
                console.log(error)
                this.setState({ loading: false });
                this.NotifyServerOffline();
            })
     

}

edit(email){
    console.log("=======edit")

if(this.state.email===email){
    console.log("=======edit")
    this.setState({
        edit:true
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

    NotifyNoTaskAssigned = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>No Task Exists</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    deleteComment(commentId){
        Axios.delete('http://localhost:8080/delete-comment?commentId=' + commentId)
        .then((response) => {
                if (response.data.statusCode === 201) {
                 
                    this.comment();
                 
                }
                
            }).catch((error) => {
                console.log(error)
                this.setState({ loading: false });
                this.NotifyServerOffline();
            })
     
    }

    getTask() {
        debugger
        console.log("==================", this.state.groupId)
        this.setState({ loading: true });
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get(localStorage.getItem('groupId') ? 'http://localhost:8080/get-task-for-project?groupId=' + localStorage.getItem('groupId')+'&email='+this.state.email
                : 'http://localhost:8080/get-assigned-task?email=' + this.state.email)
                .then((response) => {
                        this.setState({ loading: false });

                        if (response.data.statusCode === 201) {

                            //setstat
                            const state = { ...this.state }
                            state.todo = response.data.taskBean.filter(item => item.status === 'todo');
                            state.blocked = response.data.taskBean.filter(item => item.status === 'blocked');
                            state.onProgress = response.data.taskBean.filter(item => item.status === 'onProgress');
                            state.project = response.data.taskBean[0].projectBean
                            state.userBean=response.data.bean
                            this.setState({
                                ...state                                                                                                                                                                                                                                                
                            })
                            this.setState({ loading: false });      
                        }else if(response.data.statusCode === 401){
                            this.NotifyNoTaskAssigned();

                        }
                    }).catch((error) => {
                    console.log("error",error)
                    this.setState({ loading: false });
                    this.NotifyServerOffline();
                })
        } else {
            this.props.history.push('/')
        }
    }
    updateCompleted(a, b) {
        this.setState({
            showData:false
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

    comment(){
        Axios.get('http://localhost:8080/get-All-comment?taskId=' + this.state.taskBean.taskId)
        .then((response) => {
           
            if (response.data.statusCode === 201) {
                this.setState(
                    { 
                        commentBean: response.data.commentBean ,
                        comment:''
                    
                    }
                )
               
            }
        }).catch((error) => {
            console.log(error)
            this.setState({ loading: false });
            this.NotifyServerOffline();
        })
    }

    showData(item, userBean) {
        this.setState({
            taskBean: item,
            user: userBean,
            page: "To Me"
        },()=>{
            this.comment();

        })

       

        console.log("aaaaaaaaaaaaaa", userBean)
        this.setState({ showData:true })
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
            <div id="page-container" className="container-fluid" >

                <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
                    <PropagateLoader css={this.override} size={10} color={'#123abc'} loading={this.state.loading} />
                </div>
                <ToastContainer />


                <div id="content-wrap" >
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
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2 cssCard " >
                                        <div class=" card-body  h-75">
                                            <div className="input-group mb-3 option">
                                                {this.state.architect ?<div>{localStorage.getItem("groupId")?<Architectproject/> :<Architect/>} </div> : null}
                                                {this.state.lead ?<div>{localStorage.getItem("groupId")? <Leadproject /> :<Lead/>} </div> : null}
                                                {this.state.emp ?<div>{localStorage.getItem("groupId")? <Employeeproject /> :<Employee/>} </div> : null}                                             
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div id="card" >
                                            <div class=" card-body ">
                                                <div className="container-fluid">
                                               {localStorage.getItem('groupId')?<div className="projectName"><Link style={{color:'black'}} onClick={()=>{this.props.history.push('/homePage')}} className="dark">Project</Link>&nbsp;/&nbsp;
                                                            <Link style={{color:'black'}} to='/taskPage'>{localStorage.getItem("projectName")}</Link></div>:null} 
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
                                                                                <div onClick={() => this.showData(item, item.userBean)}  className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div  onClick={() => this.showData(item, item.userBean)} className="col-auto"
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
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

                                    <div className="col-lg-2 " >
                                        <div className="col-md-12">
                                            <div className="row">
{/*                                             {localStorage.getItem("projectName")?<h4>Project Name: {localStorage.getItem("projectName")}</h4>:null}
 */}
{this.state.showData?
                                                <div class=" card-body  h-75">
                                                    <div className="input-group mb-3 option">
                                                        <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                                                        <div className="input-group mb-2">
                                                            <textarea style={{ color: 'black' }} value={this.state.taskBean.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
                                                        <label className="mb-0" style={{ color: '#808080' }}>Assigned By</label>
                                                        <div className="input-group mb-2">
                                                            <div className="input-group-prepend ">
                                                                <label className="input-group-text "><i className="fas fa-at" /></label>
                                                            </div>
                                                            <input type="text" value={this.state.user.email} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
                                                        
                                                            <label className="mb-0" style={{ color: '#808080' }}>Assigned To</label>
                                                        <div className="input-group mb-2">
                                                            <div className="input-group-prepend ">
                                                                <label className="input-group-text "><i className="fas fa-at" /></label>
                                                            </div>
                                                            <input type="text" value={this.state.taskBean.assignedTo} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
                                                
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
                                                             <label className="mb-0" style={{ color: '#808080' }}>Comment</label>
                                                            <div className="commentBlock" /* style={{overflowY:"scroll", height:"300px",width:"100%"}} */>
                                                            {this.state.commentBean.filter(item => this.state.email !== item.userBean.email).map(item => {
                                                                            return (
                                                                                <div>
                                                                                <label className="mb-0" style={{ color: 'black',    fontSize:'15' }}>{item.userBean.employeeName}</label>
                                                                                <div className="input-group mb-2">               
                                                                               
                                                                                  <textarea style={{ color: 'black' }} readOnly value={item.comment} onClick={()=>this.edit(item.userBean.email)} type="text" className="form-control" placeholder="Designation"  />  
                                                                                
                                                                                    </div>
                                                                                    </div>
                                                                     
                                                                                )
                                                                        }
                                                                        )}
                                                            {this.state.commentBean.filter(item => this.state.email === item.userBean.email).map(item => {
                                                                            return (
                                                                                <div>
                                                                                <label className="mb-0" style={{ color: 'black',    fontSize:'15' }}>{item.userBean.employeeName}</label>
                                                                                <div className="input-group mb-2">               
                                                                               
                                                                                  <textarea style={{ color: 'black' }}  onChange={(e)=>this.setState({updateComment:e.target.value})} value={this.state.updateComment}  onClick={()=>this.edit(item.userBean.email)} type="text" className="form-control" placeholder={item.comment}  />  
                                                                                    </div>
                                                                                    <Link className="edit" onClick={()=>this.updateComment(item)}>save</Link>
                                                                                   &nbsp;&nbsp; <Link className="edit" onClick={()=>this.deleteComment(item.commentId)}>delete</Link>
                                                                                    </div>
                                                                               )
                                                                        }
                                                                        )}
                                                            </div>
                                                        <div className="input-group mb-2">
                                                            <textarea style={{ color: 'black' }}  type="text" className="form-control" placeholder="Add a Comment"
                                                            onChange={(e)=>this.setState({comment:e.target.value})} value={this.state.comment}  />  </div>
                                                            <Button onClick={()=>this.addComment()} >save</Button>
                                                            {console.log("============",this.state.comment)}
                                                            
                                                    </div>
                                                </div>:null}
                                            </div>
                                        </div>
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


