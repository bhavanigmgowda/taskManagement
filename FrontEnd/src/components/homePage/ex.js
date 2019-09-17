import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import createTask from '../createTask/CreateTask';
import Register from '../createUser/createUser';
/* import MyProfile from '../User/MyProfile';
 */
import homePage from '../homePage/HomePage';
import Login from '../login/Login'
import Tome from '../homePage/Tome';
import Byme from '../homePage/Byme';

export default function Navbar(props) {
  return (
    <div>
      <Router>
            <Route exact path='/' component={Login}></Route>
              
               <Route path='/createTask' component={createTask}></Route>
               <Route path='/homePage' component={homePage}></Route>
              <Route path='/myprofile' component={MyProfile}></Route>
               <Route path='/addUser' component={Register}></Route>
               <Route path='/tome' component={Tome}></Route>
               <Route path='/byme' component={Byme}></Route>
           </Router>
    </div>
  )
}
