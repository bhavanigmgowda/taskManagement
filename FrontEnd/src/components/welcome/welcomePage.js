import React, { Component } from 'react'
import './home.css'
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../navBar/footer';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  },
};

export class WelcomePage extends Component {




  render() {
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

          <Carousel id="carousel"
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">
            <div><img id="image" src="https://cdn.pixabay.com/photo/2018/03/01/09/33/business-3190209_1280.jpg" /></div>
            <div><img id="image" src="https://cdn.pixabay.com/photo/2018/02/09/10/46/paper-3141341_1280.jpg" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1527507631895-7cb2a9968c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1520971081497-3aa1750677b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
            <div><img id="image" src="https://images.unsplash.com/photo-1529119651565-dc15bd8c75fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
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
