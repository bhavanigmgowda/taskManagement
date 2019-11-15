import React, { useState } from 'react'
import Axios from 'axios';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Footer from '../navBar/footer'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import './projectmembers.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import { Architectproject, SideNavBar} from '../Architect/SideData';


import { Modal } from 'react-bootstrap'



class Projectmembers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectmembers: [],
            loading: false,
            show: false,
            cun: '',
            nun: '',
            groupId: localStorage.getItem('groupId'),
            architect: false,
            lead: false,
            emp: false,
            role: JSON.parse(window.localStorage.getItem('role')),

                //  projectBean: null
        }
    }

    getMembers() {

        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-members?groupId=' + this.state.groupId)
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        localStorage.setItem("pages", JSON.stringify("To Me"));

                        console.log("response", response);
                        //setstat
                        this.setState({
                            projectmembers: response.data.projectBeans
                            // projectmembers: response.data.names
                        })
                        console.log("object", response.data.projectBeans)
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
    change() {

        console.log("entered change method")
        Axios.delete('http://localhost:8080/remove-user-from-project?groupId=' + this.state.groupId + '&newEmail=' + this.state.nun + '&removeEmail=' + this.state.cun).then((response) => {
            if (response.data.statusCode === 201) {
                console.log("jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                this.setState({
                    show: !this.state.show
                })
                this.getMembers()
            }
        }).catch((error) => {
            console.log("error occured")
        })
    }
    componentDidMount() {
        console.log("object")
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
        this.getMembers()

    }
    Example(email) {
        this.setState({

            show: !this.state.show,
            cun: email
        })
    }


    handleClose() {
        this.setState({ show: !this.state.show })
    }

    render() {
        let i = 1
        return (
            <div>
                 <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                                    {localStorage.getItem("groupId")?<Architectproject/> :<SideNavBar/>}
                            <div className="col-md-10" >
                          <div className="projectName"  style={{    margin: "2%"}} ><Link style={{color:'black'}} onClick={()=>{this.props.history.push('/homePage')}} className="dark">Project</Link>&nbsp;/&nbsp;
                                                            <Link style={{color:'black'}} to='/taskPage'>{localStorage.getItem("projectName")}</Link></div>
                <Table striped  hover>
                    <thead>
                        <tr className="head" >
                            <th>sl.No.</th>
                            <th> Name</th>
                            {this.state.emp?null:<th></th>}
                        </tr>
                    </thead>
                    {this.state.projectmembers.map(item => {
                        return (
                            <tbody>
                                <tr className="data" style={{backgroundColor:"white"}}>
                                    <td>{i++}</td>
                                    <td>
                                    <div className="card col-sm-4" style={{ width: "176px", height: "177px", marginBottom: "25px", margin: "20px" }}>
                                        <div class="card-body">
                                            <img style={{ height: "80px", marginLeft: "21px", marginRight: "auto" }} src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="Smiley face" />
                                            <div style={{ textAlign: "center" }} class="card-text">{item.projectPkBean.userBean.employeeName}</div>
                                            <div style={{ textAlign: "center" }}>{item.projectPkBean.userBean.email}</div>
                                        </div>

                                    </div>
                                    
                                    </td>
                                   {this.state.emp?null: <td>
                                        <Button variant="danger" onClick={() => this.Example(item.projectPkBean.userBean.email)}>change user</Button>
                                    </td>}

                                    
                                    {/* onClick={() => this.delete(item.taskId, "completed")} */}
                                </tr>


                                <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            <div className="" style={{ color: '#808080' }}> <span style={{ color: 'black' }}> Change user</span></div></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <label className="mb-0" style={{ color: '#808080' }}>current user</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend ">
                                                <label className="input-group-text "><i className="fas fa-at" /></label>
                                            </div>
                                            <input type="text" value={this.state.cun} readOnly style={{ color: 'black' }} className="form-control" placeholder="Enter current user's name" /></div>


                                        <label className="mb-0" style={{ color: '#808080' }}>new user</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend ">
                                                <label className="input-group-text "><i className="fas fa-at" /></label>
                                            </div>
                                            <input type="text" onChange={(event) => this.setState({ nun: event.target.value })} style={{ color: 'black' }} className="form-control" placeholder="Enter new User's name" /></div>


                                    </Modal.Body>
                                    <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
                                        <button type="button" onClick={() => this.change()}>Apply</button>
                                    </Modal.Footer>
                                </Modal>
                            </tbody>
                        )
                    })}
                </Table>
                </div>
                </div>
                </div>
                </div>
                </div>
             
            </div>
        )
    }
}
export default withRouter(Projectmembers)
