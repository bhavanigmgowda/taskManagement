import React, { Component } from 'react'
import Axios from 'axios'

import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import '../css/NavBar.css'


export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            bean: JSON.parse(localStorage.getItem("bean"))
        }
        this.search = this.search.bind(this);
        }
    search(e) {
        e.preventDefault();
        console.log("this.state.search:", this.state.search);
        Axios.get('http://localhost:8080/library/user/searchUser?userName='+ this.state.search).then((response) => {
            console.log('Response Object', response.data);
            if (response.data.message === "successfull") {
                localStorage.setItem("beans", JSON.stringify(response.data.beans[0]));
                this.props.history.push('/allUser');
            } else {
                this.props.history.push('/adminhome');
                localStorage.setItem('nouser', response.data.description);
            }
        }).catch((error) => {
            console.log('Error', error);
        })
    }
    logout() {
        Axios.get('http://localhost:8080/login/logoutsubmit')
        .then((response)=>{
            console.log(response.data.message)
           if(response.data.message === 'Success') {
               this.props.history.push('/')
           }
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (

            <div>
  
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">

  <a class="navbar-brand" href="#">TASK</a>

  <ul class="navbar-nav">
 
    <Form className="search">
    <input class="form-control mr-sm-2 " type="text" placeholder="Search"  onChange={(event) => { this.setState({ search: event.target.value })}}/>
    <button class="btn btn-success" type="submit" onClick={this.search.bind(this)}>Search</button>
</Form>
    <li class="nav-item">
    
      <a class="nav-link" href="#">Link 2</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link 3</a>
    </li>
  </ul>
</nav>
</div>  )
    }
}

export default withRouter(Navbar)