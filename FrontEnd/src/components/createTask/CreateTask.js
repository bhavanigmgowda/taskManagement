import React, { Component } from 'react'
import '../createUser/create.css'
import Axios from 'axios'
import $ from 'jquery'
import Footer from '../navBar/footer'
import NavBarForTask from '../navBar/NavBarForTask'


export class CreateUser extends Component {
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
            userBean: JSON.parse(window.localStorage.getItem('beans')),
            show: false,
            show2:false
        }
    }
    cancel(e) {
        e.preventDefault();
        this.props.history.push('/homePage')
    }

    textarea = () => {
        document.getElementById("info").hidden = false;
        $("#description").keyup(function () {
            $("#info").text("Characters left: " + (180 - $(this).val().length)).css('font', '11px').css('text-align', 'center').css('margin-top', '-10px').css('color', 'red');
        });
    }
    
    hideCharacterCount = () => {
        document.getElementById("info").hidden = true;
    }

    create(e) {
        e.preventDefault();
        console.log(this.state.taskId);

        console.log(this.state.description);
        console.log(this.state.email);
        console.log(this.state.subject);
        console.log(this.state.priority);
        this.setState({
            email: this.state.userBean.email,
        })
        console.log(" details" + this.state.taskId)
        console.log(this.state.userBean);
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
                this.setState({ show2: true })
                setTimeout(() => {
                    this.setState(this.setState({ show2: false }))
                }, 2000);
                setTimeout(()=>{
                    this.props.history.push('/homePage');               
           },1000 )

            } else if (response.data.statusCode === 401) {
                this.setState({ show: true })
                setTimeout(() => {
                    this.setState(  this.setState({ show: false })    )
                }, 3000);
            }

        }).catch((error) => {

            console.log(error)
        })
    }
    hideSubject = () => {
        $('#errormsg1').css('display','none');

    }
    hideDescription = () => {
        $('#errormsg2').css('display','none');

    }
    hideEmail = () => {
        $('#errormsg3').css('display','none');
    }
    hidePriority = () => {
        $('#errormsg4').css('display','none');
    }
    hideDate = () => {
        $('#errormsg5').css('display','none');
    }



    componentDidMount() {
        $(document).ready(function () {
            $('#submit').click(function (e) {
                var subject = (document.getElementById("subject").value).trim();
                var description = (document.getElementById('description').value).trim();
                var endDate = (document.getElementById("EndDate").value);
                var AssignTo = (document.getElementById("AssignTo").value).trim();
                var selectedDate = new Date(endDate);
                var priority = (document.getElementById('Priority').value);
                var now = new Date();

                console.log("some date",selectedDate)
                console.log("proioe",priority)
                if(selectedDate === "Invalid Date"){
                    $("#errormsg5").css('display','block');
                }
                if(priority === "Choose Priority"){
                    $("#errormsg4").css('display','block');
                }
                if(AssignTo===""){
                    $("#errormsg3").css('display','block'); 
                }
                if (description === "") {
                    $("#errormsg2").css('display','block');  
                }
                if (subject === "") {
                    $("#errormsg1").css('display','block');
                }

                if (subject === "" && description === "" && AssignTo === "" && endDate==="") {
                    $(".error").css('display','block');
                    document.getElementById("alert").hidden = false;
                    $('#message').html("All fields are Mandatory");
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 2000);
                    return false;  
                }
                if (selectedDate < now)  {
                    document.getElementById("alert").hidden = false;
                    $('#message').html("Assign Date must be greater than or Equal to Current date");
                    setTimeout((function hide() { document.getElementById("alert").hidden = true; }), 4000);
                    return false;
                }

                if (subject !== "" && description !== "" && AssignTo !== "" && endDate!=="") {
                    $('#message').html("");
                    document.getElementById("alert").hidden = true;
                    return true;
                }else {
                    return false;
                }
            });
        });
    }
    render() {
        return (
            <div>
                <NavBarForTask/>
                
            <div id="page-container">
                <div id="content-wrap" className="container-fluid ">
                    {this.state.show ? <div id="taskalertHead" class="alert alert-danger">Task Creation Failed Email does not Exist!!! </div> : null}
                    {this.state.show2 ? <div id="taskalertHead" class="alert alert-success" >Task Created Successfully </div> : null}
                    <div className="row">
                        <div id="container" className="col-auto container mt-5">
                            <div id="create" className="card shadow-lg mt-5" >
                                <div  id="cardHead" className="card-header" >
                                    <legend className="text-center">Create Task</legend>
                                </div>
                                <div className="card-body">
                                    <form  onSubmit={this.create.bind(this)}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-hashtag" /></label>
                                            </div>
                                            <input className="form-control" onKeyPress={this.hideSubject} required="required" type="text" name="subject" title="Enter Subject" id="subject" placeholder="Enter Subject" onChange={(event) => {
                                                this.setState({
                                                    subject: event.target.value
                                                })
                                            }} />
                                        </div>
                                        <div id="errormsg1" className="error" >Please Enter Subject field**</div>
                                        <div className="input-group mb-3">
                                            <textarea  onBlur={this.hideCharacterCount} onKeyPress={this.hideDescription}  onFocus={this.textarea} type="text" className="form-control" id="description" name="description" title="Enter Description" maxLength={180} placeholder="Enter Description (character limit: 180)" rows={3} onChange={(event) => {
                                                this.setState({
                                                    description: event.target.value
                                                })
                                            }} />
                                        </div>
                                        <div id="errormsg2" className="error" >Please Description field**</div>
                                        <div id="info" ></div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-at" /></label>
                                            </div>
                                            <input className="form-control" required="required" onKeyPress={this.hideEmail} type="email" name="AssignTo" id="AssignTo" title="Enter Email" placeholder="Enter email whom to be assigned" onChange={(event) => {
                                                this.setState({
                                                    assignedTo: event.target.value
                                                })
                                            }} />
                                        </div>
                                        <div id="errormsg3" className="error" >Please set Email field**</div>
                                        <div className="input-group mb-3">
                                            <select id="Priority" className="form-control" onKeyPress={this.hidePriority} required name="Priority" title="Select Priority" onChange={(event) => {
                                                this.setState({
                                                    priority: event.target.value
                                                })
                                            }}>
                                                <option selected disabled hidden>Choose Priority</option>
                                                <option defaultvalue="low">low</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                        <div id="errormsg4" className="error" >Please select priority field**</div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                                            </div>
                                            <input className="form-control" onKeyPress={this.hideDate} required="required" type="date" name="EndDate" title="Enter Deadline" id="EndDate" placeholder="Enter Deadline" onChange={(event) => {
                                                this.setState({
                                                    endDate: event.target.value
                                                })
                                            }}/>
                                        </div>
                                        <div id="errormsg5" className="error" >Please select Date**</div>
                                        <div style={{ textAlign: '"center"' }}>
                                            <div id="alert" className="alert alert-danger" role="alert" hidden="true">
                                                <small id="message" />
                                            </div>
                                        </div>
                                        
                                        <div className="input-group mb-3 container-fluid">
                                            <button type="reset" id="reset" title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm">Reset</button>
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

export default CreateUser
