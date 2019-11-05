import React, { Component } from 'react'
import SearchPeople from './SearchPeople';
import PeopleCard from './PeopleCard';
import {Architect, Employee, Lead } from '../Architect/SideData';

export default class GetPeople extends Component {
    constructor(props){
        super(props);

        this.state={
            searchInput:""
        }

    }
    
   
    render() {
        return (
            <div>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-2">
<Architect/>
		</div>
		<div class="col-md-8">
        <PeopleCard/>
		</div>
		<div class="col-md-2">
		</div>
	</div>
</div>
              
               
            </div>
        )
    }
}
