import React, { Component } from 'react'
import './home.css'
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import Footer from '../navBar/footer';

export class WelcomePage extends Component {

  render() {
    debugger
    return (
      <div id="page-container" >
        <div id="content-wrap" >
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <NavLink id="text" className="navbar-brand text-light">Task Manager</NavLink>
            <button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div id="my-nav" className="collapse navbar-collapse justify-content-end"> <NavLink to="/Login" className="btn btn-outline-primary btn-sm font-weight-bold mr-2">Log In</NavLink> <NavLink to="/createUser" className="btn btn-outline-success btn-sm font-weight-bold mr-2">Create Account</NavLink> </div>
          </nav>


          <Carousel id="carousel">
  <Carousel.Item>
    <img id="image"
      className="d-block shadow"
      src="https://cdn.pixabay.com/photo/2018/03/01/09/33/business-3190209_1280.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Work Anywhere</h3>
      <p>Compatiable with desktops and laptops</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img id="image"
      className="d-block "
      src="https://cdn.pixabay.com/photo/2018/02/09/10/46/paper-3141341_1280.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Deadline</h3>
      <p>Assign Date for Deadline</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img id="image"
      className="d-block"
      src="https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Things To Do</h3>
      <p>Assign Task to Others</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img id="image"
      className="d-block "
      src="https://images.unsplash.com/photo-1529119651565-dc15bd8c75fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Sticky Notes</h3>
      <p>View Task as Sticky Notes</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

          <div id="deck" className="card-deck" >
  <div id="roundCard" className="card shadow">
    <img src="https://images.pexels.com/photos/7376/startup-photos.jpg?cs=srgb&dl=agenda-concept-development-7376.jpg&fm=jpg" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 id="text" className="card-title text-center font-weight-bolder">Vision</h5>
      <p id="text" className="card-text">Task Management is a task assigning and task maintainig solution application</p>
    </div>
  </div>
  <div id="roundCard" className="card shadow">
    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/45/man-311326_1280.png" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 id="text" className="card-title text-center font-weight-bolder">Views</h5>
      <p id="text" className="card-text">This application offers features such as dashboards for viewing tasks, drag-and-drop, task reordering for task assigning</p>
    </div>
  </div>
  <div id="roundCard" className="card shadow">
    <img src="https://cdn.pixabay.com/photo/2019/06/23/18/25/business-icons-4294400_1280.png" style={{height:'auto'}} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 id="text" className="card-title text-center font-weight-bolder">Features</h5>
      <p id="text" className="card-text">Create tasks, viewing tasks, drag-and-drop task, Set start and end-date to define task deadlines, Set priority to make task Manageable</p>
    </div>
  </div>
</div>
          <Footer />
        </div>
        </div>

        )
      }
    }
    
    export default WelcomePage