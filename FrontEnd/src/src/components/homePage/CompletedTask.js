import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './CompletedTask.css'
import moment from 'moment';
import Axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment';
import SearchNavabar from '../navBar/SearchNavabar'

export default class CompletedTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doneTask: [],
            endate: [],
            from: '',
            to: '',
            showButton: true,
        }

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
    }
    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }

    handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from });
    }
    handleApply(e) {
        e.preventDefault()
    }

    handleToChange(to) {
        this.setState({ to }, this.showFromMonth);
    }
    componentDidMount() {
        console.log('componentDidMount');
        if(JSON.parse(window.localStorage.getItem('isValid'))){
        Axios.get('http://localhost:8080/getAllTask').then((response) => {
            console.log('Response Object', response);
            if (response.data.message === "Success") {
                this.setState({
                    doneTask: response.data.taskBean.filter(item => item.status === 'Done'),
                })
                console.log("date", this.state.doneTask);

            }
        }).catch((error) => {
            console.log('Error', error);
        })}else{
            this.props.history.push('/')

        }
    }
    show() {
        this.setState({
            showButton: this.state.showButton ? false : true
        })
    }


    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        console.log("Start", modifiers.start)
        console.log("End date", modifiers.end)
        return (
            <div>
                <SearchNavabar/>
                <div>
                    <Card id="cardDisplay" className="col-lg-6 offset-2" >
                        <Card.Body>
                            <div id="calender" className="col-lg-8 offset-2">
                                Select Date
                        <div className="InputFromTo">
                                    <DayPickerInput
                                        value={from}
                                        placeholder="From"
                                        format="LL"
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        dayPickerProps={{
                                            selectedDays: [from, { from, to }],
                                            disabledDays: { after: to },
                                            toMonth: to,
                                            modifiers,
                                            numberOfMonths: 1,
                                            onDayClick: () => this.to.getInput().focus(),

                                        }}
                                        onDayChange={this.handleFromChange}
                                    />{' '}
                                    —{' '}
                                    <span className="InputFromTo-to">
                                        <DayPickerInput
                                            ref={el => (this.to = el)}
                                            value={to}
                                            placeholder="To"
                                            format="LL"
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            dayPickerProps={{
                                                selectedDays: [from, { from, to }],
                                                disabledDays: { before: from },
                                                modifiers,
                                                month: from,
                                                fromMonth: from,
                                                numberOfMonths: 1,
                                                onDayClick: () => this.show()
                                            }}
                                            onDayChange={this.handleToChange}
                                        />
                                    </span>

                                </div>
                            </div>

                            <div className="cardBody col-lg-6 offset-2" id="cardBody">
                                <div style={{ visibility: this.state.showButton ? 'visible' : 'hidden' }}>
                                    {this.state.doneTask.filter(item => (item.priority === 'high')
                                        && (moment(item.endDate).format("MM") === moment(this.state.date).format("MM"))).map(item => {
                                            return (
                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <p id="drag1" draggable="true" className="prHigh"  >
                                                            <div id="div" className="textarea">{item.description} </div></p>
                                                    </div></div>
                                            )
                                        })

                                    }
                                    {this.state.doneTask.filter(item => (item.priority === 'low')
                                        && (moment(item.endDate).format("MM") === moment(this.state.date).format("MM"))).map(item => {
                                            return (
                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                        <p id="drag3" draggable="true" className="prLow"   >
                                                            <div id="d3" className="textarea">{item.description}
                                                            </div></p>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                    {this.state.doneTask.filter(item => (item.priority === 'intermediate')
                                        && (moment(item.endDate).format("MM") === moment(this.state.date).format("MM"))).map(item => {
                                            return (
                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >

                                                        <p div id="drag2" draggable="true" className="prInit"   >
                                                            <div id="d2" className="textarea">{item.description}</div></p>
                                                    </div>
                                                </div>
                                            )
                                        })


                                    }


                                </div>
                                <Accordion >
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                                {(moment(modifiers.start).format("MM-DD-YYYY"))} To {(moment(modifiers.end).format("MM-DD-YYYY"))}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <div >


                                                    {this.state.doneTask.filter(item => (item.priority === 'high')
                                                        && (moment(item.endDate).format("MM") >= moment(modifiers.start).format("MM"))
                                                        && (moment(item.endDate).format("MM") <= moment(modifiers.end).format("MM"))).map((item) => (
                                                            <div >

                                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                                        <p id="drag1" draggable="true" className="prHigh"  >
                                                                            <div id="div" className="textarea">{item.description} </div></p>
                                                                    </div></div></div>

                                                        ))}

                                                    {this.state.doneTask.filter(item => (item.priority === 'low')
                                                        && (moment(item.endDate).format("MM") >= moment(modifiers.start).format("MM"))
                                                        && (moment(item.endDate).format("MM") <= moment(modifiers.end).format("MM"))).map((item) => (
                                                            <div >

                                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >
                                                                        <p id="drag3" draggable="true" className="prLow"   >
                                                                            <div id="d3" className="textarea">{item.description}
                                                                            </div></p>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        ))}
                                                    {this.state.doneTask.filter(item => (item.priority === 'intermediate')
                                                        && (moment(item.endDate).format("MM") >= moment(modifiers.start).format("MM"))
                                                        && (moment(item.endDate).format("MM") <= moment(modifiers.end).format("MM"))).map((item) => (
                                                            <div >

                                                                <div id="div2" class="col-lg-8 col-md-4 col-sm-12 offset-2 st"  >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4" >

                                                                        <p div id="drag2" draggable="true" className="prInit"   >
                                                                            <div id="d2" className="textarea">{item.description}</div></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                </Accordion>

                            </div>
                        </Card.Body>
                    </Card>


                </div>
            </div>

        )
    }
}
