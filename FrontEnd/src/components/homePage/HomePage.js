import React, { Component } from 'react';
import Axios from 'axios';
import './HomePage.css';
import {NavDropdown, Navbar, Nav } from 'react-bootstrap'
import { NavLink,withRouter } from 'react-router-dom';
import { Button, } from 'react-bootstrap'
import SearchNavabar from '../navBar/SearchNavabar';
import { Modal} from 'react-bootstrap'
import moment from 'moment';
import Footer from '../navBar/footer';
import '../login/welcom.css'
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
            isValid: JSON.parse(localStorage.getItem('isValid'))==='true'?true:false,
            show: false,
            popup: [],
            user: '',
            datas: [],
            mail: JSON.parse(window.localStorage.getItem('beans')),
            email : null
        }
      { this.state.userEmail=this.props.value}
            console.log('bean ', this.state.taskBean);
    }
    onDragOver = (ev, a) => {
        var x = document.getElementById(a).id;
        this.setState({
            containerName: x
        })
        ev.preventDefault();
    }
    drag(ev) {
        console.log("drag", ev.dataTransfer.setData("text", ev.target.id));
    }
    componentDidMount() {
        if(!this.props.value){
            let userData = JSON.parse(window.localStorage.getItem('beans')) 
            this.setState({
                email : userData.email
            },()=>{
                this.getTask()
            })
        }else{
            this.setState({
                email : this.props.value
            },()=>{
                this.getTask()
            })
        }
        // console.log("componentDidMount")
        // this.setState({
        //     userEmail:this.props.value
        // })
        
    }
    getTask() {
        let mail=[]
        let ddd = JSON.parse(window.localStorage.getItem('isValid'))
        console.log('SSS',typeof ddd)
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
                console.log("login",JSON.parse(window.localStorage.getItem('beans')))
              mail=JSON.parse(window.localStorage.getItem('beans'))
                 console.log("login======mail",mail) 
          Axios.get('http://localhost:8080/get-assigned-task?email='+this.state.email)
                .then((response) => {
                    console.log("aaaaaaaaaaaaaaaaaa",this.state.userEmail)
                    if (response.data.statusCode === 201) {
                        //setstat
                        console.log("object",response.data.taskBean)
                        this.setState({
                            todo: response.data.taskBean.filter(item => item.status === 'todo'),
                            complete: response.data.taskBean.filter(item => item.status === 'completed'),
                            blocked: response.data.taskBean.filter(item => item.status === 'blocked'),
                            onProgress: response.data.taskBean.filter(item => item.status === 'onProgress'),
                        })
                        console.log('bean if', this.state.todo);
                        localStorage.setItem("pages", JSON.stringify("tome"));
                    } else {
                        this.pRef.current.style.visibility = "visible"
                    }
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            this.props.history.push('/')
        }
    }
    updateCom(a,b){

    }
    update(a, b) {
        console.log("=======classname of update======", this.state.containerName);
        var c = this.state.containerName
        if (b === "todo") {
            b = "onProgress"
        } else if (b === "onProgress") {
            b = "blocked"
        }
        else if (b === "blocked") {
            b = "onProgress"
        }
        console.log("==========status=======", b)
        if (b === "onProgress" && c == "onProgress" || b === "blocked" && c == "blocked" || b === "completed") {
            Axios.put('http://localhost:8080/update-task-status?taskId=' + a + '&status=' + b)
                .then((response) => {
                    console.log(response.data.message)
                    if (response.data.statusCode === 201) {
                        this.getTask();
                        this.props.history.push('/homePage')
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    showvis(item, userBean) {
        console.log("showvis", item)
        this.setState({
            popup: item,
            user: userBean
        })
        this.setState({ show: !this.state.show })
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }
    getEmailData = (data) => {
        console.log('Dataaaaaa================', data)
        this.setState({
            datas: data
        })
    }
    completed(e) {
        e.preventDefault();
        this.props.history.push('/completedTask')
    }
    getEmail = (data) => {
        console.log('Dataaaaaa', data)
    }
        render() {
      
        return (
            <div id="page-container" >
                <Nav >
                    <NavDropdown title="To Me" id="basic-nav-dropdown">
                        <NavLink   className="nav-link" to="/homePage" >To Me</NavLink>
                        <NavLink  className="nav-link" onClick={this.props.byme} >By Me</NavLink>
                    </NavDropdown>
                    <NavLink className="nav-link" to="/completedTask" style={{ marginLeft: '91%', marginTop: '-46px' }}>Completed Task</NavLink>
                </Nav> 
                   <div  id="content-wrap"  >
                {/* <SearchNavabar /> */}
                {console.log("============",this.props.value)}
              
                <Modal size="sm" centered show={this.state.show} onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Task Details
                        <div>subject  {this.state.popup.subject}</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">
                            <textarea value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned by</span>
                            </div>  

                            <input type="text"
                                value={this.state.user.email} className="form-control" placeholder="Designation" readOnly /></div>


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
                            <div className="col-lg-4 col-md-3 col-sm-3" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                            <div className="col-auto">

                                <div id="card bg-default head" >
                                    <h5 id="card-header" className="card-header header">
                                        <center className="letter" >To Do</center>
                                    </h5>
                                </div>
                                <div className=" card-body cards">
                                   {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                        return (
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                onDragStart={(e) => this.drag(e, "todo")} >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p id="drag1" draggable="true" className="prCri"  >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.state.todo.filter(item => item.priority === 'high').map(item => {
                                        return (
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                onDragStart={(e) => this.drag(e, "todo")} >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p id="drag1" draggable="true" className="prHigh"  >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.state.todo.filter(item => item.priority === 'intermediate').map(item => {
                                        return (
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                onDragStart={(e) => this.drag(e, "todo")} >
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div>
                                                <p div id="drag2" draggable="true" className="prInit"   >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea>
                                                </p>
                                            </div>
                                        )
                                    }
                                    )}
                                    {this.state.todo.filter(item => item.priority === 'low').map(item => {
                                        return (
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
                                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                </div> <p id="drag3" draggable="true" className="prLow"   >
                                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea>
                                                </p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                    </div>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-4 col-3" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                                <div className="col-auto">
                                    <div id="card bg-default head" >
                                        <h5 id="card-header" className="card-header header">
                                            <center className="letter" > In Progress </center>
                                        </h5>
                                    </div>
                                    <div className="card-body cards">
                                        {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                            return (
                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "onProgress")}  >
                                                    <div className="cor" onClick={() => this.updateCom(item.taskId, "completed")}>
                                                        <i class="far fa-check-circle"></i></div>

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prCri ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.onProgress.filter(item => item.priority === 'high').map(item => {
                                            return (
                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "onProgress")}  >
                                                    <div className="cor" onClick={() => this.updateCom(item.taskId, "completed")}>
                                                        <i class="far fa-check-circle"></i></div>
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prHigh ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.onProgress.filter(item => item.priority === 'intermediate').map(item => {
                                            return (
                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "onProgress")}  >
                                                    <div className="cor" onClick={() => this.updateCom(item.taskId, "completed")}>
                                                        <i class="far fa-check-circle"></i></div>

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prInit ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                    <div class="container-fluid">
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.onProgress.filter(item => (item.priority === 'low')).map(item => {
                                            return (
                                                <div className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "onProgress")}  >

                                                    <div className="cor" onClick={() => this.updateCom(item.taskId, "completed")}>
                                                        <i class="far fa-check-circle"></i></div>
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prLow ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-3" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                                <div className="col-auto">
                                    <div id="card bg-default head" >
                                        <h5 id="card-header" className="card-header header">
                                            <center className="letter"> Blocked </center>
                                        </h5>
                                    </div>
                                    <div className=" card-body cards">
                                        {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                            return (
                                                <div className="col-auto"
                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "blocked")} >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prCri ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.blocked.filter(item => item.priority === 'high').map(item => {
                                            return (
                                                <div className="col-auto"
                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "blocked")} >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prHigh ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.blocked.filter(item => item.priority === 'intermediate').map(item => {
                                            return (
                                                <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "blocked")} >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prInit ">
                                                        < textarea id="d2" className="textarea" rows="5" cols="5" readOnly>{(item.description)}</textarea> </p>
                                                </div>
                                            )
                                        }
                                        )}
                                        {this.state.blocked.filter(item => item.priority === 'low').map(item => {
                                            return (
                                                <div className="col-auto"
                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "blocked")} >

                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                    </div>
                                                    <p id="drag6" draggable="true" class="prLow ">
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
                   
                    <Footer/>
                </div>
             
            </div>
         <div> </div>
            </div>
            

        )
    }
}
export default withRouter(HomePage)

