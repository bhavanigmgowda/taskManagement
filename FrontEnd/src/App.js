 import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import Stiky from './components/Sticky/Sticky'
import createTask from './components/createTask/CreateTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/MyProfile'

import navBar from './components/navBar/NavBar'
import tome from './components/homePage/Tome'
import byme from './components/homePage/Byme'

import AllTask from './components/createTask/AllTask';
import searchPage from './components/createTask/AllTask';
import completedTask from './components/homePage/CompletedTask';
import forgot from './components/login/forgot';
import conform from './components/login/conform';

import TaskInfo from './components/homePage/TaskInfo';
import SimpleNavBar from './components/navBar/SimpleNavBar';
import welcomePage from './components/login/welcomePage';


import dnd from './components/Dnd';
export class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          search: '',
          isvalid: JSON.parse(localStorage.getItem("isValid"))
      }
      }
  

  render() {
    const isLoggedIn = this.state.isvalid;
    return (

     

    <Router>
    
          
          <Route exact path='/homePage' component={HomePage} ></Route>
          <Route exact path='/Stiky' component={Stiky}></Route>
          <Route exact path='/createTask' component={createTask}></Route>
          <Route exact path='/createUser' component={createUser}></Route>
          <Route exact path='/tome' component={tome}></Route>
          <Route exact path='/allTask' component={AllTask}></Route>
          <Route exact path='/completedTask' component={completedTask}></Route>
          <Route exact path='/searchPage' component={searchPage}></Route>
          <Route exact path='/navBar' component={navBar}></Route>
          <Route exact path='/myprofile' component={myprofile}></Route>
          <Route exact path='/byme' component={byme}></Route>
          <Route exact path='/dnd' component={dnd}></Route>  
          <Route exact path='/conform' component={conform}></Route> 
          <Route exact path='/forgot' component={forgot}></Route> 
          <Route exact path='/TaskInfo' component={TaskInfo}></Route> 
          <Route exact path='/SimpleNavBar' component={SimpleNavBar}></Route> 
          <Route exact path='/' component={welcomePage}></Route> 

          
            <Route exact path='/Login' component={Login}></Route>
          
          </Router>
    )}}
 
export default App; 


