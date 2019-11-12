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
import { Architect, Lead, Employee } from '../Architect/SideData';
import TaskInfo from './TaskInfo';
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
            loading: false,
            taskData:[],
            architect: false,
            lead: false,
            emp: false,
            role: JSON.parse(window.localStorage.getItem('role')),
            showData:false,
            userBean:[]
        }
    }
    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Server Not Responding</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    NotifyUpdatedTask = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>Task Updated Successfully</center>, {
                position: "top-center", autoClose: 1500,
            });
        }
    }
    componentDidMount(){
        this.getTask()
        this.setState({
            userBean:this.props.userBean
        })
    }
   
    getTask() {
            Axios.get('http://localhost:8080/get-assign-to-task?email=' + this.state.email
            ).then((response) => {
              if (response.data.message === "Success") {
                this.setState({
                  taskData: response.data.taskBean
                })
              }
            }).catch((error) => {
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

    showData(item, userBean){
        console.log("aaaaaaaaaaaaaa ============== userBean", userBean)
        console.log("aaaaaaaaaaaaaa ============= item", item)
        this.setState({
            taskBean: item,
            user: userBean,
            page: "To Me",
        },()=>this.comment())
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

    getCommentData = (data) => {
        console.log("comment=============",data)
        if(data && data!=''){
        this.setState({
          comment:data
        },()=>{this.addComment()})
    }else{
        this.setState({
            showData:false
        },()=>{
            this.NotifyUpdatedTask();
            this.getTask()
        })
    }
}
    
    render() {
     
            return (
                <div>
                 
                        <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
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
                    <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2 cssCard " >
                                        <div class=" card-body  h-75">
                                            <div className="input-group mb-3 option">
                                            {this.state.architect ? <Architect /> : null}
                                            {this.state.lead ? <Lead /> : null}
                                            {this.state.emp ? <Employee /> : null}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div id="card" >
                                            <div class=" card-body ">
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
                                            {this.state.taskData.filter(item => (item.priority === 'critical') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)} >
                                                      
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                       {stickyCri(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'high') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>
                                                         <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyHigh(item)}
                                                </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'medium') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyMedium(item)}

                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'low') && (item.status === 'todo')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>
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
                                            {this.state.taskData.filter(item => (item.priority === 'critical') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto container" onClick={() => this.showData(item, item.userBean)}>

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
                                            {this.state.taskData.filter(item => (item.priority === 'high') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div className="col-auto container" onClick={() => this.showData(item, item.userBean)}>
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
                                            {this.state.taskData.filter(item => (item.priority === 'medium') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div onClick={() => this.showData(item, item.userBean)}className="col-auto container">


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
                                            {this.state.taskData.filter(item => (item.priority === 'low') && (item.status === 'onProgress')).map(item => {
                                                return (
                                                    <div onClick={() => this.showData(item, item.userBean)} className="col-auto">

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
                                    <div className="col-auto" >
                                        <div id="card bg-default head" >
                                            <h5 id="card-header" className="card-header header">
                                                <center className="letter"> BLOCKED </center>
                                            </h5>
                                        </div>
                                        <div className=" card-body cards">
                                            {this.state.taskData.filter(item => (item.priority === 'critical') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)} >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        {stickyCri(item)}

                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'high') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                      {stickyHigh(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'medium') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        
                                                        {stickyMedium(item)}
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.taskData.filter(item => (item.priority === 'low') && (item.status === 'blocked')).map(item => {
                                                return (
                                                    <div className="col-auto" onClick={() => this.showData(item, item.userBean)}>

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
                    </div>
                    </div>
                    <div className="col-lg-2 " >
                                        <div className="col-md-12">
                                            <div className="row">

{this.state.showData?
    <div>
        {console.log("this.state.taskBean",this.state.taskBean)}
        {console.log("this.state.user",this.state.user)}

 <TaskInfo  taskBean={this.state.taskBean} user={this.state.user} showUpadtaed={()=>this.getData()} comment={this.getCommentData.bind()} commentBean={this.state.commentBean}  />
                 </div>
 :null}
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
export default withRouter(Byme)



