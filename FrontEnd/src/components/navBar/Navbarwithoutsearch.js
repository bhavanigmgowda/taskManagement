import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, NavbarBrand, Image} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

export default class Navbarwithoutsearch extends Component {
    
    logout(e) {
        e.preventDefault();
        Axios.get('http://localhost:8080/logout', null
        ).then((response) => {
            localStorage.clear();
            console.log('Response Object', response.data);
            if (response.data.message === "success") {
                console.log(this.props);
                this.props.history.push('/');
                localStorage.setItem('logoutmsg', response.data.description);
            }

        }).catch((error) => {
            console.log('Error', error);
        })
    }
    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg" className="mr-auto">
                    <NavbarBrand Link="/TaskHome">Task Manager</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">                        
                        <Nav className="nav-link">               
                            <NavDropdown  title={<Image src="src/assets/images.jpeg" roundedCircle />} id="basic-nav-dropdown">
                                <NavDropdown.Item variant="link" onClick={this.logout.bind(this)}>Logout</NavDropdown.Item>                                
                                <NavLink className="nav-link" to="/myprofile">My Profile</NavLink>                                             
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

        </div>
        )
    }
}

