import React, { Component } from 'react';
import Axios from 'axios';
import './CompletedTask.css'
import { Form } from 'react-bootstrap'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import moment from 'moment';

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
            showButton: true
        };
    }
    componentDidMount() {
        var myobj = {}
        console.log('componentDidMount');
        var moment = require('moment');
        var dateTo = moment().format('YYYY-MM-DD');
var dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
console.log("datefrom ===========",dateFrom)
        Axios.get('http://localhost:8080/completed-task-to-me?email=' + this.state.mail.email+'&from='+dateFrom)
            .then((response) => {
                console.log('Response Object', response.data.completedTask);
                if (response.data.message === "Success") {
                    this.setState({
                        data: response.data.end,
                        datas:response.data. taskBean
                    },()=>{
                        console.log("response.data.completedTask",)
                        uniqueArr = response.data.taskBean;
                        myobj = response.data.completedTask;
                        pro = this.state.datas;
                    })
                   
                }
            }).catch((error) => {
                console.log('Error', error);
            })

          
    }
    fromTo(e) {
        e.preventDefault();
        const { from, to } = this.state;
        console.log("===from date====", from, to)
        Axios.get('http://localhost:8080/completed-task-from-to?email=' + this.state.mail.email + '&from=' + from + '&to=' + to)
            .then((response) => {
                console.log('Response Object', response.data.completedTask);
                if (response.data.message === "Success") {
                    console.log('Response Object', response.data.end);
                    this.setState({
                        datas: response.data.end,
                    })
                }
            }).catch((error) => {
                console.log('Error', error);
            })
    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId)
        this.setState({ expandedRows: newExpandedRows });
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
            <div className="colCss">
                <tr onClick={clickCallback} key={"row-data-" + item.taskId}>
                    <td >       {
                 moment(item.completed).format('DD-MMMM-YYYY')
                }</td>
                </tr>
            </div>
        ];

        if (this.state.expandedRows.includes(item.taskId)) {
            itemRows.push(
                <div className="row rowCss">
                    {uniqueArr.filter(data => (data.completed === item.completed)).map((item, index) => {
                        return (
                            <div className='col-sm-4'>
                                <p className="card-text">
                                </p>
                                {console.log("index", index)}
                                <div className="col-auto" >
                                    <p id="drag1" className="prHigh">
                                        < textarea id="d2" className="textarea" rows="5" readOnly>{(item.description)}</textarea> </p>
                                </div>
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
            <div>
                <Form>
                    <div className="row center">

                        <div class="col-sm- my-1">
                            <div class="input-group">
                                <div class="input-group-prepend dates">
                                    <div className="input-group-text space" >From Date</div>
                                </div>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control className="input-width" type="date" placeholder="assignDate" onChange={(event) => {
                                        this.setState({
                                            from: event.target.value
                                        })
                                    }} />
                                </Form.Group>
                            </div>
                        </div>
                        <div class="col-sm- my-1">
                            <div class="input-group">
                                <div class="input-group-prepend dates">
                                    <div class="input-group-text space">To Date</div>
                                </div>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control className="input-width" type="date" placeholder="assignDate" onChange={(event) => {
                                        this.setState({
                                            to: event.target.value
                                        })
                                    }} />
                                </Form.Group>

                            </div>
                        </div>
                        <div className="applybtn">
                            <Button className="submit-button space" variant="primary" type="submit"
                                onClick={this.fromTo.bind(this)} >
                                Apply</Button></div>
                    </div>
                </Form>

                <div className=" card-body">
                    <table className="tableClass">{allItemRows}</table>
                </div>
            </div>
        );
    }
}
export default completedTask;