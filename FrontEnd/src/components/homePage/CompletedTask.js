
import React, { Component } from 'react';
import Axios from 'axios';
import './CompletedTask.css'
import { Form } from 'react-bootstrap'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import moment from 'moment';
import { Modal } from 'react-bootstrap'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
let uniqueArr = [];
let pro = [{}]
class completedTask extends Component {
    constructor() {
        super();

        this.state = {
            data: [

            ],
            doneTask: [],
            from: '',
            to: '',
            mail: JSON.parse(window.localStorage.getItem('beans')),
            end: [],
            expandedRows: [],
            showButton: true,
            popup: '',
            user: '',
            show: false,
            btn:'+',

        };
    } //End of constructor

    componentDidMount() {
        debugger
        var myobj = {}
        console.log('componentDidMount');
        var moment = require('moment');
        var dateTo = moment().format('YYYY-MM-DD');
        var dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');
        console.log("datefrom ===========", dateFrom)
        Axios.get('http://localhost:8080/completed-task-by-me?email=' + this.state.mail + '&from=' +dateFrom )
            .then((response) => {
                console.log('Response Object', response.data);
                if (response.data.message === "Success") {
                    this.setState({
                        data: response.data.end,
                        datas: response.data.taskBean
                    }, () => {
                        console.log("response.data.completedTask", response.data.end, response.data.taskBean)
                        uniqueArr = response.data.taskBean;
                        myobj = response.data.end;
                        pro = this.state.datas;
                    })

                }
            }).catch((error) => {
                console.log('Error', error);
            })
    } //End of component-did-mount

    fromTo(e) {
        e.preventDefault();
        const { from, to } = this.state;
        console.log("===from date====", from, to)
        Axios.get('http://localhost:8080/completed-task-from-to?email=' + this.state.mail + '&from=' + from + '&to=' + to)
            .then((response) => {
                console.log('Response Object', response.data.completedTask);
                if (response.data.message === "Success") {
                    console.log('Response Object', response.data.end);
                    this.setState({
                        data: response.data.end,
                        datas: response.data.taskBean
                    })
                } else if (response.data.statusCode === 401) {

                }
            }).catch((error) => {
                console.log('Error', error);
            })
    } //End of from-me

    showvis(item, userBean) {
        console.log("showvis")
        this.setState({
            popup: item,
            user: userBean
        })
        this.setState({ show: !this.state.show })
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId)
        this.setState({ expandedRows: newExpandedRows });
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }

    toggle(data){
        this.setState({
            btn:'-'
        })
    }

    renderItem(item) {
        console.log("renderItem")
        const clickCallback = () => {
            this.handleRowClick(item.taskId)
            this.setState({
                showButton: this.state.showButton ? false : true
            })
        };
        const itemRows = [
            <div className="colCss"  onClick={clickCallback}>
                <tr   key={"row-data-" + item.taskId}>
                  
                    <td> {
                        moment(item.completed).format('DD-MMMM-YYYY')
                    }<span onClick={(event) => { this.toggle(item.completed) }}  >{this.state.btn}</span></td>
                </tr>
            </div>
        ];

        if (this.state.expandedRows.includes(item.taskId)) {
            itemRows.push(
                <div className="row rowCss">
                    {uniqueArr.filter(data => (data.completed === item.completed)).map((item, index) => {
                        return (
                            <div className='col-sm-4'>
                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a " >
                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle info "></i>
                                </div>
                                <p id="drag1" className="prInit">
                                    < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                <p />

                            </div>
                        )
                    })
                    }
                </div>
            );
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.state.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            console.log("renderItem")

            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <div className="card-body completed">
                <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div style={{ color: '#808080' }}>Subject  <span style={{ color: 'black' }}> {this.state.popup.subject} </span></div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                        <div className="input-group mb-2">
                            <textarea style={{ color: 'black' }} value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>

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
                        Number of days: {moment(this.state.popup.endDate).diff(moment(this.state.popup.assignDate), 'days')}
                    </Modal.Footer>
                </Modal>

                <Form>
                    <div className="row col-lg-8 offset-4">
                        <div class="col-sm- my-1">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">From Date</label>
                                </div>
                                
                                <input type="date" onChange={(event) => {
                                    this.setState({
                                        from: event.target.value
                                    })
                                }} />
                            </div>
                        </div>
                        <div class="col-sm- my-1">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">To Date</label>
                                </div>
                                <input className="input-width" type="date" placeholder="assignDate" onChange={(event) => {
                                    this.setState({
                                        to: event.target.value
                                    })
                                }} />
                            </div>
                        </div>
                        <div class="col-sm- my-1">

                            <Button className="submit-button applybtn" variant="primary" type="submit"
                                onClick={this.fromTo.bind(this)} >
                                Apply</Button></div>
                    </div>
                </Form>
                <div className=" card-body">
                    <table className="tableClass font-weight-bold">{allItemRows}</table>
                </div>
            </div>
        );
    }
}
export default completedTask;