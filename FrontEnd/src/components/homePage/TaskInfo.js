

import React, { Component } from 'react'
import { Architect, Employee, Lead } from '../Architect/SideData';
import { NavLink, withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

export default class TaskInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            projectInfo: '',
            taskBean: '',
            user: [],
            commentBean: [],
            email: JSON.parse(window.localStorage.getItem('beans')),
            pr:'',
            comment:'',
            edit:true,
            description:'',
            assignedTo:'',
            deadLine:'',
            priority:'',
            endDate:'',
            subject:''
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData() {
        console.log("this.props.passTask", this.props.passTask)
        console.log("this.props.passUser", this.props.passUser)
        console.log("this.props.commentBean", this.props.commentBean)
        this.setState({
            taskBean: this.props.taskBean,
            user: this.props.user,
        })
        if(this.props.commentBean){
            this.setState({
                commentId:this.props.commentBean
            })
        }
    }

    updateComment(item) {
        console.log("===================update", item.comment, this.state.updateComment)
        if (item.comment !== this.state.updateComment && this.state.updateComment != null && this.state.updateComment !== '') {
            this.setState({
                comment: this.state.updateComment
            }, () => {
                item.comment = this.state.comment
                Axios({
                    method: 'put',
                    url: 'http://localhost:8080/update-comment',
                    data: item
                }).then((response) => {
                    if (response.data.statusCode === 201) {
                        this.setState({
                            updateComment: ''
                        })
                    }
                    this.props.getComment();
                }).catch((error) => {
                    console.log(error)
                    this.setState({ loading: false });
                })
            })
        }
    }
       edit(email) {
        console.log("=======edit")

        if (this.state.email === email) {
            console.log("=======edit")
            this.setState({
                edit: true
            })
        }
    }
   


    deleteComment(commentId) {
        Axios.delete('http://localhost:8080/delete-comment?commentId=' + commentId)
            .then((response) => {
                if (response.data.statusCode === 201) {
                    this.props.getComment();

                }

            }).catch((error) => {
                console.log(error)
                this.setState({ loading: false });
            })

    }
    addComment(){
        this.props.comment(this.state.comment);
        this.setState({
            comment:''
        })
    }
    
update(){
    if(this.state.email==this.props.user.email){
    this.setState({
        edit:false,
        description:this.props.taskBean.description,
        assignedTo:this.props.taskBean.assignedTo,
            endDate:this.props.taskBean.endDate,
            priority:this.props.taskBean.priority,
            taskBean:this.props.taskBean,
            user:this.props.user,
            subject:this.props.taskBean.subject
    })
    this.setState({
        user:this.props.user
    })
}
}

updateTask(){
    Axios.put('http://localhost:8080/update-task-info?taskId='+ this.props.taskBean.taskId+'&description='+this.state.description
     +'&assignedTo='+this.state.assignedTo+'&deadLine='+this.state.endDate+'&priority='+this.state.priority+'&subject='+this.state.subject)
    .then((response) => {
        if (response.data.statusCode === 201) {
         console.log("============props to Home")
            this.props.comment();
        }
    }).catch((error) => {
        console.log(error)
        this.setState({ loading: false });
    })
}
cancle(){
    this.setState({
        edit:true
    })
}
    render() {
        var commentBean=[]
     
        if(this.props.commentBean){
           commentBean=this.props.commentBean
        }
        return (
            <div class=" card-body  h-75">
                <div className="input-group mb-3 option">

                <label className="mb-0" style={{ color: '#808080' }}>Subject</label>
                    <div className="input-group mb-2">
                        <textarea style={{ color: 'black'}} onClick={()=>this.update()}  value={this.state.edit?this.props.taskBean.subject:this.state.subject} 
                        type="text" className="form-control" placeholder="Designation" readOnly={this.state.edit} onChange={(event)=>
                            this.setState({
                                subject:event.target.value
                            })
                        }/> 
                         </div>
                    <label className="mb-0" style={{ color: '#808080' }}>Description</label>
                    <div className="input-group mb-2">
                        <textarea style={{ color: 'black'}} onClick={()=>this.update()}  value={this.state.edit?this.props.taskBean.description:this.state.description} 
                        type="text" className="form-control" placeholder="Designation" readOnly={this.state.edit} onChange={(event)=>
                            this.setState({
                                description:event.target.value
                            })
                        }/> 
                         </div>
                    <label className="mb-0" style={{ color: '#808080' }}>Assigned By</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend ">
                            <label className="input-group-text "><i className="fas fa-at" /></label>
                        </div>
                        <input type="text" value={this.props.user.email} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
                    <label className="mb-0" style={{ color: '#808080' }}>Assigned To</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend ">
                            <label className="input-group-text "><i className="fas fa-at" /></label>
                        </div>
                        <input type="text"  value={this.state.edit?this.props.taskBean.assignedTo:this.state.assignedTo} 
                        style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly={this.state.edit} onClick={()=>this.update()} onChange={(event)=>
                            this.setState({
                                assignedTo:event.target.value
                            })
                        }/></div>

                    <label className="mb-0" style={{ color: '#808080' }}>Assigned On</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                        </div>
                        <input type="text" style={{ color: 'black' }} 
                            value={moment(this.props.taskBean.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly/></div>
                    <label className="mb-0" style={{ color: '#808080' }}>Deadline</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                        </div>

                        <input type="date" style={{ color: 'black' }} value={this.state.edit?this.props.taskBean.endDate:this.state.endDate}
                           className="form-control" placeholder="Email" readOnly={this.state.edit} onClick={()=>this.update()} onChange={(event)=>
                            this.setState({
                                endDate:event.target.value
                            })
                        }/> </div>
                    <label className="mb-0" style={{ color: '#808080' }}>Priority</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text"><i class="fas fa-tasks"></i></label>

                        </div>
                          <select  className="form-control" readOnly={this.state.edit} onClick={()=>this.update()} value={this.state.edit?this.props.taskBean.priority:this.state.priority} name="Priority"  onChange={(event) => {
                                                    this.setState({
                                                        priority: event.target.value
                                                    })
                                                }}>
                                                         <option selected disabled hidden>Choose Priority</option>
                                                    <option disabled={this.state.edit} value="low">Low</option>
                                                    <option disabled={this.state.edit} value="medium">Medium</option>
                                                    <option disabled={this.state.edit} value="high">High</option>
                                                    <option disabled={this.state.edit} value="critical">Critical</option>
                                                </select>
                                            </div>

                    <label className="mb-0" style={{ color: '#808080' }}>Comment</label>
                    <div className="commentBlock" /* style={{overflowY:"scroll", height:"300px",width:"100%"}} */>
                        {commentBean.filter(item => this.state.email !== item.userBean.email).map(item => {
                            return (
                                <div>
                                    <label className="mb-0" style={{ color: 'black', fontSize: '15' }}>{item.userBean.employeeName}</label>
                                    <div className="input-group mb-2">

                                        <textarea style={{ color: 'black' }} readOnly value={item.comment} onClick={() => this.edit(item.userBean.email)} type="text" className="form-control" placeholder="Designation" />

                                    </div>
                                </div>

                            )
                        }
                        )}
                        {commentBean.filter(item => this.state.email === item.userBean.email).map(item => {
                            return (
                                <div>
                                    <label className="mb-0" style={{ color: 'black', fontSize: '15' }}>{item.userBean.employeeName}</label>
                                    <div className="input-group mb-2">

                                        <textarea style={{ color: 'black' }} onChange={(e) => this.setState({ updateComment: e.target.value })} value={this.state.updateComment} onClick={() => this.edit(item.userBean.email)} type="text" className="form-control" placeholder={item.comment} />
                                    </div>
                                    <Link className="edit" onClick={() => this.updateComment(item)}>save</Link>
                                    &nbsp;&nbsp; <Link className="edit" onClick={() => this.deleteComment(item.commentId)}>delete</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                    {this.state.edit?
                    <div>
                    <div className="input-group mb-2">
                        <textarea style={{ color: 'black' }} type="text" className="form-control" placeholder="Add a Comment"
                            onChange={(e) => this.setState({ comment: e.target.value })} value={this.state.comment} />  </div>
                    <Button onClick={() => this.addComment()} >save</Button></div>:<div> <br/> <Button onClick={() => this.updateTask()} style={{marginRight:"62px"}} >save</Button>
                    <Button onClick={() => this.cancle()} >Cancel</Button>
                    </div>}
                </div>
            </div>
        )
    }
}



