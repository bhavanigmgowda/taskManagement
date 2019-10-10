import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './CompletedTask.css'
import moment from 'moment';
import 'react-day-picker/lib/style.css'
import { Modal } from 'react-bootstrap'
import UserContext from '../UserContext';

export default class PopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: [],
            hi: false
        }
    }

    handleClose(show) {
        show = false
    }

    render() {
        let closes = false


        return (
            <div>
                <UserContext.Consumer>

                    {(data => {
                        closes = data.show

                        return (
                            <div>
                                <Modal show={data.show} onHide={() => this.handleClose}>
                                    <div onClick={closes = true}>X</div>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Task Details
                                         <div>subject  {data.popup.subject}</div></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="input-group mb-3">


                                            <textarea value={data.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>


                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned By</span>
                                            </div>

                                            <input type="text"
                                                value={data.popup.empName} className="form-control" placeholder="Designation" readOnly /></div>


                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assign Date</span>
                                            </div>

                                            <input type="text"
                                                value={moment(data.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">End Date</span>
                                            </div>

                                            <input type="text"
                                                value={moment(data.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Priority</span>
                                            </div>
                                            {console.log("prio", data.popup.priority)}
                                            <input type="text"
                                                value={data.popup.priority} className="form-control" readOnly /> </div>


                                    </Modal.Body>
                                    <Modal.Footer style={{ color: 'red' }} >
                                        Number of days {moment(data.popup.endDate).diff(moment(data.popup.assignDate), 'days')}


                                    </Modal.Footer>
                                </Modal>
                            </div>


                        )

                    }
                    )
                    }
                </UserContext.Consumer>


                {/* <Modal  onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Task Details
                        <div>subject  {this.state.popup.subject}</div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="input-group mb-3">


                            <textarea value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned By</span>
                            </div>

                            <input type="text"
                                value={this.state.user.empName} className="form-control" placeholder="Designation" readOnly /></div>


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
                </Modal> */}



            </div>
        )
    }
}
