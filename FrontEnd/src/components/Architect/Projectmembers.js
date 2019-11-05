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
            groupId:localStorage.getItem('groupId'),

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

    

    // remove() {
    //     console.log("entered remove method")
    //     Axios.delete('http://localhost:8080/remove-user-from-project?emp_id=' + 4).then((response) => {
    //         if (response.data.statusCode === 201) {
    //             console.log("jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    //             this.getMembers()
    //         }
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    change() {

        console.log("entered change method")
        Axios.delete('http://localhost:8080/remove-user-from-project?groupId=' + this.state.groupId + '&newEmail=' + this.state.nun + '&removeEmail=' + this.state.cun).then((response) => {
            if (response.data.statusCode === 201) {
                console.log("jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                this.setState({
                    show:!this.state.show
                })
                this.getMembers()
            }
        }).catch((error) => {
            console.log("error occured")
        })
    }



    // delete(a) {

    //     Axios.delete('http://localhost:8080/remove-task?taskId=' + a )
    //         .then((response) => {
    //             if (response.data.statusCode === 201) {
    //                 this.props.byme()
    //             }
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }



    componentDidMount() {
        // this.getProjectBean();
        console.log("object")
        this.getMembers()
        //  console.log("email",this.state.projectmembers[0].projectPkBean[0].userBean.email)

    }




    Example(email) {
        this.setState({

            show: !this.state.show,
            cun:email
        })
    }


    handleClose() {
        this.setState({ show: !this.state.show })
    }

    render() {
    let i=1    
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr className="head">
                            <th>sl.No.</th>
                            <th> Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.state.projectmembers.map(item => {
              
                        return (

                            <tbody>
                                <tr className="data">
                                    <td>{i++}</td>
                                    <td>{item.projectPkBean.userBean.employeeName}</td>
                                    <td><Button variant="danger" onClick={()=>this.Example(item.projectPkBean.userBean.email)}>change user</Button></td>

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
                                            <input type="text" value ={this.state.cun} readOnly style={{ color: 'black' }} className="form-control" placeholder="Enter current user's name" /></div>


                                        <label className="mb-0" style={{ color: '#808080' }}>new user</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend ">
                                                <label className="input-group-text "><i className="fas fa-at" /></label>
                                            </div>
                                            <input type="text" onChange={(event) => this.setState({ nun: event.target.value })} style={{ color: 'black' }} className="form-control" placeholder="Enter new User's name" /></div>


                                    </Modal.Body>
                                    <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
                                        <button type="button" onClick={()=>this.change()}>Apply</button>
                                    </Modal.Footer>
                                </Modal>
                            </tbody>
                        )
                    })}
                </Table>
                <Footer />
            </div>
        )
    }
}
export default withRouter(Projectmembers)
