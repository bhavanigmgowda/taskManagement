import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';

import './CompletedTask.css'

let uniqueArr = [];
let pro = [{}]
let checked=false
const AccordionItem = ({ ...props }) => {
    const { item, collapsed, expand } = props;
    return (
        <span>
            <span className="toggle"
                id={item.taskId}
                onClick={(e) => expand(e, item.taskId)}>
                <span>{collapsed ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}</span>
            </span>
        </span>
    );
}

class completedTask extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
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
            loading: false,
            checked:false
        };
        this.handleClick = this.handleClick.bind(this);
    } //End of constructor

    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Server Not Responding</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }

    handleClick(e, id) {
        const itemIndex = this.state.items.findIndex(i => i.id === id);
        const item = { ...this.state.items[itemIndex] };
        const items = [...this.state.items];
        item.isCollapsed = !this.state.items[itemIndex].isCollapsed;
        items[itemIndex] = item;
        // Need to manage state based on which 'elem' triggered event?
        this.setState({ items: items });
    }

    componentDidMount() {
       this.collectDate(moment().subtract(7, 'd').format('YYYY-MM-DD'))
    } //End of component-did-mount

    collectDate(dateFrom){
     
            checked=!checked
        
        var myobj = {}
        var moment = require('moment');
        this.setState({ loading: true });
       console.log("---------------",moment().subtract(3, 'month').format('YYYY-MM-DD')) 
       console.log("---------------",moment().subtract(6, 'm').format('YYYY-MM-DD')) 

        Axios.get('http://localhost:8080/completed-task-by-me?email=' + this.state.mail + '&from=' + dateFrom)
            .then((response) => {
                console.log('Response Object', response.data);
                if (response.data.message === "Success") {
                    this.setState({
                        data: response.data.end,
                        datas: response.data.taskBean,
                        loading: false
                    }, () => {
                        console.log("response.data.completedTask", response.data.end, response.data.taskBean)
                        uniqueArr = response.data.taskBean;
                        myobj = response.data.end;
                        pro = this.state.datas;
                        for (var i = 0; i < this.state.data.length; i++) {
                            this.state.data[i].isCollapsed = false;
                        }
                    })
                }
            }).catch((error) => {
                console.log('Error', error);
                this.setState({ loading: false });
                this.NotifyServerOffline();
            })
    }

    fromTo(e) {
      
        e.preventDefault();
        const { from, to } = this.state;
        this.setState({ loading: true });
        console.log("===from date====", from, to)
        Axios.get('http://localhost:8080/completed-task-from-to?email=' + this.state.mail + '&from=' + from + '&to=' + to)
            .then((response) => {
                console.log('Response Object', response.data.completedTask);
                if (response.data.message === "Success") {
                    console.log('Response Object', response.data.end);
                    this.setState({
                        data: response.data.end,
                        datas: response.data.taskBean,
                        loading: false
                    })
                } else if (response.data.statusCode === 401) {
                }
            }).catch((error) => {
                console.log('Error', error);
                this.setState({ loading: false });
                this.NotifyServerOffline();
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


    handleChange = (activeStatus, itemId) => {
        const productIndex = this.state.data.findIndex(function (
            item,
        ) {
            return item.taskId === itemId;
        });

        let products = [...this.state.data];
        let product = { ...products[productIndex] };
        product.isActive = activeStatus;
        products[productIndex] = product;
        //fire a redux action if data is stored in redux state
        this.setState({ data: products });
    };


    handleClick(e, id) {
        const itemIndex = this.state.data.findIndex(i => i.taskId === id);
        const item = { ...this.state.data[itemIndex] };
        const items = [...this.state.data];
        item.isCollapsed = !this.state.data[itemIndex].isCollapsed;
        items[itemIndex] = item;
        // Need to manage state based on which 'elem' triggered event?
        this.setState({ data: items });
    }


    renderItem(item) {
        console.log("renderItem")
        const items = this.state.data;
        const clickCallback = (e) => {
            this.handleRowClick(item.taskId)
            this.handleClick(e, item.taskId)
        };
        const itemRows = [
            <div className="colCss" onClick={clickCallback} >
                <div key={"row-data-" + item.taskId} >
                    {
                        moment(item.completed).format('DD-MMMM-YYYY')
                    }
                    <AccordionItem
                        key={item.taskId}
                        item={item}
                        collapsed={item.isCollapsed}
                        expand={this.handleClick}
                    />
                </div>
            </div>
        ];

        if (this.state.expandedRows.includes(item.taskId)) {
            itemRows.push(
                <div className="row rowCss">
                    {uniqueArr.filter(data => (data.completed === item.completed)).map((item, index) => {
                        return (
                            <div className='col-sm-4'>
                                <div id="i7" className="col-lg-4 col-md-4 col-sm-4 iconSys " >
                                    <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle info "></i>
                                </div>
                                <p id="drag1" className="stickys">
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
            allItemRows = allItemRows.concat(perItemRows);
        });
    
        return (
            <div className="card-body completed">
                <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="" style={{ color: '#808080' }}>Subject - <span style={{ color: 'black' }}> {this.state.popup.subject} </span></div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                        <div className="input-group mb-2">
                            <textarea style={{ color: 'black' }} value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
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
                {/* end of popup */}
                <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto', marginBottom: '1%' }}>
                    <PropagateLoader
                        css={this.override}
                        size={10}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                <ToastContainer />

                <div class="form-group row offset-4">
                    <div class="col-sm- my-1">
                        <label className="mb-0" style={{ color: '#808080' }}>From</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                            </div>
                            <input style={{ color: 'black' }} type="date"
                                onChange={(event) => {
                                    this.setState({
                                        from: event.target.value
                                    })
                                }} className="form-control" /></div>
                    </div>

                    <div class="col-sm- my-1">
                        <label className="mb-0" style={{ color: '#808080' }}>To</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                            </div>
                            <input style={{ color: 'black' }} type="date"
                                onChange={(event) => {
                                    this.setState({
                                        to: event.target.value
                                    })
                                }} className="form-control" /></div>

                    </div>
                    <div class="col-sm- my-1">
                        <div className="mb-0" >&nbsp;</div>
                        <div className="input-group mb-2">
                            <button className="btn btn-outline-success w-500 h-100 " type="submit"
                                onClick={this.fromTo.bind(this)} disabled={!this.state.from && !this.state.to}>
                                Search</button>
                        </div>
                    </div>
                </div>
                <div className="offset-4 dataButton">
               <input type="radio" name="radio" checked={!checked} onClick={()=>{this.collectDate(moment().subtract(1, 'month').format('YYYY-MM-DD')) }} value="Last 1 month" /> Last 1 month &nbsp; &nbsp;&nbsp;
                <input type="radio" name="radio"  checked={!checked} onClick={()=>{this.collectDate(moment().subtract(3, 'month').format('YYYY-MM-DD')) }} value="Last 3 month" /> Last 3 month &nbsp; &nbsp;&nbsp;
                <input type="radio" name="radio"   checked={!checked} onClick={()=>{this.collectDate(moment().subtract(6, 'month').format('YYYY-MM-DD')) }} value="Last 6 month" /> Last 6 month &nbsp; &nbsp;&nbsp;
                </div>
                {this.state.data? <div className=" card-body">
                    <table className="tableClass font-weight-bold">{allItemRows}</table>
                </div>:<h3>NO record found </h3>}
               
                               
            </div>
        );
    }
}
export default completedTask;