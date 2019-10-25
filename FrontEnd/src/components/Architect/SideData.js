import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';


export const Architect = () => {

    return (
        <div>
            <Link to="/createProject" className="input-group-prepend tab">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </Link>
            <Link to="/homePage" className="navbar-brand input-group-prepend tab " >
                <i class="fas fa-list-ul iconTask">&nbsp; My open Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-list-ul iconTask">&nbsp; Reported By Me</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>
            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas  fa-user-plus iconTask">&nbsp; Add User</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-users  iconTask">&nbsp; People</i>
            </div>
        </div>

    )
}

export const Lead = () => {

    return (
        <div>
            <div className="input-group-prepend">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </div>
            <Link to="/homePage" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; My open Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>

            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-users  iconTask">&nbsp; People</i>
            </div>

        </div>

    )
}


export const Employee = () => {

    return (
        <div>

            <Link to="/homePage" className="navbar-brand input-group-prepend tab" >
                <i class="fas fa-tasks iconTask">&nbsp; My open Task</i>
            </Link>
            <Link to="/byme" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </Link>
            <Link to="/completedTask" className="navbar-brand input-group-prepend " >
                <i class="fas fa-tasks iconTask">&nbsp; Completed Task</i>
            </Link>
            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-users iconTask">&nbsp; People</i>
            </div>
        </div>

    )
}


export const Architectproject = () => {

    return (
        <div>
            <div  className="input-group iconTask tab">
                <i class="fas fa-user-plus" > &nbsp; Add User</i>
            </div>
            <div className="input-group iconTask tab">
            <i class="fas fa-user-times" >&nbsp; Remove User</i>
            </div>
            <Link to="/members">
            <div className="input-group iconTask tab">
            <i class="fas fa-users  tab">&nbsp; Project Members</i>
            </div>
            </Link>
            <div className="input-group-prepend iconTask tab">
            <i class="fas fa-users">&nbsp; Add Task</i>
            </div>
            <hr /><hr/>
           
        </div>

    )
}

export const Leadproject = () => {

    return (
        <div>
            <div  className="input-group-prepend iconTask">
                <i class="fas fa-user-plus" > &nbsp; Add User</i>
            </div>
            <div className="input-group-prepend iconTask">
            <i class="fas fa-user-times" >&nbsp; Remove User</i>
            </div>
            <div className="input-group-prepend iconTask">
            <i class="fas fa-users">&nbsp; Project Members</i>
            </div>
            <div className="input-group-prepend iconTask">
            <i class="fas fa-users">&nbsp; Add Task</i>
            </div>
            <hr /><hr/>
            
        </div>

    )
}