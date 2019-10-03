

import React, { Component } from 'react'
import '../createUser/create.css'
import Axios from 'axios'
import $ from 'jquery'
import Footer from '../navBar/footer'
import NavBarForTask from '../navBar/NavBarForTask'


export class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskId: '',
            description: '',
            email: '',
            subject: '',
            priority: '',
            assignDate: '',
            assignedTo: '',
            status: 'todo',
            endDate: '',
            userBeans: JSON.parse(window.localStorage.getItem('beans')),
            showEmailDNE: false,
            showSuccess: false,
            showSubject: false,
            showDescription: false,
            showAssignTo: false,
            showPriority: false,
            showEnddate: false,
            showDateInvalid: false,
            showServerError: false,
            userBean:''
        }
    }
    cancel(e) {
        e.preventDefault();
        this.props.history.push('/homePage')
    }

    textarea = () => {
        this.setState({ showChar: true })
        $("#description").keyup(function () {
            $("#info").text("Characters left: " + (180 - $(this).val().length));
        });
    }

    hideCharacterCount = () => {
        this.setState({ showChar: false })
    }
    hideOnReset = () => {
        this.hideSubject();
        this.hideEmail();
        this.hideDate();
        this.hideDescription();
        this.hidePriority();
        this.hideSubject();
    }




    getProfile() {
        console.log('inside get profile')
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-profile?email='+this.state.userBeans).then((response) => {

                if (response.data.message === 'Success') {
                     this.setState({
                         userBean:response.data.userBean[0]
                         },()=>{
                             console.log("==========sfgfds========",this.state.userBean)
                         })

                }
            }).catch((error) => {
                console.log('Error', error);
            })
        }// end of if
    } //End of getProfile

    create(e) {

        e.preventDefault();
        this.setState({
            email: this.state.userBeans,
        },()=>{        console.log("==========",this.state.userBean)
    })
        console.log(" details" + this.state.taskId)
        console.log(this.state.userBeans);
        Axios.post('http://localhost:8080/create-task', this.state,
            {
                params: {
                    email: this.state.assignedTo
                }
            }
        ).then((response) => {
            console.log(response)
            console.log("book details" + this.state.taskId)

            console.log(response.data.message)
            if (response.data.statusCode === 201) {
                this.setState({ showSuccess: true })
                setTimeout(() => {
                    this.props.history.push('/homePage');
                }, 3000)

            } else if (response.data.statusCode === 401) {
                this.setState({ showEmailDNE: true })
                setTimeout(() => {
                    this.setState(this.setState({ showEmailDNE: false }))
                }, 10000);
            }

        }).catch((error) => {
            this.setState({ showServerError: true })
            setTimeout(() => {
                this.setState(this.setState({ showServerError: false }))
            }, 10000);
            console.log(error)
        })
    }




    hideSubject = () => {
        this.setState({
            showSubject: false
        })

    }
    hideDescription = () => {
        this.setState({
            showDescription: false
        })

    }
    hideEmail = () => {
        this.setState({
            showAssignTo: false
        })
    }
    hidePriority = () => {
        this.setState({
            showPriority: false
        })
    }
    hideDate = () => {
        this.setState({
            showEnddate: false
        })
    }



    componentDidMount() {
        var that = this;
        this.getProfile();
        $(document).ready(function () {
            $('#submit').click(function (e) {


                var subject = (document.getElementById("subject").value).trim();
                var description = (document.getElementById('description').value).trim();
                var endDate = (document.getElementById("EndDate").value);
                var AssignTo = (document.getElementById("AssignTo").value).trim();
                var selectedDate = new Date(endDate);
                selectedDate.setHours(22);
                var priority = (document.getElementById('Priority').value);
                var now = new Date();

                console.log("now date ",now)
                console.log("some date", endDate)
                console.log("selected date ",selectedDate)
                console.log("proioe", priority)

                if (endDate === "") {
                    that.setState({ showEnddate: true })
                }
                if (priority === "Choose Priority") {
                    that.setState({ showPriority: true })
                }
                if (AssignTo === "") {
                    that.setState({ showAssignTo: true })
                }
                if (description === "") {
                    that.setState({ showDescription: true })
                }
                if (subject === "") {
                    that.setState({ showSubject: true })
                }

                if (subject === "" && description === "" && AssignTo === "" && endDate === "") {
                    that.setState({ showFieldsMadatory: true })
                    setTimeout(() => {
                        that.setState({
                            showFieldsMadatory: false
                        })
                    }, 3000);
                }
                if (selectedDate < now) {
                    that.setState({ showDateInvalid: true })
                    setTimeout(() => {
                        that.setState({
                            showDateInvalid: false
                        })
                    }, 3000);
                }
                if (subject !== "" && priority!=="Choose Priority" && description !== "" && AssignTo !== "" && endDate !== "" && (selectedDate >= now) && that.handleEmail()==true) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    }
    handleEmail = () => {
        var that = this;
       
        var email = document.getElementById('AssignTo').value.trim();
        if (email !== "") {
            let lastAtPos = (document.getElementById("AssignTo").value).lastIndexOf('@');
            let lastDotPos = (document.getElementById("AssignTo").value).lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && (document.getElementById("AssignTo").value).indexOf('@@') == -1 && lastDotPos > 2 && ((document.getElementById("AssignTo").value).length - lastDotPos) > 2)) {
                that.setState({ showEmailInvalid: true })
                return false;
            }
        }
        that.setState({ showEmailInvalid: false })
        return true
    }


    render() {
        return (
            <div id="page-container" >
                <div id="content-wrap">
                    
                    <div className="container-fluid ">
                        {this.state.showServerError ? <div id="alertHead" className="alert alert-danger " role="alert" ><h6 className="font-weight-bold">Task Creation Failed Server Failed to Respond</h6> </div> : null}
                        {this.state.showEmailDNE ? <div id="alertHead" className="alert alert-danger "><h6 className="font-weight-bold">Task Creation Failed Email does not Exist!!!</h6> </div> : null}
                        {this.state.showSuccess ? <div id="alertHead" className="alert alert-success " ><h6 className="font-weight-bold">Task Created Successfully</h6> </div> : null}
                        <div className="row">

                            <div id="container" className="col-auto container mt-5 pb-5">
                                <div id="create" className="card shadow-lg mt-5 " >
                                    <div id="cardHead" className="card-header" >
                                        <legend className="text-center">Task Form</legend>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.create.bind(this)}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-hashtag" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hideSubject} required="required" type="text" name="subject" title="Enter Subject" id="subject" placeholder="Enter Subject" onChange={(event) => {
                                                    this.setState({
                                                        subject: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showSubject ? <div id="errordiv" className="container-fluid">Please set subject**</div> : null}
                                            <div className="input-group mb-3">
                                                <textarea onBlur={this.hideCharacterCount} onKeyPress={this.hideDescription} onKeyPress={this.textarea} type="text" className="form-control" id="description" name="description" title="Enter Description" maxLength={180} placeholder="Enter Description (character limit: 180)" rows={3} onChange={(event) => {
                                                    this.setState({
                                                        description: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showChar ? <div id="errordiv" className="container-fluid text-right font-weight-normal"><span id="info"></span> </div> : null}
                                            {this.state.showDescription ? <div id="errordiv" className="container-fluid">Please set Description**</div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-at" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hideEmail} type="email" name="AssignTo" id="AssignTo" title="Enter Email" placeholder="Enter email whom task to be assigned" onChange={(event) => {
                                                    this.setState({
                                                        assignedTo: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showEmailInvalid ? <div id="errordiv" className="container-fluid">Please enter a valid email address</div> : null}
                                            {this.state.showAssignTo ? <div id="errordiv" className="container-fluid">Please set Email**</div> : null}
                                            <div className="input-group mb-3">
                                                <select id="Priority" className="form-control" onClick={this.hidePriority} required name="Priority" title="Select Priority" onChange={(event) => {
                                                    this.setState({
                                                        priority: event.target.value
                                                    })
                                                }}>
                                                    <option selected disabled hidden>Choose Priority</option>
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="critical">Critical</option>
                                                </select>
                                            </div>
                                            {this.state.showPriority ? <div id="errordiv" className="container-fluid">Please set priority**</div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                                                </div>
                                                <input className="form-control" onClick={this.hideDate} required="required" type="date" name="EndDate" title="Enter Deadline" id="EndDate" placeholder="Enter Deadline" onChange={(event) => {
                                                    this.setState({
                                                        endDate: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showEnddate ? <div id="errordiv" className="container-fluid">Please select Date**</div> : null}

                                            {this.state.showFieldsMadatory ? <div id="alert" className="alert alert-danger "><small><b>All fileds are Mandatory</b></small></div> : null}
                                            {this.state.showDateInvalid ? <div id="alert" className="alert alert-danger" ><small><b>Assign Date must be greater than Current date</b></small></div> : null}



                                            <div className="input-group container-fluid">
                                                <button type="reset" id="reset" onClick={this.hideOnReset} title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm">Reset</button>
                                                <button type="submit" id="submit" title="submit" className="form-control-plaintext btn btn-outline-success btn-sm">Submit</button>
                                                <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-info btn-sm" onClick={this.cancel.bind(this)} >Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }















}

export default CreateTask