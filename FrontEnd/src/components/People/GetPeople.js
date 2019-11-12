import React, { Component } from 'react'
import SearchPeople from './SearchPeople';
import PeopleCard from './PeopleCard';
import { Architect, Employee, Lead } from '../Architect/SideData';
import Footer from '../navBar/footer';
import Axios from 'axios';
import {  withRouter } from 'react-router-dom';


class GetPeople extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            architect: false,
            lead: false,
            emp: false,
            role: JSON.parse(window.localStorage.getItem('role')),
            data: [],
            peoples: [],
            searchInput: '',
            searchData: false,
            mail: JSON.parse(window.localStorage.getItem('beans')),

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
        Axios.get('http://localhost:8080/search-members-for-project?email=' + JSON.parse(window.localStorage.getItem('beans'))
        ).then((response) => {

            if (response.data.message === "Success") {
                console.log("response people", response);
                this.setState({
                    peoples: response.data.userBeans
                })

            }
        }).catch((error) => {
        })


    }
  

    searchButton = (e) => {
        e.preventDefault()

        console.log(this.state.searchData)
        Axios.get('http://localhost:8080/get-User?name=' + this.state.searchInput
        ).then((response) => {
            if (response.data.message === "Success" && response.data.userBean.length != 0) {
                console.log(response.data.message + " ==" + response.data.userBean)
                console.log("response people", response);
                this.setState({
                    peoples: response.data.userBean,
                    searchData: true,
                    searchInput:''
                })
            }
            else {
                this.setState({
                    searchData: false
                })

            }
        }).catch((error) => {
        })
    }

    sendMyProfile(people) {
        console.log("people",people)
        this.props.sendToProfile(people)
/*         this.props.history.push('/myprofile')
 */    }

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
                                    <div>

                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-10 col-lg-8">
                                                <form className="card card-sm" style={{ border: "none" }}>
                                                    <div className="card-body row no-gutters align-items-center">

                                                        <div className="col">
                                                            <input className="form-control form-control-lg form-control-borderless"
                                                                type="search" placeholder="Search for people and teams" value={this.state.searchInput}
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        searchInput: event.target.value
                                                                    })
                                                                }}
                                                            ></input>
                                                        </div>

                                                        <div className="col-auto">
                                                            <button className="btn btn-lg btn-success" onClick={(e) => this.searchButton(e)} type="submit">Search</button>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>


                                        </div>
                                        <div >
                                           {this.state.searchData?null: <h4>You Work With</h4>}
                                          
                                                <div className="row">
                                                    {
                                                        this.state.peoples.filter(item=>item.email!==this.state.mail).map((people) => {
                                                            return (
                                                                <div className="card col-sm-2" onClick={() => this.sendMyProfile(people)} style={{ width: "176px", height: "177px", marginBottom: "25px", margin: "20px" }}>
                                                                    <div class="card-body" style={{cursor:"pointer"}}>
                                                                        <img style={{ height: "80px", marginLeft: "21px", marginRight: "auto" }} src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="Smiley face" />
                                                                        <div style={{ textAlign: "center" }} class="card-text">{people.employeeName}</div>
                                                                        <div style={{ textAlign: "center" }}>{people.email}</div>
                                                                    </div>

                                                                </div>
                                                            )
                                                        })

                                                    }
                                                </div>
                                               
                                        </div>
                                    </div>		</div>
                                <div class="col-md-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default withRouter(GetPeople)
