import { stickyCri, stickyHigh, stickyMedium, stickyLow } from "./Sticky";

    export const HomePageCards = () => {

    <div className="col-md-8">
    <div id="card" >
        <div class=" card-body ">
            <div className="container-fluid">
                <center>
                    <div className="row container">
                        <div className="col-lg-4 col-md-3 col-sm-3" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                            <div className="col-auto">
                                {/* ToDo */}
                                <div id="card bg-default head" >
                                    <h5 id="card-header" className="card-header header">
                                        <center className="letter" >TODO</center>
                                    </h5>
                                </div>
                                <div className=" card-body cards">
                                    {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                        return (
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
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
                        <div className="col-lg-4 col-md-3 col-sm-4 col-3" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                            <div className="col-auto">
                                <div id="card bg-default head" >
                                    <h5 id="card-header" className="card-header header">
                                        <center className="letter" > IN PROGRESS </center>
                                    </h5>
                                </div>
                                <div className="card-body cards">
                                    {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                        return (
                                            <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
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

                        <div className="col-lg-4 col-md-3 col-sm-3" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                            <div className="col-auto">
                                <div id="card bg-default head" >
                                    <h5 id="card-header" className="card-header header">
                                        <center className="letter"> BLOCKED </center>
                                    </h5>
                                </div>
                                <div className=" card-body cards">
                                    {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                        return (
                                            <div className="col-auto"
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
                                            <div className="col-auto"
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
                                            <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
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
                                            <div className="col-auto"
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



                    </div>
                    {/*End Of blocked */}
                </center>

            </div>
        </div>
    </div>
</div>
}