import React, { Component } from 'react';
import Axios from 'axios';
import './HomePage.css';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Modal, Button, Card } from 'react-bootstrap'
import UserContext from '../UserContext';
import App from '../../App';
import SearchNavabar from '../navBar/SearchNavabar';
export class HomePage extends Component {

    constructor(props) {
        super(props)
        this.componentDidMount();

        this.state = {
            todo: [],
            complete: [],
            blocked: [],
            onProgress: [],
            userEmail:this.props.value,
            containerName: '',
            showButton: false,
            isValid: JSON.parse(window.localStorage.getItem('isValid')),
            show: false,
            popup: [],
            user: '',
            datas: [],
            mail: JSON.parse(window.localStorage.getItem('beans'))
        }
        console.log('bean ', this.state.taskBean);
        this.getTask = this.getTask.bind(this);
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
        console.log("componentDidMount")
        this.setState({
            userEmail:this.props.value
        })
        this.getTask()
    }
    
    getTask() {
        let mail=[]
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
                console.log("login",JSON.parse(window.localStorage.getItem('beans')))
               
                    mail=JSON.parse(window.localStorage.getItem('beans'))
                
                 console.log("login======mail",mail)
          Axios.get('http://localhost:8080/getAssignedTask?email=' +mail.email)
                .then((response) => {
                    console.log("aaaaaaaaaaaaaaaaaa",response.data.message)
                    if (response.data.statusCode === 201) {
                        //setstat
                        this.setState({
                            todo: response.data.taskBean.filter(item => item.status === 'todo'),
                            complete: response.data.taskBean.filter(item => item.status === 'completed'),
                            blocked: response.data.taskBean.filter(item => item.status === 'blocked'),
                            onProgress: response.data.taskBean.filter(item => item.status === 'onProgress'),
                        })
                        console.log('bean if', this.state.todo);
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
            Axios.put('http://localhost:8080/updateTaskStatus?taskId=' + a + '&status=' + b)
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
        let a = [];
        let b = '';
        return (
            <div>
                <SearchNavabar />
                <Navbar className=" justify-content-between">
                    <NavDropdown title="ToMe" id="basic-nav-dropdown">
                        <NavLink className="nav-link" to="/homePage" >To Me</NavLink>
                        <NavLink className="nav-link" to="/byme">By Me</NavLink>
                    </NavDropdown>
                    <Button class="btn  mr-sm-2   btn-sm" onClick={(e) => { this.completed(e) }} variant="outline-success" type="button" >
                        Completed Task
                         </Button>
                </Navbar>
        
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
                            <div className="col-lg-4 col-md-3 col-sm-3" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>


                                <div className="col-auto">
                                    <div id="card bg-default head" >
                                        <h5 id="card-header" className="card-header header">
                                            <center className="letter" > In Progress </center>
                                        </h5>
                                    </div>
                                    <div className="  card-body cards">

                                        {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                            return (

                                                <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    onDragStart={(e) => this.drag(e, "onProgress")}  >
                                                    <div className="cor" onClick={() => this.update(item.taskId, "completed")}>
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
                                                    <div className="cor" onClick={() => this.update(item.taskId, "completed")}>
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
                                                    <div className="cor" onClick={() => this.update(item.taskId, "completed")}>
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

                                                    <div className="cor" onClick={() => this.update(item.taskId, "completed")}>
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
                </div>
            </div>


        )
    }
}


export default withRouter(HomePage)

