import React, { Component } from 'react'
import SearchPeople from './SearchPeople';
import PeopleCard from './PeopleCard';
import {Architect, Employee, Lead } from '../Architect/SideData';
import Footer from '../navBar/footer';

export default class GetPeople extends Component {
    constructor(props){
        super(props);

        this.state={
            searchInput:"",
            architect: false,
            lead: false,
            emp: false,
            role: JSON.parse(window.localStorage.getItem('role')),
        }

    }
    componentDidMount() {
        if (this.state.role === "architect") {
            this.setState({
                architect: true
            })
        } else if (this.state.role === "lead") {
            this.setState({
                lead: true
            })
        } else {
            this.setState({
                emp: true
            })
        }

    }
    
    
   
    render() {
        return (
            <div>



    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2 cssCard" >
                                <div class=" card-body  h-75">
                                    <div className="input-group mb-3 option">
                                    {this.state.architect ? <Architect /> : null}
                                        {this.state.lead ? <Lead /> : null}
                                        {this.state.emp ? <Employee /> : null}
                                    </div>
                                </div>
                            </div>
	
		<div class="col-md-8">
        <PeopleCard/>
		</div>
		<div class="col-md-2">
		</div>
	</div>
    </div>
</div>
       </div>       
              <Footer/> 
            </div>
        )
    }
}
