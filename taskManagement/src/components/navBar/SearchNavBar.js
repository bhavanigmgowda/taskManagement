import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import Axios from 'axios';
import { withRouter } from "react-router";
import './SearchNavabar.css'
class SearchNavabar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isValid: JSON.parse(window.localStorage.getItem('isValid')),
            userbean: JSON.parse(localStorage.getItem("beans")),
            role: JSON.parse(localStorage.getItem("role")),
            show: false,
            btnPage: "To Me"
        }
    }

    search(e) {
        e.preventDefault();
        this.props.sendToApp(this.state.search)
        this.clear(e);
    }
    clear(e) {
        e.preventDefault();
        this.setState({
            search: ''
        })
    }
    homepage(e) {
        e.preventDefault();
        localStorage.removeItem('groupId');
        localStorage.removeItem('projectName');
        this.props.history.push('/homePage')
    }


    logout(e) {
        e.preventDefault();

        Axios.get('http://localhost:8080/logout', null
        ).then((response) => {
            localStorage.clear();
            console.log('Response Object', response.data);
            if (response.data.message === "Success") {
                this.setState({
                    isValid: false
                })
                let a = localStorage.setItem("isValid", JSON.stringify(this.state.isValid));
                console.log(this.props);
                this.props.setVal()
                this.props.clearSearch()
            }

        }).catch((error) => {
            console.log('Error', error);
        })
    }
    pushHomePage = () => {
        this.props.clearSearch()
    }

    render() {
        let val = "To Me"
        return (
            <div>
                <Navbar style={{ height: '60px' }} bg="dark" expand="lg">
                    <Link className="navbar-brand" onClick={(e) => { this.homepage(e) }} style={{ color: 'white' }}><h3>Task Manager</h3></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="nav-link">
                            <Link to="/CreateTask"><div className="w-100 mt-1" >
                                
                                <Button variant="success" style={{ marginLeft
                                    : '1127px',width:'13%' }} onClick={this.props.clearSearch} type="button" className="h-auto">
                                    Create Task
                         </Button></div>
                            </Link>
                        </Nav>
                        <div class="dropdown-nav" style={{marginLeft: "191px"}}>
                      
                            <button style={{ color: 'white' }} class="dropbtn-nav">  <h5 style={{color:"white"}}>{this.props.myData.employeeName}&nbsp;
        <i class="fa fa-caret-down"></i></h5>
                            </button>
                            <div class="dropdown-content-nav">
                                <NavLink className="nav-link linkbar-nav" onClick={this.props.clearSearch} to="/myprofile">MyProfile</NavLink>
                                <NavLink className="nav-link linkbar-nav" onClick={this.props.clearSearch} onClick={this.logout.bind(this)}>Logout</NavLink>
                            </div>
                        </div>
                       
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default withRouter(SearchNavabar)