import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button, Image} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import { withRouter } from "react-router";

  class NavBarForTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',  
        }
        this.search = this.search.bind(this);
    }
    search() {
        console.log("this.state.search:", this.state.search);
        Axios.get('http://localhost:8080/searchAll?search=' + this.state.search).then((response) => {
            console.log('Response Object', response.data);
            if (response.data.message === "Success") {
                console.log("datasearch")
                console.log("localStorage",  localStorage.setItem("searchtask", JSON.stringify(response.data.taskBean)))
                this.props.history.push('/searchPage')

            } else {
                this.props.history.push('/homePage');
                localStorage.setItem('nouser', response.data.description);
            }
        }).catch((error) => {
            console.log('Error', error);
        })
    }
    getdata(){
    }
homepage(e){
    e.preventDefault();
    this.props.history.push('/homePage');
}
    logout(e) {
        e.preventDefault();
        Axios.get('http://localhost:8080/logout', null
        ).then((response) => {
            localStorage.clear();
            console.log('Response Object', response.data);
            if (response.data.message === "Success") {
                this.setState({
                    isValid:false
                })
                console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));
                console.log(this.props);
                this.props.history.push('/');
                localStorage.setItem('logoutmsg', response.data.description);
                this.props.history.push('/');
            }
        }).catch((error) => {
            console.log('Error', error);
        })
    }    
    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <NavLink to="/" id="text" className="navbar-brand text-light">Task Manager</NavLink>
                        <button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div id="my-nav" className="collapse navbar-collapse justify-content-end"> <NavDropdown  title={<Image src="src/assets/images.jpeg" roundedCircle />} id="basic-nav-dropdown">
                                <NavDropdown.Item className="text-center text-danger" variant="link" onClick={this.logout.bind(this)}>Logout</NavDropdown.Item>                                
                                <NavLink className="nav-link text-center" to="/myprofile">My Profile</NavLink>                                             
                            </NavDropdown></div>
                    </nav>
                </div>
            </div>
        )
    }
}
export default  withRouter(NavBarForTask)