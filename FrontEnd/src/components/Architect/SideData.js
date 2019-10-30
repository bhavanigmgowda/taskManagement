import React, { Component } from 'react';
import {Link }from 'react-router-dom'

export const Architect = () => {

    return (
        <div>
            <div className="input-group-prepend">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask">&nbsp; My Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-th-list iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas  fa-plus-circle iconTask">&nbsp; Add User</i>
            </div>
        </div>

    )
}


export const Architectproject = () => {

    return (
        <div>
             <div className="input-group-prepend iconTask tab">
             <i class="fas fa-tasks">&nbsp; Add Task</i>
            </div>
            <div  className="input-group iconTask tab">
                <i class="fas fa-user-plus" > &nbsp; Add User</i>
            </div>
            <Link to="/">
            <div className="input-group iconTask tab">
            <i class="fas fa-user-times" >&nbsp; Remove User</i>
            </div>
            </Link>
            <Link to="/members">
            <div className="input-group iconTask tab">
            <i class="fas fa-users  tab">&nbsp; Project Members</i>
            </div>
            </Link>
           
            <hr /><hr/>
           
        </div>

    )
}

export const Lead = () => {

    return (
        <div>
            <div className="input-group-prepend">
                <i class="fas fa-users iconTask"> &nbsp; Create Project</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask ">&nbsp; My Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-th-list iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>

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
export const Employee = () => {

    return (
        <div>

            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask">&nbsp; My Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-tasks iconTask">&nbsp; Assigned Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-th-list iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Task</i>
            </div>
            <div className="input-group-prepend">
                <i class="fas fa-check-circle iconTask" style={{ marginTop: "20" }}>&nbsp; Completed Project</i>
            </div>

        </div>

    )
}


