import React, { Component } from 'react'
import './welcom.css'
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

export class welcomePage extends Component {

    


    render() {
        return (
            <div>

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <NavLink className="navbar-brand text-light">Task Manager</NavLink>
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
  autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px">
  <div><img id="sc" src="https://cdn.pixabay.com/photo/2018/03/01/09/33/business-3190209_1280.jpg"/></div>
  <div><img id="sc" src="https://cdn.pixabay.com/photo/2018/02/09/10/46/paper-3141341_1280.jpg"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1527507631895-7cb2a9968c74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1520971081497-3aa1750677b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/></div>
  <div><img id="sc" src="https://images.unsplash.com/photo-1529119651565-dc15bd8c75fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/></div>
</Carousel>
                
<div><p id="content" className="text-center">Task Management is a task assigning and task maintainig solution application. This application offers features such as dashboards for viewing tasks, drag-and-drop, task reordering for task assigning.</p></div>

                    <div className="footer">
                        <p>&nbsp;© Copyright 2019. All rights reserved. </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default welcomePage