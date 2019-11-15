
import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { Fade, Accordion, Card } from 'react-bootstrap';
class Example extends Component {

    constructor(props) {
        super(props);
    }


     taskHome(props, group) {
        console.log("object========", group)
        localStorage.setItem("groupId", group.projectPkBean.projectId)
        localStorage.setItem("projectName", group.projectName)
        this.props.history.push('/taskPage')
    }
    render(){
        var i=0
        return (
            <div>
            <Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor:"pointer", border:"none"}}>
    click here to know more Project details
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
    <div id="example-fade-text">

    <div style={{ marginLeft: "2%", marginTop: '5%' }}>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ProjectId</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">People</th>
                    <th scope="col">Creation Date</th>
                    <th scope="col">Deadline</th>
                </tr>
            </thead>
            <tbody>
                {
                   this.props.sendData.map((projectData) => {
                        console.log('tabledate', projectData.id)
                        return (
                            <tr className="ProjectTable" onClick={() => {
                                {
                                    this.taskHome(this.props, projectData)
                                }
                            }}>
                                <td scope="row">{projectData.projectPkBean.projectId}</td>
                                <td >{projectData.projectName}</td>
                                <td>{this.props.sendCount[i++]}</td>
                                 <td>{projectData.createdDate}</td>
                                <td>{projectData.deadline}</td>
                            </tr>

                        )
                    })
                }
            </tbody>
        </table>
    </div>
</div>
    </Accordion.Collapse>
  </Card>
</Accordion>

                  
            </div>
        );
    }

}
export default withRouter(Example)

