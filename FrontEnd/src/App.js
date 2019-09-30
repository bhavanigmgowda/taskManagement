import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter,Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import * as Axios from 'axios';

import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import createTask from './components/createTask/createTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/myprofile'

import navBar from './components/navBar/NavBar'
import byme from './components/homePage/Byme'
import completedTask from './components/homePage/CompletedTask';
import footer from './components/navBar/footer';
import confirmpassword from './components/login/confirmpassword';
import TaskInfo from './components/homePage/TaskInfo';
import SimpleNavBar from './components/navBar/simpleNavBar';
import welcomePage from './components/welcome/welcomePage';
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
    // this.clearSearch = this.clearSearch.bind(this);
    // this.searchPage = this.searchPage.bind(this);
    // let email = ''
    // this.isValid = localStorage.getItem("isValid") === 'true' ? true : false
    
    // this.setState({
    //   isValid:this.props.location.data
    // })
  }
  getLoginData = (data) => {
    console.log('Dataaaaaa', data)
    this.setState({
      email: data,
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    return (data)
  }

  getEmail(){
   /*  let email=null
    if ((!this.state.email)) {
      email = JSON.parse(window.localStorage.getItem('beans'))
      console.log("gmail", email)
      if (email!=null) {
        console.log("email",this.state.email)

        this.setState({
          email : email.email
        })
        console.log("email",this.state.email)
      }}
      return(this.state.email) */
  }
  componentDidMount() {
    debugger
    let email = ''
    this.getEmail()
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
    this.setState({
      search: false
    },()=>{
      this.props.history.push('/homePage')
    })
    console.log("=========search=========",search)
  }
  clearSearchFromCreateTask = () => {
    this.setState({
      search: false
    },()=>{
      this.props.history.push('/CreateTask')
    })
    console.log("=========search=========",search)
  }
  clearSearchFromMyProfile = () => {
    this.setState({
      search: false
    },()=>{
      this.props.history.push('/myprofile')
    })
    console.log("=========search=========",search)
  }
  setVal=()=>{
    debugger
    this.setState({
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    this.props.history.push('/')
  }
byme=()=>{
  console.log('componentDidMount',this.state.taskData);
  if (JSON.parse(window.localStorage.getItem('isValid'))) {
      Axios.get('http://localhost:8080/getAssignToTask?email=' + this.state.email
      ).then((response) => {
          console.log('Response taskBean', response);
          if (response.data.message === "Success") {
            this.setState({
              taskData:response.data.taskBean
            },()=>{
              console.log("this.state.task",this.state.taskData)
              this.props.history.push('/byme')
            })
              localStorage.setItem("pages", JSON.stringify("byme"));
            }
      }).catch((error) => {
          console.log('Error', error);
      })
  } else {
      this.props.history.push('/')
  }
}


  searchPage = (data) => {
    debugger
  
    console.log("=========search=========",search)
    console.log("=========search=========",this.state.search)
    console.log("=========search=========",this.state.searchData)
    if (JSON.parse(window.localStorage.getItem('isValid'))) {
      if (localStorage.getItem("pages") === '"byme"') {
        Axios.get('http://localhost:8080/searchTaskByMe?searchTerm=' + data + "&&email=" + this.state.email).then((response) => {
              console.log('Response Object', response.data.taskBean);
              console.log("====================", response.data.taskBean)
              if (response.data.message === "success") {
                  console.log("datasearch")
                  this.setState({
                      searchtask: response.data.taskBean,
                      search: true

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
        Axios.get('http://localhost:8080/searchTaskToMe?searchTerm=' + data + "&&email=" + this.state.email).then((response) => {
              console.log('Response Object', response.data);
              console.log("====================", response.data.taskBean)
              if (response.data.message === "success") {
                  console.log("datasearch")
                  this.setState({
                      searchtask: response.data.taskBean,
                      search: true
                  })
                  console.log("object", this.state.searchtask)
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
    const isLoggedIn = this.state.isValid;

    return (

      
<div>     
        {this.state.isValid ? <SearchNavabar 
        setVal={this.setVal} 
        clearSearch={this.clearSearch}  
        pushCreateTask={this.clearSearchFromCreateTask}
        pushMyProfile={this.clearSearchFromMyProfile}
        sendToApp={this.searchPage} 
        byme={this.byme}/> : null}

        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/SimpleNavBar' component={SimpleNavBar}></Route>
        <Route exact path='/confirmpassword' component={confirmpassword}></Route>
        <Route exact path='/footer' component={footer}></Route>
        <Route exact path='/TaskInfo' component={TaskInfo}></Route>
        {this.state.search ?
/*              <Route exact path='/searchPage' render={() => { return <SearchPage value={this.state.searchData} /> }}></Route>    
 */   
 <Byme searchData={this.state.searchtask} />  
      :        <div><Route exact path='/homePage' render={() => { return <HomePage byme={this.byme} value={this.state.email} /> }} ></Route>      
        <Route exact path='/navBar' component={navBar}></Route>
        <Route exact path='/byme' render={() => { return <Byme byme={this.byme} searchData={this.state.taskData} />}}></Route>
        <Route exact path='/completedTask' component={completedTask}></Route>
        <Route exact path='/myprofile' component={myprofile}></Route>
{/*         {(this.state.isValid&&this.props.location.pathname==='/')?<Redirect to='/homePage'  /> :null}
 */}        <Route exact path='/createTask' component={createTask}></Route>
        </div> 
        }
        {this.state.isValid?null:<Route exact path='/' component={welcomePage}></Route>}
        
        <Route exact path='/Login' render={() => { return <Login clicked={this.getLoginData.bind(this)} /> }}></Route>
   
        </div>      
    )
  }
}
export default (App);


