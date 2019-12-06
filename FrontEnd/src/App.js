import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as Axios from 'axios';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import createTask from './components/createTask/createTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/MyProfile'

import navBar from './components/navBar/NavBar'

import completedTask from './components/homePage/CompletedTask';

import welcomePage from './components/welcome/welcomePage';
import ConfirmPassword from './components/login/confirmpassword';

import forgotPasswordEmailCheck from './components/login/forgotPasswordEmailCheck'

import SearchNavabar from './components/navBar/SearchNavBar';
import Byme from './components/homePage/Byme';
import createProject from './components/createTask/createProject';
import ProjectHomePage from './components/Architect/ProjectHomePage';
import Projectmembers from './components/Architect/Projectmembers';
import GetPeople from './components/People/GetPeople';
import { userInfo } from 'os';
import MyVerticallyCenteredModal from './components/Architect/SideData';
import SearchPage from './components/navBar/SearchPage';
import MyProfile1 from './components/createUser/MyProfile';
import Navbar from './components/navBar/NavBar';


let search = false
let emailData = null
export class App extends Component {
  constructor(props) {
    let email = JSON.parse(window.localStorage.getItem('beans'))

    super(props);
    this.state = {
      search: false,
      isValid: false,
      searchtask: null,
      taskData: null,
      email: JSON.parse(window.localStorage.getItem('beans')),
      userBean: [],
      userData:[]
    }
  }
  getLoginData = (data) => {
    this.setState({
      email: data,
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    return (data)
  }


  componentDidMount() {
    let email = ''
    let isValid;
    let page;
    if (localStorage.getItem("isValid") === 'true') {
      isValid = true
    } else {
      isValid = false
    }
    this.setState({
      isValid: isValid
    })
    Axios.get('http://localhost:8080/get-profile?email=' + this.state.email).then((response) => {
        if (response.data.message === 'Success') {
            this.setState({
                userData: response.data.userBean[0].employeeName,
             })
            console.log("userBean", this.state.userData);
        }
    }).catch((error) => {
        console.log('Error', error);
    })
  }

  setVal = () => {
    this.setState({
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    this.props.history.push('/')
  }

 
  profile = (data) => {
    console.log("object===========", data)
    this.setState({
      userBean: data
    },()=>{
      this.props.history.push('/myprofile')
      console.log("======my profile",this.state.userBean)
    })
  }




  render() {
    const page = JSON.parse(window.localStorage.getItem('pages'));
    let isValid = JSON.parse(window.localStorage.getItem('isValid'));
    let role = JSON.parse(window.localStorage.getItem('role'));
    return (
      <div>
        {isValid ? <SearchNavabar
                             myData={this.state.userData}  
                             setVal={this.setVal}       

          /> : <div>  {(this.props.location.pathname != '/' &&
            this.props.location.pathname != '/Login'
            && this.props.location.pathname != '/getEmail'
            && this.props.location.pathname != '/createUser'
            && this.props.location.pathname != '/confirmPassword' && !isValid) ? this.props.history.push('/') : null}    </div>
        }
        {this.state.isValid ?
          <div><Route exact path='/taskPage' render={() => { return <HomePage value={this.state.email}   /> }} ></Route>
            <Route exact path='/navBar' component={navBar}></Route>
        <Route exact path='/createProject' component={createProject}></Route>
            {/*  {this.state.architect?<Route exact path='/createProject' component={createProject}></Route>:null} 
         {this.state.lead?<Route exact path='/createProject' component={createProject}></Route>:null}  */}
            <Route exact path='/getPeople' render={() => { return <GetPeople sendToProfile={this.profile} /> }}></Route>
            <Route exact path='/searchPage' component={SearchPage}></Route>
            <Route exact path='/userInfo' component={userInfo}></Route>
            <Route exact path='/homePage' component={ProjectHomePage}></Route>
            <Route exact path='/byme' render={() => {
              return <Byme userBean={this.state.userData} searchData={this.state.taskData} />
            }}></Route>

            <Route exact path='/members' component={Projectmembers}></Route>

            <Route exact path='/completedTask' component={completedTask}></Route>
            <Route exact path='/myprofile'  render={() => { return <MyProfile1 userBean={this.state.userBean}  /> }}></Route>
            {(isValid && this.props.location.pathname === '/') ? <Redirect to='/homePage' /> : null}
            <Route exact path='/createTask' component={createTask}></Route>
          </div>:null
        }
        {isValid ? null :
 <Redirect to='/' />         
 }
        <Route exact path='/confirmPassword' component={ConfirmPassword}></Route>
        <Route exact path='/getEmail' component={forgotPasswordEmailCheck}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/' render={() => { return <Login clicked={this.getLoginData.bind(this)} /> }}></Route>
      </div>
    )
  } //End of render
}

export default withRouter(App); 