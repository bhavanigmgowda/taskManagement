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
            show: false,
            btnPage:"To Me"
        }
        this.search = this.search.bind(this);
    }

    search(e) {
        e.preventDefault();
        this.props.sendToApp(this.state.search)
    }

    homepage(e) {
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
        let val="To Me"
        return (
            <div>
                <Navbar bg="dark" expand="lg sm xl md">

                    <Link className="btnLog" onClick={this.props.clearSearch} to='/homePage' ><h3 style={{ cursor: 'pointer' }}>Task Manager</h3></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse style={{ marginLeft: '32%' }} id="basic-navbar-nav">
                        <Form inline className="mr-auto ">

                            <FormControl type="text" name="search"
                                onChange={(event) => { this.setState({ search: event.target.value }) }}

                                value={this.state.search} placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={(event) => { this.search(event) }}  >Search</Button>
                        </Form>
                        <Nav style={{ marginRight: '5%' }} className="nav-link">
                           
                            <Link onClick={this.props.clearSearch} to="/CreateTask">
                                <Button  variant="outline-primary" type="button" style={{ marginRight: 90 }}>
                                    Create Task
                         </Button>
                            </Link> 

                          <NavDropdown style={{ color: 'white' }} title={<Image style={{ width: '29px' }} src="https://encrypted-tbn0.gstatic.com/                      images?q=tbn:ANd9GcQdPQGGJ6ovVg00Uma2J_nwYBCNd-WtChp-C7twldDylqqCajRIUA" roundedCircle />} id="basic-nav-dropdown">
                                <div><NavLink className="nav-link" onClick={this.logout.bind(this)}>Logout</NavLink>
                                    <Link className="nav-link" onClick={this.props.clearSearch} to='/myprofile' >MyProfile</Link></div>

                            </NavDropdown>

                        </Nav>

                    </Navbar.Collapse>

                </Navbar>
               
            </div>
        )
    }
}
export default withRouter(SearchNavabar)

