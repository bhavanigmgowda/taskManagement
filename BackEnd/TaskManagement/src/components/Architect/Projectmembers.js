import React from 'react'
import Axios from 'axios';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Footer from '../navBar/footer'


class Projectmembers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectmembers: []
        }
    }

    componentDidMount() {
        
        console.log("object")
        this.setState({ loading: true });
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/get-members?groupId=' + 20)
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        localStorage.setItem("pages", JSON.stringify("To Me"));

                        console.log("response", response);
                        //setstat
                        this.setState({
                          projectmembers : response.data.projectBeans
                        })
                        console.log("object")
                    }
                }).catch((error) => {
                    console.log(error)
                    this.setState({ loading: false });
                   // this.NotifyServerOffline();
                })
        } else {
            this.props.history.push('/')
        }
    }


    render() {
        return (
            <div>
{this.state.projectmembers.map(item=>{
    return(
        <h1>{item.projectPkBean.userBean.employeeName}</h1>
    )
})}
<Footer/>
            </div>
        )
    }
}
export default withRouter(Projectmembers)
