import React, { Component } from 'react'
import '../createUser/create.css'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
import Footer from '../navBar/footer'
import $ from 'jquery'
import './ConfirmPassword.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';

export default class forgotPasswordEmailCheck extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            showEmail: false,
            showEmailInvalid: false,
            loading:false,
        }
        

    }

    checkEmail = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        Axios.get('http://localhost:8080/check-email' + "?email" + "=" + this.state.email)
            .then((response) => {
                console.log(response)
                this.setState({loading:false});
                if (response.data.statusCode == 201) {
                    console.log("Data Found ...");

                    this.props.history.push({
                        pathname: '/confirmPassword',
                        state: { email: this.state.email }
                    })
                    console.log("props" + this.props.history.location.state.email)
                }
                else {
                    
                    console.log("Data Not Found ...");
                    this.NotifyNoEmail();
                }

            }).catch((error) => {
                this.setState({loading:false});
                this.NotifyServerOffline();
               
            })
    }
    NotifyNoEmail=()=>{

            if (! toast.isActive(this.toastId)) {
                this.toastId= toast.error(<center>Email Not Found</center>, {
                position: "top-center", autoClose: 5000,preventDuplicate:true});
            }
    }
    
	NotifyServerOffline = () => {
		toast.error(<center>Server Not Responding</center>, {
			position: "top-center", autoClose: 5000,});
	}


    componentDidMount() {
        var that = this;

        $(document).ready(function () {
            $('#submit').click(function (e) {
                console.log("email")
                var email = (document.getElementById("email").value).trim();

                if (email === "") {
                    console.log("email")
                    that.setState({ showEmail: true })
                    return false;
                }
                if (that.handleEmail() == true) {
                    that.setState({ showEmailInvalid: false })
                    return true;
                }
                else {
                    that.setState({ showEmailInvalid: true })
                    return false;
                }
            });
        });
    }
    hideEmail=()=> {
        this.setState({showEmail:false})
    }

    handleEmail = () => {
        var that = this;

        var email = document.getElementById('email').value.trim();
        if (email !== "") {
            let lastAtPos = (document.getElementById("email").value).lastIndexOf('@');
            let lastDotPos = (document.getElementById("email").value).lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && (document.getElementById("email").value).indexOf('@@') == -1 && lastDotPos > 2 && ((document.getElementById("email").value).length - lastDotPos) > 2)) {
                that.setState({ showEmailInvalid: true })
                return false;
            }
        }
        that.setState({ showEmailInvalid: false })
        return true;
    }

    render() {
       
        return (
            <div id="form-container">
                <div id="content-wrap">

                    <SimpleNavBarCreate />

                    <div className="container-fluid mt-5 ">
                    </div>
                    <div className="row mr-0 mt-5 pb-2">
                        <div id="container" className="col-auto container-fluid mt-5">
                            <div id="create" className="card shadow-lg" style={{ width: '100%' }}>
                                <div id="cardHead" className="card-header text-center">
                                    <h3>Account Recovery</h3>
                                    <p>Enter your email</p>
                                    <div className="w-100" style={{marginLeft: '50%',marginRight:'auto'}}>
										<PropagateLoader 
											size={10}
											 color={'#123abc'}
											loading={this.state.loading}
										/>
										</div>
                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={this.checkEmail}>
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-at" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" type="email" onKeyPress={this.hideEmail} name="email" title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
                                                })
                                            }} />

                                        </div>
                                        {this.state.showEmail ? <div id="errordiv" className="container-fluid">
                                            Please Enter Email**
                                        </div> : null}
                                        {this.state.showEmailInvalid ? <div id="errordiv" className="container-fluid">
                                        Please enter a valid email address**
                                        </div> : null}
                                       
                                        <div className="input-group container float-right clearfix" style={{ width: '30%', padding: '0%' }}>
                                            <button type="submit" title="submit" id="submit" className="form-control-plaintext btn btn-outline-primary btn-sm" >Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                    <Footer />
                </div>
            </div>

        )
    }
}