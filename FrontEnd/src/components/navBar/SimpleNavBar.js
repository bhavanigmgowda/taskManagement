import React, { Component } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export class SimpleNavBar extends Component {
    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{height:'60px'}}>
                        <NavLink to="/" id="text" className="navbar-brand text-light"><h3>Task Manager</h3></NavLink>
                        <button className="navbar-toggler" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div id="my-nav" className="collapse navbar-collapse justify-content-end"> <NavLink to="/Login" className="btn btn-sm btn-outline-primary font-weight-bolder mr-2">Log In</NavLink> </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default SimpleNavBar
