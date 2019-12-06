<div id="page-container"  >

<div className="w-100" style={{ marginLeft: '50%', marginRight: 'auto' }}>
    <PropagateLoader css={this.override} size={10} color={'#123abc'} loading={this.state.loading} />
</div>
<ToastContainer />


<div id="content-wrap" >
    {/*  popUp */}
    <Modal centered size="md" show={this.state.show} onHide={this.handleClose.bind(this)}  >
        <Modal.Header closeButton>
            <Modal.Title>
                <div className="" style={{ color: '#808080' }}>Subject - <span style={{ color: 'black' }}> {this.state.taskBean.subject} </span></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label className="mb-0" style={{ color: '#808080' }}>Description</label>
            <div className="input-group mb-2">
                <textarea style={{ color: 'black' }} value={this.state.taskBean.description} type="text" className="form-control" placeholder="Designation" readOnly />  </div>
            <label className="mb-0" style={{ color: '#808080' }}>Assigned By</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend ">
                    <label className="input-group-text "><i className="fas fa-at" /></label>
                </div>
                <input type="text" value={this.state.user.email} style={{ color: 'black' }} className="form-control" placeholder="Designation" readOnly /></div>
            <label className="mb-0" style={{ color: '#808080' }}>Assigned On</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                </div>

                <input type="text" style={{ color: 'black' }}
                    value={moment(this.state.taskBean.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
            <label className="mb-0" style={{ color: '#808080' }}>Deadline</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i className="far fa-calendar-alt" /></label>
                </div>

                <input type="text" style={{ color: 'black' }}
                    value={moment(this.state.taskBean.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
            <label className="mb-0" style={{ color: '#808080' }}>Priority</label>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <label className="input-group-text"><i class="fas fa-tasks"></i></label>

                </div>
                {console.log("prio", this.state.taskBean.priority)}
                <input type="text" style={{ color: 'black' }}
                    value={this.state.taskBean.priority} className="form-control" readOnly /> </div>
        </Modal.Body>
        <Modal.Footer style={{ color: 'red' }} className=" justify-content-center" >
            Number of days : {moment(this.state.taskBean.endDate).diff(moment(this.state.taskBean.assignDate), 'days')}
        </Modal.Footer>
    </Modal>
    {/* end of taskBean */}
   
    <div class="container-fluid">
                <div class="row">
            <div className="col-md-12">
                <div className="row">
                               {localStorage.getItem("groupId")?<Architectproject/> :<SideNavBar/>} 
                               <div class="col-md-8 col-sm-12">
                               <div class="row">

                               {localStorage.getItem('groupId')?<div className="projectName"><Link style={{color:'black'}} onClick={()=>{this.props.history.push('/homePage')}} className="dark">Project</Link>&nbsp;/&nbsp;
                                            <Link style={{color:'black'}} to='/taskPage'>{localStorage.getItem("projectName")}</Link></div>:null} 
                                            <div class="col-md-4 col-sm-12" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                                            <div class="card">
                                                    {/* ToDo */}
                                                    <div id="card-head head" >
                                                        <h5 id="card-header" className="card-header header">
                                                            <center className="letter" >TODO</center>
                                                        </h5>
                                                    </div>
                                                    <div className=" card-body cards">
                                                        {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)}  className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyCri(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'high').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyHigh(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'medium').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyMedium(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.todo.filter(item => item.priority === 'low').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyLow(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End of  ToDo */}
                                            {/* onProgress */}
                                            <div className="col-sm-4" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                                                <div className="col-auto">
                                                    <div id="card bg-default head" >
                                                        <h5 id="card-header" className="card-header header">
                                                            <center className="letter" > IN PROGRESS </center>
                                                        </h5>
                                                    </div>
                                                    <div className="card-body cards">
                                                        {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>

                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyCri(item)}
                                                                    <div class="container-fluid">
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.onProgress.filter(item => item.priority === 'high').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyHigh(item)}
                                                                    <div class="container-fluid">
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.onProgress.filter(item => item.priority === 'medium').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>

                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyMedium(item)}
                                                                    <div class="container-fluid">
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.onProgress.filter(item => (item.priority === 'low')).map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >

                                                                    <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                                        <i class="far fa-check-circle"></i></div>
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyLow(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End onProgress */}
                                            {/* blocked */}

                                            <div className="col-sm-4" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                                                <div className="col-auto">
                                                    <div id="card bg-default head" >
                                                        <h5 id="card-header" className="card-header header">
                                                            <center className="letter"> BLOCKED </center>
                                                        </h5>
                                                    </div>
                                                    <div className=" card-body cards">
                                                        {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                                            return (
                                                                <div  onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)} >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyCri(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'high').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyHigh(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'medium').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >
                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyMedium(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                        {this.state.blocked.filter(item => item.priority === 'low').map(item => {
                                                            return (
                                                                <div onClick={() => this.showData(item, item.userBean)} className="col-auto"
                                                                    onDragEnd={() => this.update(item.taskId, item.status)}
                                                                >

                                                                    <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                                        <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                                    </div>
                                                                    {stickyLow(item)}
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>


                                        {/*End Of blocked */}

                        </div>
                    </div>
</div>
</div>
                    <div className="col-lg-2 " >
                        <div className="col-md-12">
                            <div className="row">

{this.state.showData?
<div>

<TaskInfo  taskBean={this.state.taskBean} user={this.state.user} showUpadtaed={()=>this.getData()} comment={this.getCommentData.bind()} commentBean={this.state.commentBean}  />
 </div>
:null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   
</div>
<div> <Footer style={{}}/></div>
</div>