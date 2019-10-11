// import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import { Button } from 'react-bootstrap'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import './ConfirmPassword.css'
// import Axios from 'axios'
// import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
// import Footer from '../navBar/footer'
// import $ from 'jquery'
// export default class ConfirmPassword extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             password: '',
//             confirmpassword: '',
//             email: '',
//             showSuccess: false,
//             showServer: false,
//             showInvalidPassword: false,
//             showPassword: false,
//             showConfirmPassword: false,
//             type: 'password',
//             typec: 'password',
//             showPasswordRules: false
//         }
//     }

//     handleClick = () => this.setState(({ type }) => ({
//         type: type === 'text' ? 'password' : 'text'
//     }))
//     handleClickConfirm = () => this.setState(({ typec }) => ({
//         typec: typec === 'text' ? 'password' : 'text'
//     }))

//     handlePassword = (pass) => {
//         var pass = document.getElementById('password').value;
//         var that = this;
//         var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//         var test = reg.test(pass);
//         if (test) {

//             that.setState({ showPasswordRules: false })
//             return true;
//         } else {
//             that.setState({ showPasswordRules: true })
//             return false;
//         }
//     }

//     setPassword = (event) => {
//         event.preventDefault();
//         console.log("props" + this.props.history.location.state.email)
//         let email = this.props.history.location.state.email;

//         Axios.patch('http://localhost:8080/update-password' + "?password=" + this.state.password + '&email=' + email)
//             .then((response) => {
//                 console.log(response)

//                 if (response.data.statusCode === 201) {
//                     console.log("Data Found ...");

//                     this.setState({ showSuccess: true })
//                     setTimeout(() => {
//                         this.props.history.push('/Login');
//                     }, 3000)
//                 }
//                 else if (response.data.statusCode === 401) {

//                     console.log("password exists ");
//                     this.setState({ showPasswordExist: true })
//                     setTimeout(() => {
//                         this.setState({ showPasswordExist: false })
//                     }, 20000)
//                 }

//             }).catch((error) => {
//                 this.setState({ showServer: true })
//                 setTimeout(() => {
//                     this.setState({ showServer: false })
//                 }, 15000)
//                 console.log(error)
//             })
//     }

//     componentDidMount() {
//         var that = this;
//         $(document).ready(function () {
//             $('#submit').click(function (e) {
//                 var pass = (document.getElementById("password").value).trim();
//                 var rpass = (document.getElementById('password_confirmation').value).trim();

//                 if (pass !== rpass) {
//                     that.setState({ showInvalidPassword: true });
//                     setTimeout(() => {
//                         that.setState({ showInvalidPassword: false });
//                     }, 10000)
//                 }
//                 if (rpass === "") {
//                     that.setState({ showConfirmPassword: true })
//                 }
//                 if (pass === "") {
//                     that.setState({ showPassword: true });
//                     that.setState({ showPasswordCriteria: false })
//                 }
//                 if (pass !== "" && rpass !== "" && pass === rpass && that.handlePassword() === true) {
//                     return true;
//                 }
//                 return false;
//             });
//         });
//     }

//     hidePassword = () => {
//         this.setState({ showPassword: false })
//     }
//     hideCPassword = () => {
//         this.setState({ showConfirmPassword: false })
//     }



//     render() {
//         return (
//             <div id="page-container  ">
//                 <div id="content-wrap" className="mb-0">
//                     <SimpleNavBarCreate />
//                     <div className="container-fluid">
//                         {this.state.showSuccess ? <div id="success" className="alert alert-success"><h6><b>Password Changed Successfully</b></h6> </div> : null}
//                         <div className="row pb-2">
//                             <div id="container" className="col-auto container mt-5 pb-5">
//                                 <div id="create" className="card shadow-lg mt-5">
//                                     <div id="cardHead" className="card-header text-center">
//                                         <h3>Change Password</h3>
//                                         <p>Enter new password and confirm password</p>
//                                     </div>
//                                     <div className="card-body">
//                                         <form onSubmit={this.setPassword.bind(this)}>
//                                             <div className="input-group mb-3">
//                                                 <div className="input-group-prepend">
//                                                     <label className="input-group-text"><i className="fas fa-key" /></label>
//                                                 </div>
//                                                 <input required type={this.state.type} id="password" onKeyPress={this.hidePassword} className="form-control border border-right-0" placeholder="Enter New Password" value={this.state.password}
//                                                     onChange={(event) => { this.setState({ password: event.target.value }) }} />
//                                                 <div className="input-group-append btn " style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
//                                             </div>
//                                             {this.state.showPassword ? <div id="errordiv" className="container-fluid">
//                                                 Please Enter Password**
//                                         </div> : null}
//                                             {this.state.showPasswordRules ? <div id="errordiv" className="container-fluid text-center ">Password min. 6 characters containing atleast 1 uppercase, 1 lowecase alphabet and 1 digit</div> : null}
//                                             <div className="input-group mb-3">
//                                                 <div className="input-group-prepend">
//                                                     <label className="input-group-text"><i className="fas fa-key" /></label>
//                                                 </div>
//                                                 <input required type={this.state.typec} onKeyPress={this.hideCPassword} id="password_confirmation" className="form-control border border-right-0" placeholder="Enter Confirm Password" value={this.state.confirmpassword}
//                                                     onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} />
//                                                 <div className="input-group-append btn" style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClickConfirm}>{this.state.typec === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
//                                             </div>
//                                             {this.state.showConfirmPassword ? <div id="errordiv" className="container-fluid">
//                                                 Please confirm Password**
//                                         </div> : null}
//                                             {this.state.showInvalidPassword ? <div>
//                                                 <small className="alert alert-danger text-center font-weight-bold d-block">Passwords didn't match Try again</small>
//                                             </div> : null}
//                                             {this.state.showPasswordExist ? <div>
//                                                 <small className="alert alert-danger text-center font-weight-bold d-block">This password already exists create another</small>
//                                             </div> : null}
//                                             {this.state.showServer ? <div className="alert alert-danger d-block text-center ">
//                                                 <small className="font-weight-bold ">Server did not respond</small>
//                                             </div> : null}
//                                             <div id="loginButtton">
//                                                 <button id="btnlogin" id="submit" className="btn btn-primary float-right btn-sm" type="submit">Change</button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         )
//     }
// }




 
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './ConfirmPassword.css'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate'
import Footer from '../navBar/footer'
import $ from 'jquery'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from 'react-spinners';


export default class ConfirmPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmpassword: '',
            email: '',
           
            showPassword: false,
            showConfirmPassword: false,
            type: 'password',
            typec: 'password',
            showPasswordRules: false,
            loading:false
        }
    }
    NotifyPasswordChange = () => {
        if (! toast.isActive(this.toastId)) {
        this.toastId=	toast.success(<center>Password Changed Successfully</center>, {
			position: "top-center", autoClose: 5000,});
    }
}
    NotifyServerOffline = () => {
        if (! toast.isActive(this.toastId)) {
		this.toastId=toast.error(<center>Server Not Responding</center>, {
			position: "top-center", autoClose: 7000,});
    }
}
    NotifyPasswordMismatch=()=>{
        if (! toast.isActive(this.toastId)) {
        this.toastId= toast.error(<center>Passwords Didn't Match Try Again...</center>, {
			position: "top-center", autoClose: 7000,});
    }
}
    NotifyPasswordExists=()=>{
        if (! toast.isActive(this.toastId)) {
        this.toastId= toast.warn(<center>This Password Already Exists Create Another</center>, {
			position: "top-center", autoClose: 7000,});
    }
}
    handleClick = () => this.setState(({ type }) => ({
        type: type === 'text' ? 'password' : 'text'
    }))
    handleClickConfirm = () => this.setState(({ typec }) => ({
        typec: typec === 'text' ? 'password' : 'text'
    }))
    handlePassword = (pass) => {
        var pass = document.getElementById('password').value;
        var that = this;
        var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        var test = reg.test(pass);
        if (test) {
            that.setState({ showPasswordRules: false })
            return true;
        } else {
            that.setState({ showPasswordRules: true })
            return false;
        }
    }
    setPassword = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        console.log("props" + this.props.history.location.state.email)
        let email = this.props.history.location.state.email;
        Axios.patch('http://localhost:8080/update-password' + "?password=" + this.state.password + '&email=' + email)
            .then((response) => {
                console.log(response)

                if (response.data.statusCode === 201) {
                    this.setState({loading:false});
                    console.log("Data Found ...");
                    this.NotifyPasswordChange();
                    setTimeout(() => {
                        this.props.history.push('/Login');
                    }, 5000)
                }
                else if (response.data.statusCode === 401) {
                    this.setState({loading:false});
                    console.log("password exists ");
                   this.NotifyPasswordExists();
                }

            }).catch((error) => {
                this.setState({loading:false});
            this.NotifyServerOffline();
                console.log(error)
            })
    }

    componentDidMount() {
        var that = this;
        $(document).ready(function () {
            $('#submit').click(function (e) {
                var pass = (document.getElementById("password").value).trim();
                var rpass = (document.getElementById('password_confirmation').value).trim();

                if (pass !== rpass) {
                   that.NotifyPasswordMismatch();
                }
                if (rpass === "") {
                    that.setState({ showConfirmPassword: true })
                }
                if (pass === "") {
                    that.setState({ showPassword: true });
                    that.setState({ showPasswordCriteria: false })
                }
                if (pass !== "" && rpass !== "" && pass === rpass && that.handlePassword() === true) {
                    return true;
                }
                return false;
            });
        });
    }

    hidePassword = () => {
        this.setState({ showPassword: false })
    }
    hideCPassword = () => {
        this.setState({ showConfirmPassword: false })
    }
    hidePasswordRules = () => {
        this.setState({showPasswordRules:false})
    }



    render() {
        return (
            <div id="page-container  ">
                <div id="content-wrap" className="mb-0">
                    <SimpleNavBarCreate />
                    <div className="container-fluid">
                        
                        <div className="row pb-2">
                            <div id="container" className="col-auto container-fluid mt-5 pb-5">
                                <div id="create" className="card shadow-lg mt-5">
                                    <div id="cardHead" className="card-header text-center">
                                        <h3>Change Password</h3>
                                        <p>Enter new password and confirm password</p>
                                        <div className="w-100" style={{marginLeft: '50%',marginRight:'auto'}}>
										<PropagateLoader 
											css={this.override}
											size={10}
											 color={'#123abc'}
											loading={this.state.loading}
										/>
										</div>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.setPassword.bind(this)}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-key" /></label>
                                                </div>
                                                <input required type={this.state.type} id="password" onKeyPress={(event)=>{this.hidePassword();this.hidePasswordRules()}} className="form-control border border-right-0" placeholder="Enter New Password" value={this.state.password}
                                                    onChange={(event) => { this.setState({ password: event.target.value }) }} />
                                                <div className="input-group-append btn " style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
                                            </div>
                                            {this.state.showPassword ? <div id="errordiv" className="container-fluid">
                                                Please Enter Password**
                                        </div> : null}
                                            {this.state.showPasswordRules ? <div id="errordiv" className="container-fluid text-center ">Password min. 6 characters containing atleast 1 uppercase, 1 lowecase alphabet and 1 digit</div> : null}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label className="input-group-text"><i className="fas fa-key" /></label>
                                                </div>
                                                <input required type={this.state.typec} onKeyPress={this.hideCPassword} id="password_confirmation" className="form-control border border-right-0" placeholder="Enter Confirm Password" value={this.state.confirmpassword}
                                                    onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} />
                                                <div className="input-group-append btn" style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClickConfirm}>{this.state.typec === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
                                            </div>
                                            {this.state.showConfirmPassword ? <div id="errordiv" className="container-fluid">
                                                Please Confirm Password**
                                        </div> : null}
                                            
                                
                                            <div id="loginButtton">
                                                <button id="btnlogin" id="submit" className="btn btn-primary float-right btn-sm" type="submit">Change</button>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
                <Footer />
            </div>
        )
    }
}
