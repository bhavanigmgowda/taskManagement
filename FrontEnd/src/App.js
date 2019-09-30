import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter,Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import * as Axios from 'axios';

import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import Stiky from './components/Sticky/Sticky'
import createTask from './components/createTask/CreateTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/MyProfile'

import navBar from './components/navBar/NavBar'
import completedTask from './components/homePage/CompletedTask';
import forgot from './components/login/forgot';
import conform from './components/login/conform';
import SimpleNavBar from './components/navBar/SimpleNavBar';
import welcomePage from './components/login/welcomePage';
import SearchNavabar from './components/navBar/SearchNavabar';
import Byme from './components/homePage/Byme';

let search=false

export class App extends Component {
  constructor(props) {
    let email=JSON.parse(window.localStorage.getItem('beans'))

    debugger
    super(props);
    this.state = {
      search: false,
      isValid: false,
      email:email.email,
      searchtask:null,
      taskData:null
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

        this.setState({
          email : email.email
        })
      }}
      return(this.state.email)
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

   

  }
  clearSearch = () => {
    debugger
    this.setState({
      search: false
    })
  }
  clearSearchFromCreateTask = () => {
    this.setState({
      search: false
    },()=>{
      this.props.history.push('/CreateTask')
    })
  }
  clearSearchFromMyProfile = () => {
    this.setState({
      search: false
    },()=>{
      this.props.history.push('/myprofile')
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
  let email=null

  if ((!this.state.email)) {
    email = JSON.parse(window.localStorage.getItem('beans'))
    if (email!=null) {

      this.setState({
        email : email.email
      },()=>{
      })
      
    }}
  if (JSON.parse(window.localStorage.getItem('isValid'))) {
      Axios.get('http://localhost:8080/get-assign-to-task?email=' + this.state.email
      ).then((response) => {
          if (response.data.message === "Success") {
            this.setState({
              taskData:response.data.taskBean
            },()=>{
              this.props.history.push('/byme')
            })
              localStorage.setItem("pages", JSON.stringify("byme"));
            }
      }).catch((error) => {
      })
  } else {
      this.props.history.push('/')
  }
}


  searchPage = (data) => {
    debugger
   
    if (JSON.parse(window.localStorage.getItem('isValid'))) {
      if (localStorage.getItem("pages") === '"byme"') {
        Axios.get('http://localhost:8080/search-task-by-me?searchTerm=' + data + "&&email=" + this.state.email).then((response) => {
              if (response.data.message === "success") {
                  this.setState({
                      searchtask: response.data.taskBean.filter(item => item.status != 'completed'),
                      search: true
                  },()=>{
                    if(this.state.searchtask.length>=1){
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
                    if(this.state.searchtask.length>=1){
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
    let email=null

    if ((!this.state.email)) {
      email = JSON.parse(window.localStorage.getItem('beans'))
      if (email!=null) {

        this.setState({
          email : email.email
        })
      }}

    return (

      
     <div>
        {this.state.isValid ? <SearchNavabar 
        setVal={this.setVal} 
        clearSearch={this.clearSearch}  
        pushCreateTask={this.clearSearchFromCreateTask}
        pushMyProfile={this.clearSearchFromMyProfile}
        sendToApp={this.searchPage} 
        byme={this.byme}/> : null}

        <Route exact path='/Stiky' component={Stiky}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/SimpleNavBar' component={SimpleNavBar}></Route>
        <Route exact path='/conform' component={conform}></Route>
        <Route exact path='/forgot' component={forgot}></Route>
        {this.state.search ?

<Byme searchData={this.state.searchtask}  clearSearch={this.clearSearch} byme={this.byme} />  
      :        <div><Route exact path='/homePage' render={() => { return <HomePage byme={this.byme} value={this.state.email} /> }} ></Route>      
        <Route exact path='/navBar' component={navBar}></Route>
        <Route exact path='/byme' render={() => { return <Byme byme={this.byme} searchData={this.state.taskData} />}}></Route>
        <Route exact path='/completedTask' component={completedTask}></Route>
        <Route exact path='/myprofile' component={myprofile}></Route>
        {(this.state.isValid&&this.props.location.pathname==='/')?<Redirect to='/homePage'  /> :null}
        <Route exact path='/createTask' component={createTask}></Route>
        </div> 
        }
        {this.state.isValid?null:<Route exact path='/' component={welcomePage}></Route>}
        
        <Route exact path='/Login' render={() => { return <Login clicked={this.getLoginData.bind(this)} /> }}></Route>
        </div>
      
    )
  }
}
export default withRouter(App);


