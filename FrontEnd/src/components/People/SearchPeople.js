import React, { Component } from 'react'
import Axios from 'axios';

export default class SearchPeople extends Component {
     
        constructor(props){
            super(props);

            this.state={
                searchInput:null
            }

        }

 
     searchButton(e){
        e.preventDefault();

           this.props.sendToPeoplePage(this.state.searchInput);
     }
     
    render() {
        return (
            <div className="row justify-content-center">
                 <div className="col-12 col-md-10 col-lg-8">
                     <form className="card card-sm" style={{border:"none"}}>
                         <div className="card-body row no-gutters align-items-center">

                             <div className="col">
                                 <input className="form-control form-control-lg form-control-borderless"
                                      type="search" placeholder="Search for people and teams"
                                       onChange={(event) => {
                                        this.setState({
                                            searchInput: event.target.value
                                        })
                                   }}
                                   ></input>
                                    </div>

                                 <div className="col-auto">
                                     <button className="btn btn-lg btn-success" onClick={(e)=>this.searchButton(e)} type="submit">Search</button>
                                 </div>

                             </div>
                            </form>
                        </div>
                          
                          
                 </div>
        )
    }
}
