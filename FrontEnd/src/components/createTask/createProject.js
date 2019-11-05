import React, { Component } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';
import $ from 'jquery';
import Axios from 'axios';
import { FormControl } from 'react-bootstrap';
import { arrayTypeAnnotation } from '@babel/types';

var user=null


export class createProject extends Component {
    
    constructor(props) {
        super(props)


        this.state = {
            groupName: '',
            description: '',
            addTo: '',
            deadline:'',
            showgroupName: false,
            showDescription: false,
            showAssignTo: false,
            showEnddate: false,
            showDateInvalid: false,
            showEmailInvalid: false,
            loading: false,
            projectPkBean:{projectId:null,userBean:null},
            user:[],
            i:0,
            show:false
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
        this.hideEmail();
        this.hideDate();
        this.hideDescription();
        this.setState({ showEmailInvalid: false });
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
    hideEmail = () => {
        this.setState({
            showAssignTo: false
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

    getProfile(e,email) {
        e.preventDefault()
        if(email!=null){
            this.setState({
                addTo:email
            })
        }
        console.log('inside get profile')
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-profile?email=' +this.state.addTo ).then((response) => {

                if (response.data.message === 'Success') {
                        this.setState(prevState => ({
                        projectPkBean: {
                          ...prevState.projectPkBean,           // copy all other key-value pairs of food object
                          userBean: response.data.userBean[0]
                        }
                      }))
                    console.log("object",this.state.projectPkBean)
                }
                this.create(e);
            }).catch((error) => {
                console.log('Error', error);
            })
        }// end of if
    } //End of getProfile

    delete(e,email){
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.delete('http://localhost:8080/remove-user-from-create-project?email=' +email +'&projectId='+this.state.projectPkBean.projectId)
            .then((response) => {

                if (response.data.message === 'Success') {
                       this.setState({
                           show:false,
                           i:this.state.i-1
                       })
                       
                    console.log("object",this.state.projectPkBean)
                }
                this.create(e);
            }).catch((error) => {
                console.log('Error', error);
            })
        }// end of if
    }
    create(e) {
        debugger

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
            data:this.state
          }).then((response) => {
            this.setState({ loading: false })
            if (response.data.statusCode === 201) {
                console.log("object",response.data.projectBeans[0].projectPkBean.projectId)
               this.setState({
                   show:true,
                   user:this.state.projectPkBean.userBean.email,
                   addTo:"",
                   i:this.state.i+1,
               }) 
               this.setState(prevState => ({
                projectPkBean: {
                  ...prevState.projectPkBean,           // copy all other key-value pairs of food object
                  projectId:response.data.projectBeans[0].projectPkBean.projectId
                }

              }))
              console.log("==================",this.state.projectPkBean)
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
                if (AssignTo === "") {
                    that.setState({ showAssignTo: true })
                }
                if (description === "") {
                    that.setState({ showDescription: true })
                }
                if (groupName === "") {
                    that.setState({ showgroupName: true })
                }

                if (groupName === "" && description === "" && AssignTo === "" && endDate === "") {
                    console.log("here")
                    that.NotifyFieldMandatory();
                }
                if (selectedDate < now) {
                    that.setState({ showDateInvalid: true })

                }
                if (groupName !== "" && description !== "" && AssignTo !== "" && endDate !== "" && (selectedDate >= now) && that.handleEmail() == true) {
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
    addfeild(email,i){
        return(
            <div>
<div className="input-group mb-3">
                  <FormControl type="text" autoComplete="off" value={this.state.addTo} className="form-control" placeholder={email}  />
  
        <button type="button" onClick={(e) => this.delete(e,email)} style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} class="btn btn-outline-primary"><i  class="far fa-trash-alt"></i></button>
     </div>  
        <div>{i}</div>
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
                        <div id="container" className="col-auto container-fluid pb-5">
                            <div id="create" className="card shadow-lg mt-5 " >
                                <div id="cardHead" className="card-header" >
                                    <legend className="text-center">Group Form</legend>
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
                                    <form >
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-hashtag" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" onKeyPress={this.hidegroupName} required="required" type="text" name="groupName" title="Enter Group Name" id="groupName" placeholder="Enter Group Name" onChange={(event) => {
                                                this.setState({
                                                    projectName: event.target.value
                                                })
                                            }} />
                                        </div>
                                        {this.state.showgroupName ? <div id="errordiv" className="container-fluid">Please set Group Name**</div> : null}
                                        <div className="input-group mb-3">
                                            <textarea onBlur={this.hideCharacterCount} onKeyPress={this.hideDescription} type="text" className="form-control" id="description" name="description" title="Enter Description" maxLength={180} placeholder="Enter Description (character limit: 180)" rows={3} onChange={(event) => {
                                                this.setState({
                                                    description: event.target.value
                                                });this.textarea()
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
                                            <FormControl type="text" autoComplete="off" value={this.state.addTo} className="form-control"  onKeyPress={this.hideEmail} type="email" name="AssignTo" id="AssignTo" title="Enter Email" placeholder="Enter User email to add to group" onChange={(event) => {
                                                this.setState({
                                                    addTo: event.target.value
                                                })
                                            }} />

                      {/*               <FormControl type="text" name="search"  
                                onChange={(event) => { this.setState({ search: event.target.value }) }}
                                   value={this.state.search} onKeyDown={(event) => { this.searchByEnter(event) }}  placeholder="Search" className="w-55" /> */}


                                            <button type="button" onClick={(e) => this.getProfile(e)} style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} class="btn btn-outline-primary"><i  class="fas fa-plus"></i></button>
                                        </div>
                                        {this.state.showEmailInvalid ? <div id="errordiv" className="container-fluid">Please enter a valid email address</div> : null}
                                        {this.state.showAssignTo ? <div id="errordiv" className="container-fluid">Please set Email**</div> : null}
                                        {this.state.show?this.addfeild(this.state.user,this.state.i):null}
                                        <div className="input-group container-fluid">
                                            <button type="reset" id="reset" onClick={this.hideOnReset} title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm">Reset</button>
                                            <button type="submit" id="submit" title="submit" onClick={(e)=>{this.getProfile(e,JSON.parse(window.localStorage.getItem('beans')))}} className="form-control-plaintext btn btn-outline-success btn-sm">Submit</button>
                                            <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-info btn-sm"  >Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
}

export default createProject


