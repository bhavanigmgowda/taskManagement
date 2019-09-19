import React, { Component } from 'react'
import Axios from 'axios';
import SearchNavabar from '../navBar/SearchNavabar';

export default class Tome extends Component {
    constructor(props){
        super(props)
        this.state={
            Tome:[],
            beans:JSON.parse(window.localStorage.getItem('beans')),
        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        Axios.get('http://localhost:8080/getAssignedTask?email='+this.state.beans.email
           
        ).then((response)=>{
            console.log('Response taskBean',response);
            if(response.data.message ==="Success"){
              localStorage.setItem("taskBeans",JSON.stringify(response.data.taskBean));
              this.setState({
                Tome: response.data.taskBean
                
            })

               

                     
            }
      }).catch((error)=>{
             console.log('Error',error);
         })
     

    }
    render() {
        return (
            <div>
                <SearchNavabar/>
                <div>
                    {this.state.Tome.map(item => {


                        return (
                            <div id="drag3" className="sticky" >
                                <p class="danger">{item.description} </p>
                            </div>                            
                    )
                    })}
                </div>

            </div>
        )
    }
}
