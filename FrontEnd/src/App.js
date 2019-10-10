import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as Axios from 'axios';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import Stiky from './components/Sticky/Sticky'
import createTask from './components/createTask/createTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/MyProfile'

import navBar from './components/navBar/NavBar'

import completedTask from './components/homePage/CompletedTask';

import SimpleNavBar from './components/navBar/SimpleNavBar';
import welcomePage from './components/welcome/welcomePage';
import ConfirmPassword from './components/login/confirmpassword';
import ForgotPasswordEmailCheck from './components/login/forgotPasswordEmailCheck'

import forgotPasswordEmailCheck from './components/login/forgotPasswordEmailCheck'
import confirmPassword from './components/login/confirmpassword'

import SearchNavabar from './components/navBar/searchNavBar';
import Byme from './components/homePage/Byme';


let search=false
let emailData=null
export class App extends Component {
  constructor(props) {
    let email=JSON.parse(window.localStorage.getItem('beans'))

    debugger
    super(props);
    this.state = {
      search: false,
      isValid: false,
      searchtask:null,
      taskData:null,
      email:JSON.parse(window.localStorage.getItem('beans'))

    }
      }
  getLoginData = (data) => {
    this.setState({
      email: data,
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    return (data)
  }

  getEmail(){
    let email=null
    if ((!this.state.email)) {
      email = JSON.parse(window.localStorage.getItem('beans'))
      if (email!=null) {
        emailData=email

        this.setState({
          email : email
        },()=>{
          console.log("object")
        })
      }}
  } 
  componentDidMount() {
    debugger
    let email = ''
    let isValid;
    let page;
    if(localStorage.getItem("isValid") === 'true'){
      isValid = true
    }else{
      isValid = false
    } 
    this.setState({
      isValid : isValid
    })

   this.getEmail();

  }
  clearSearch = () => {
    debugger
    this.setState({
      search: false
    })
  }
  
  setVal=()=>{
    debugger
    this.setState({
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    this.props.history.push('/')
  }
byme=()=>{
    
      Axios.get('http://localhost:8080/get-assign-to-task?email=' + this.state.email
      ).then((response) => {
          if (response.data.message === "Success") {
            this.setState({
              taskData:response.data.taskBean
            })
              localStorage.setItem("pages", JSON.stringify("By Me"));
            } 
      }).catch((error) => {
      })
}


  searchPage = (data) => {
    debugger
    if (JSON.parse(window.localStorage.getItem('isValid'))) {
      if (localStorage.getItem("pages") === '"By Me"') {
        Axios.get('http://localhost:8080/search-task-by-me?searchTerm=' + data + "&&email=" + this.state.email).then((response) => {
              if (response.data.message === "success") {

                  this.setState({
                      searchtask: response.data.taskBean.filter(item => item.status != 'completed'),
                      search: true
                  },()=>{
                    if((this.state.searchtask.length===0)){
                      this.setState({
                        searchtask: null,
                    })
                    }
                  })              
              }else{
                this.setState({
                  searchtask: null,
                  search: true
              })
              }
          }).catch((error) => {
              console.log('Error', error);
          })
      }
      else {
        Axios.get('http://localhost:8080/search-task-to-me?searchTerm=' + data + "&&email=" + this.state.email).then((response) => {

              if (response.data.message === "success") {
                  this.setState({
                    searchtask: response.data.taskBean.filter(item => item.status != 'completed'),
                    search: true
                  },()=>{
                    if((this.state.searchtask.length===0)){
                      this.setState({
                        searchtask: null,
                    })
                    }
                  })
              } else{
                this.setState({
                  searchtask: null,
                  search: true
              })
              }
          }).catch((error) => {
              console.log('Error', error);
          })
      }
  } else {
      this.props.history.push('/')
  }
  
  }
  

  render() {
    const isLoggedIn = this.state.isvalid;
    return (
      <div>
        {this.state.isValid ? <SearchNavabar
          setVal={this.setVal}
          clearSearch={this.clearSearch}
          pushCreateTask={this.clearSearchFromCreateTask}
          pushMyProfile={this.clearSearchFromMyProfile}
          sendToApp={this.searchPage}
          byme={this.byme} /> : null}

        {this.state.search ?
          <Byme searchData={this.state.searchtask}           clearSearch={this.clearSearch}
          />
          : <div><Route exact path='/homePage' render={() => { return <HomePage value={this.state.email} /> }} ></Route>
            <Route exact path='/navBar' component={navBar}></Route>
            <Route exact path='/byme' render={() => { return <Byme byme={this.byme} searchData={this.state.taskData} clearSearch={this.clearSearch}/> }}></Route>
            <Route exact path='/completedTask' component={completedTask}></Route>
            <Route exact path='/myprofile' component={myprofile}></Route>
            {(this.state.isValid && this.props.location.pathname === '/') ? <Redirect to='/homePage' /> : null}
            <Route exact path='/createTask' component={createTask}></Route>
          </div>
        }

        {this.state.isValid ? null :
          <Route exact path='/' component={welcomePage}></Route>
        }


        <Route exact path='/confirmPassword' component={ConfirmPassword}></Route>
        <Route exact path='/getEmail' component={forgotPasswordEmailCheck}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/Login' render={() => { return <Login clicked={this.getLoginData.bind(this)} /> }}></Route>

        {/* 
        <Route exact path='/Stiky' component={Stiky}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/SimpleNavBar' component={SimpleNavBar}></Route>
        <Route exact path='/confirmPassword' component={}></Route>
        <Route exact path='/TaskInfo' component={TaskInfo}></Route>
      
  
        <Route exact path='/homePage' component={HomePage}></Route>
        <Route exact path='/Stiky' component={Stiky}></Route>
        <Route exact path='/createTask' component={createTask}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/tome' component={tome}></Route>
        <Route exact path='/allTask' component={AllTask}></Route>
        <Route exact path='/completedTask' component={completedTask}></Route>
        <Route exact path='/searchPage' component={searchPage}></Route>
        <Route exact path='/navBar' component={navBar}></Route>
        <Route exact path='/byme' component={byme}></Route> */}
      </div>

    )
  } //End of render
}

export default withRouter(App); 