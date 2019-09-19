import React, { Component } from 'react'
import './AllTask.css'
import SearchNavabar from '../navBar/SearchNavabar';
export default class AllTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchtask: []
        }
    }
    componentDidMount() {
        console.log("AllTask componentDidMount ")
       this.getTask();
    }
    getTask(){
        if(JSON.parse(window.localStorage.getItem("isValid"))){
        this.setState({
            searchtask:JSON.parse(window.localStorage.getItem("searchtask"))
        }) }else {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                <SearchNavabar />
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="card-body">
                                        <p className="card-text">
                                        </p><div className="row">
                                            <div className="col-md-12">
                                                {this.state.searchtask.filter(item => item.priority === 'high').map(item => {

                                                    return (

                                                        <div id="drag2" draggable="true" >
                                                            <p style={{ backgroundColor: "rgb(216, 133, 112)" }} class="danger"  ><div className="textarea">{item.description} </div></p>
                                                        </div>
                                                    )
                                                }
                                                )}

                                            </div>
                                        </div>

                                        <p />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">


                                    {this.state.searchtask.filter(item => item.priority === 'intermediate').map(item => {

                                        return (

                                            <div id="drag2" draggable="true">
                                                <p style={{ backgroundColor: "rgb(188, 241, 144)" }} class="danger"  ><div className="textarea">{item.description} </div></p>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">

                                    {this.state.searchtask.filter(item => item.priority === 'low').map(item => {

                                        return (

                                            <div id="drag2" draggable="true">
                                                <p style={{ backgroundColor: "rgb(232, 241, 144)" }} class="danger"  ><div className="textarea">{item.description} </div></p>
                                            </div>
                                        )
                                    }
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}
