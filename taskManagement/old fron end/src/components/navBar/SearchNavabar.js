import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button, Image} from 'react-bootstrap'
import {NavLink, Link} from 'react-router-dom';
import Axios from 'axios';
import { withRouter } from "react-router";
import  './SearchNavabar.css'
  class SearchNavabar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isValid: JSON.parse(window.localStorage.getItem('isValid')),
            userbean: JSON.parse(localStorage.getItem("beans"))

        }
        this.search = this.search.bind(this);
        console.log("this.state.search:", this.state.userbean.email);
    }
componentDidMount(){
    console.log("search")
   
}
    search(e) {
       
        const email = this.state.userbean.email
        console.log("this.state.search:", this.state.search);
        Axios.get('http://localhost:8080/searchAll?search=' + this.state.search + "&&email=" + email).then((response) => {
            console.log('Response Object', response.data);
            if (response.data.message === "Success") {
                console.log("datasearch")
                //console.log("localStorage",  localStorage.setItem("searchtask", JSON.stringify(response.data.taskBean)))
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
                <Navbar style={{height:'60px'}} bg="dark" expand="lg">
                   <Link className="navbar-brand" to="/homePage" style={{color:'white'}}>Task Manager</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse style={{marginLeft: '32%'}} id="basic-navbar-nav">
                       <Form   inline className="mr-auto ">
                          
                            <FormControl   type="text" name="search"
                                onChange={(event) => { this.setState({ search: event.target.value }) }}
                               
                                value={this.state.search} placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success" onClick={(event)=>{this.search()}}  >Search</Button>
                        </Form>
                        <Nav  style={{ marginRight: '5%'}} className="nav-link">
                            <Link to="/CreateTask">
                                <Button variant="outline-primary" type="button" style={{ marginRight: 90 }}>
                                    Create Task
                         </Button>
                            </Link>                            
                            <NavDropdown style={{color:'white'}}  title={<Image style={{width:'29px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdPQGGJ6ovVg00Uma2J_nwYBCNd-WtChp-C7twldDylqqCajRIUA" roundedCircle />} id="basic-nav-dropdown">
                                <NavLink className="nav-link" onClick={this.logout.bind(this)}>Logout</NavLink>
                                <NavLink className="nav-link" to="/myprofile">MyProfile</NavLink>
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                    
                </Navbar>
               
            </div>
        )
    }
}
export default  withRouter(SearchNavabar)