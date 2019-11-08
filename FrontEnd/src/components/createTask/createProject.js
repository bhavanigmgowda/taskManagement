import React, { Component } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import $ from 'jquery';
import Axios from 'axios';
import { FormControl } from 'react-bootstrap';
import { arrayTypeAnnotation } from '@babel/types';
import Footer from '../navBar/footer'
import { Architect, Lead, Employee } from '../Architect/SideData';


var user = null


export class createProject extends Component {

    constructor(props) {
        super(props)


        this.state = {
            groupName: '',
            description: '',
            addTo: '',
            deadline: '',
            showgroupName: false,
            showDescription: false,
            showEnddate: false,
            showDateInvalid: false,
            showEmailInvalid: false,
            loading: false,
            projectPkBean: { projectId: null, userBean: null },
            user: [],
            i: 0,
            show: false,
            architect: false,
            lead: false,
            emp: false,
            role: JSON.parse(window.localStorage.getItem('role')),
        }
    }
    cancel(e) {
        e.preventDefault();
        this.props.history.push('/taskPage')
    }

    textarea = () => {
        this.setState({ showChar: true })
        $("#description").keyup(function () {
            $("#info").text((180 - $(this).val().length) + "/180");
        });
    }

    hideCharacterCount = () => {
        this.setState({ showChar: false })
    }
    hideOnReset = () => {
        this.hidegroupName();
        this.hideDate();
        this.hideDescription();
        this.setState({ showEmailInvalid: false });
        this.setState({
            i: 0
        })
    }
    hidegroupName = () => {
        this.setState({
            showgroupName: false
        })

    }
    hideDescription = () => {
        this.setState({
            showDescription: false
        })

    }
    
    hideDate = () => {
        this.setState({
            showEnddate: false
        })
    }
    hideInvalidDate = () => {
        this.setState({ showDateInvalid: false })
    }
onSubmit(e,email){
    e.preventDefault()
    
    if (email != null) {
        this.setState({
            addTo: email
        },()=>{
            this.getProfile(e,true)
        })
    }
}
    getProfile(e, email) {
        e.preventDefault()
        console.log("==================kkkkkkkkkkkk",email)
       
        console.log('inside get profile')
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-profile?email=' + this.state.addTo).then((response) => {

                if (response.data.message === 'Success') {
                    this.setState(prevState => ({
                        projectPkBean: {
                            ...prevState.projectPkBean,           // copy all other key-value pairs of food object
                            userBean: response.data.userBean[0]
                        }
                    }),

                    )
                    this.setState({
                        i: this.state.i + 1
                    })
                    console.log("object", this.state.projectPkBean)
                    

                }
                this.create(e,email);
            }).catch((error) => {
                console.log('Error', error);
            })
        }// end of if
    } //End of getProfile

    delete(e, email) {
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.delete('http://localhost:8080/remove-user-from-create-project?email=' + email + '&projectId=' + this.state.projectPkBean.projectId)
                .then((response) => {

                    if (response.data.message === 'Success') {
                        this.setState({
                            show: false,
                            i: this.state.i - 1
                        })

                        console.log("object", this.state.projectPkBean)
                    }
                    this.create(e);
                }).catch((error) => {
                    console.log('Error', error);
                })
        }// end of if
    }

    create(e,email) {
        console.log("description ===", this.state.description);
        this.setState({ loading: true })
        e.preventDefault();
        this.setState({
            email: this.state.userBeans,
        })

        Axios({
            method: 'post',
            url: 'http://localhost:8080/create-project?count=' + this.state.i,
            headers: {},
            data: this.state
        }).then((response) => {
            this.setState({ loading: false })
            if (response.data.statusCode === 201) {
                console.log("====================kkkk",email)
                if(email){
                    debugger
                    this.props.history.push('/homePage')       
                   }
                console.log("object", response.data.projectBeans[0].projectPkBean.projectId)
                this.setState({
                    show: true,
                    user: this.state.projectPkBean.userBean.email,
                    addTo: ""
                    // i:this.state.i+1,
                })
                this.setState(prevState => ({
                    projectPkBean: {
                        ...prevState.projectPkBean,           // copy all other key-value pairs of food object
                        projectId: response.data.projectBeans[0].projectPkBean.projectId
                    }
                    

                }))
               
                console.log("==================", this.state.projectPkBean)
            } else if (response.data.statusCode === 401) {
                this.NotifyEmailDoesntExists();
            }
        }).catch((error) => {
            this.setState({ loading: false })
            this.NotifyServerOffline();
            console.log(error)
        })
    }

    componentDidMount() {


        var that = this;
        if (this.state.role === "architect") {
            this.setState({
                architect: true
            })
        } else if (this.state.role === "lead") {
            this.setState({
                lead: true
            })
        } else {
            this.setState({
                emp: true
            })
        }

        $(document).ready(function () {
            $('#submit').click(function (e) {
                var groupName = (document.getElementById("groupName").value).trim();
                var description = (document.getElementById('description').value).trim();
                var endDate = (document.getElementById("EndDate").value);
                var AssignTo = (document.getElementById("AssignTo").value).trim();
                var selectedDate = new Date(endDate);
                selectedDate.setHours(22);
                var now = new Date();

                if (endDate === "") {
                    that.setState({ showEnddate: true })
                }
             
                if (description === "") {
                    that.setState({ showDescription: true })
                }
                if (groupName === "") {
                    that.setState({ showgroupName: true })
                }

                if (groupName === "" && description === "" && endDate === "") {
                    console.log("here")
                    that.NotifyFieldMandatory();
                }
                if (selectedDate < now) {
                    that.setState({ showDateInvalid: true })

                }
                if (groupName !== "" && description !== "" &&  endDate !== "" && (selectedDate >= now) && that.handleEmail() == true) {
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
        }else{
           return true
        }
        that.setState({ showEmailInvalid: false })
        return true;
    }

    NotifyFieldMandatory = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.info(<center>All Fields Are Mandatory</center>, {
                position: "top-center", autoClose: 5000
            });
        }
    }

    NotifyServerOffline = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.error(<center>Registration Failed Server Did Not Respond</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    NotifyEmailDoesntExists = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.warning(<center>Registration Failed Email Does Not Exist</center>, {
                position: "top-center", autoClose: 7000,
            });
        }
    }
    NotifyTaskCreationSuccess = () => {
        if (!toast.isActive(this.toastId)) {
            this.toastId = toast.success(<center>Task Created Successfully</center>, {
                position: "top-center", autoClose: 3000,
            });
        }
    }
    
    addfeild(email, i) {
        return (
            <div>
                <div className="input-group mb-3">
                    <FormControl type="text" autoComplete="off" value={this.state.addTo} className="form-control" placeholder={email} />

                    <button type="button" onClick={(e) => this.delete(e, email)} style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} class="btn btn-outline-primary"><i class="far fa-trash-alt"></i></button>
                </div>
                <div style={{ marginBottom: '10px', marginTop: '-10px' }}>
                    No. of Users added : {i}
                </div>
            </div>

            /* 
            <div className="input-group mb-3">
            
            <FormControl type="text" autoComplete="off" value={this.state.addTo} className="form-control"  onKeyPress={this.hideEmail} type="email" name="AssignTo" id="AssignTo" title="Enter Email" placeholder="Enter User email to add to group" />
            
            
            <button type="button" onClick={(e) => this.getProfile(e)} style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} class="btn btn-outline-primary"><i  class="fas fa-plus"></i></button>
            </div> */

        )
    }

    render() {

        return (
            <div id="form-container" >
                <div id="content-wrap">
                    <div className="container-fluid ">
                        <div className="row">


                        <div className="col-md-2 cssCard" >
                                <div class=" card-body  h-75">
                                    <div className="input-group mb-3 option">
                                        {this.state.architect ? <Architect /> : null}
                                        {this.state.lead ? <Lead /> : null}
                                        {this.state.emp ? <Employee /> : null}
                                    </div>
                                </div>
                            </div>



                            <div className="col-md-10 " >


                            <div id="container" className="col-auto container-fluid pb-5">
                                <div id="create" className="card shadow-lg mt-5 " >
                                    <div id="cardHead" className="card-header" >
                                        <legend className="text-center">Create a project</legend>
                                        <div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
                                            <PropagateLoader
                                                size={10}
                                                color={'#123abc'}
                                                loading={this.state.loading}
                                            />
                                        </div>
                                        <ToastContainer />
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e)=>{ this.onSubmit(e, JSON.parse(window.localStorage.getItem('beans'))) }}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-hashtag" /></label>
                                                </div>
                                                <input autoComplete="off" className="form-control" onKeyPress={this.hidegroupName} required="required" type="text" name="groupName" title="Enter Group Name" id="groupName" placeholder="Enter Project Name" onChange={(event) => {
                                                    this.setState({
                                                        projectName: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showgroupName ? <div id="errordiv" className="container-fluid">Please set Project Name**</div> : null}
                                            <div className="input-group mb-3">
                                                <textarea onBlur={this.hideCharacterCount} onKeyPress={this.hideDescription} type="text" className="form-control" id="description" name="description" title="Enter Description" maxLength={180} placeholder="Enter Description (character limit: 180)" rows={3} onChange={(event) => {
                                                    this.setState({
                                                        description: event.target.value
                                                    }); this.textarea()
                                                }} />
                                            </div>
                                            {this.state.showChar ? <div id="errordiv" className="container-fluid text-right font-weight-normal"><span id="info"></span> </div> : null}
                                            {this.state.showDescription ? <div id="errordiv" className="container-fluid">Please set Description**</div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                                                </div>
                                                <input className="form-control" onClick={() => { this.hideDate(); this.hideInvalidDate() }} required="required" type="date" name="EndDate" title="Enter Deadline" id="EndDate" placeholder="Enter Deadline" onChange={(event) => {
                                                    this.setState({
                                                        deadline: event.target.value
                                                    })
                                                }} />
                                            </div>
                                            {this.state.showEnddate ? <div id="errordiv" className="container-fluid">Please select Date**</div> : null}
                                            {this.state.showDateInvalid ? <div id="errordiv" className="container-fluid">Assign Date must be greater than Current date**</div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-at" /></label>
                                                </div>
                                                <FormControl type="text" autoComplete="off" value={this.state.addTo} className="form-control" onKeyPress={this.hideEmail} type="email" name="AssignTo" id="AssignTo" title="Enter Email" placeholder="Enter User email to be added to Project" onChange={(event) => {
                                                    this.setState({
                                                        addTo: event.target.value
                                                    })
                                                }} />

                                                {/*               <FormControl type="text" name="search"  
                                onChange={(event) => { this.setState({ search: event.target.value }) }}
                                   value={this.state.search} onKeyDown={(event) => { this.searchByEnter(event) }}  placeholder="Search" className="w-55" /> */}


                                                <button type="button" onClick={(e) => this.getProfile(e)} style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} class="btn btn-outline-primary"><i class="fas fa-plus"></i></button>
                                            </div>
                                            {this.state.showEmailInvalid ? <div id="errordiv" className="container-fluid">Please enter a valid email address</div> : null}
                                            {this.state.show ? this.addfeild(this.state.user, this.state.i) : null}
                                            <div className="input-group container-fluid">
                                                <button type="reset" id="reset" onClick={this.hideOnReset} title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm">Reset</button>
                                              <button type="submit" id="submit"  title="submit"  className="form-control-plaintext btn btn-outline-success btn-sm">Submit</button>
                                                <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-info btn-sm"  >Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>.
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default createProject