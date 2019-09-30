import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import './CompletedTask.css'
import moment from 'moment';
import Axios from 'axios';
import 'react-day-picker/lib/style.css'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import SearchNavabar from '../navBar/SearchNavabar';
import 'bootstrap/dist/css/bootstrap.min.css';


let columns = [{
    dataField: 'endDate',
    text:'Completed Task'
}];
let uniqueArr = [];
let pro = [{}]
let expandRow = {
    renderer: row => (<div className="bs-example">
        <div className="accordion" id="accordionExample">
        <div className="row">
            {uniqueArr.filter(item => (item.endDate === row.endDate)).map((item, index) => {
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
    </div>
    </div>

    )
};
export default class CompletedTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doneTask: [],
            from: '',
            to: '',
            mail: JSON.parse(window.localStorage.getItem('beans')),
            end: []
        }
        this.state.datas = [{}]
    }
    componentDidMount() {
        var myobj = {}
        console.log('componentDidMount');
        Axios.post('http://localhost:8080/completedTask?email=' + this.state.mail.email)
            .then((response) => {
                console.log('Response Object', response.data.completedTask);
                if (response.data.message === "Success") {
                    this.setState({
                        datas: response.data.end,
                    })
                    uniqueArr = response.data.taskBean;
                    myobj = response.data.completedTask;
                    pro = this.state.datas;
                }
            }).catch((error) => {
                console.log('Error', error);
            })
    }
    fromTo(e) {
        e.preventDefault();
        const { from, to } = this.state;
        console.log("===from date====", from, to)
        Axios.post('http://localhost:8080/completed-task-from-to?email=' + this.state.mail.email + '&from=' + from + '&to=' + to)
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
    render() {
        const { from, to } = this.state;
        let newDate = '';
        let filter = '';
        console.log("object", filter)
        let uniqueArr = this.state.doneTask
        console.log("uniqueArr", uniqueArr)
        return (
            <div>
                <div>
                    <div className="fromTo" >
                           
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
                          
                        
                    </div>
                </div>
                <div /* className="card-body comTable" */ className="container" style={{ marginTop: 10 }}>
                    <BootstrapTable
            rowStyle={ { backgroundColor: 'cream' ,border:'none'} }                        
                        keyField='taskId'
                        data={this.state.datas}
                        columns={columns}
                        expandRow={expandRow}
                    />
                </div>
            </div >

        )
    }
}

function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? 'red' : 'blue' };
  }