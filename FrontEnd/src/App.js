import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import createTask from './components/createTask/createTask'
import CreateUser from './components/createUser/createUser'
import navBar from './components/navBar/Navbarwithoutsearch'
import SimpleNavBar from './components/navBar/simpleNavBar'
import SearchNavbar from './components/navBar/SearchNavbar'
import tome from './components/homePage/Tome'
import byme from './components/homePage/Byme'
import completedTask from './components/homePage/CompletedTask';
import WelcomePage from './components/createTask/welcomePage'
import Footer from './components/navBar/footer'
import SimpleNavBarCreate from './components/navBar/simplenavbarcreate'
function App() {
  return (

    <div>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/draft-js/0.7.0/Draft.min.css" />

      <Router >
      <Route exact path='/' component={WelcomePage}></Route>
      <Route exact path='/footer' component={Footer}></Route>
      
        <Route exact path='/Login' component={Login}></Route>
        <Route exact path='/homePage' component={HomePage}></Route>
        <Route exact path='/createTask' component={createTask}></Route>
        <Route exact path='/createUser' component={CreateUser}></Route>
        <Route exact path='/tome' component={tome}></Route>
        <Route exact path='/completedTask' component={completedTask}></Route>
        <Route exact path='/navBar' component={navBar}></Route>
        <Route exact path='/byme' component={byme}></Route>
        <Route exact path='/simpleNavBar' component={SimpleNavBar}></Route>
        <Route exact path='/SearchNavbar' component={SearchNavbar}></Route>
        <Route exact path='/SimpleNavBarCreate' component={SimpleNavBarCreate}></Route>

        
      </Router>

    </div>

  );
}

export default App;