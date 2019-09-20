import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from "react-router";
class Sticky1 extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            userBean: [],
            task: [],
            Cardcolor: ''

        };


    }



    allowDrop = (ev) => {
        ev.preventDefault();

        console.log("allowDrop");

    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);


        var res = document.getElementById("Block");
        console.log("Blocked =", res.id);

        console.log("drag");
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");

        ev.target.appendChild(document.getElementById(data));
        console.log("drop");
    }

    setProperty = () => {
        alert("click block");
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    componentDidMount() {


        var res = JSON.parse(localStorage.getItem('beans'))
        console.log("localStroage",res);
       
            var userdData = JSON.parse(localStorage.getItem('beans'))
           


            let fetchedTask = []; //array 
             if(JSON.parse(localStorage.getItem('isValid'))){
            Axios.get('http://localhost:8080/getAssignedTask' + "?email" + "=" + userdData.email,{
                credentials: 'same-origin' } )
                .then((response) => {
                    console.log(response)

                    if (response.data.statusCode == 201) {
                        console.log("Data Found ...");
                        for (let key in response.data.taskBean) {

                            //console.log(response.data[key])

                            fetchedTask.push({
                                ...response.data.taskBean[key],

                            })
                            //concate two Object using 

                        }
                        this.setState({
                            task: fetchedTask

                        })

                    }
                    else {
                        console.log("Data Not Found ...");


                    }
                    console.log('response', this.state.task);
                    console.log('response', this.state.response.data.taskBean);

                }).catch((error) => {



                })
            }
            else{
                this.props.history.push('/')
            }

        
       



    }




    changeColor = (priority) => {
        if (priority === "High") {
            document.getElementById("drag1").className = "card text-white bg-primary mb-3"
        }
        else if (priority == "low") {
            document.getElementById("drag1").className = "card text-white bg-info mb-3"

        }
    }

    render() {
        return (

            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="mainCard" className="card">
                                        <h5 className="card-header">
                                            <center>TO DO</center>
                                        </h5>
                                        {
                                            this.state.task.map((taskdetail) => {
                                                return (
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                        </p><div className="row">
                                                            <div className="col-md-12">
                                                                {/*  <script>
 
                                                   

                                                    </script> */}
                                                                <div id="drag1" draggable="true" onDragStart={this.drag} onLoad={this.changeColor.bind(this, taskdetail.priority)} className="card text-white bg-primary mb-3">

                                                                    <h5 className=" card-header">
                                                                        <span>                                                      <div>
                                                                            <span>Subject :-{taskdetail.subject}</span>

                                                                            <Button style={{ float: "right" }} id="Popover1" type="button" color="info">
                                                                                i
        </Button>
                                                                            {/* <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                                                                <PopoverHeader>Task Details</PopoverHeader>
                                                                                <PopoverBody>
                                                                                    taskId : {taskdetail.taskId}   <br></br>
                                                                                    priority :{taskdetail.priority}  <br></br>
                                                                                    endDate :{taskdetail.endDate} <br></br>
                                                                                    email :{taskdetail.userBean.email}  <br></br>
                                                                                </PopoverBody>
                                                                            </Popover> */}
                                                                        </div></span>

                                                                    </h5>
                                                                    <div className="card-body">
                                                                        <p className="card-text">
                                                                            Description :{taskdetail.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        Assigned By :{taskdetail.userBean.empName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="mainCard" className="card">
                                        <h5 className="card-header">
                                            <center> Progress </center>
                                        </h5>
                                        <div id="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card-body">
                                            <p className="card-text">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Block" className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div id="mainCard" className="card">
                                        <h5 className="card-header">
                                            <center> Blocked </center>
                                        </h5>
                                        <div id="div1" onDrop={this.drop} onDragOver={this.allowDrop} className="card-body">
                                            <p className="card-text">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>

        )
    }
}
export default withRouter(Sticky1)
