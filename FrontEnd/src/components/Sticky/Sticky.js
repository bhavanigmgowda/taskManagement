import React, { Component } from 'react';
import Axios from 'axios';
import './Sticky.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export class Stiky extends Component {
  state = {
    tasks: [
      { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "wip", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "skyblue" }
    ]
  }

  constructor(props) {
    super(props)
  }
  onDragStart = (e) => {
    e.preventDefault();
  }
  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  }
  onDragOver = (ev) => {
    ev.preventDefault();
  }


  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    });
  }

  render() {
    var tasks = { wip: [], complete: [] }
    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>);
    });
    return (
      <div className="container-drag">
        <h2 className="header"> HOME PAGE</h2>
        <div className="wip"  onDrop={(e) => { this.onDrop(e, "wip") }}>
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "complete")}>
          <span className="task-header">COMPLETED</span>
          {tasks.complete}
        </div>
      </div>

    );
  }
}

export default Stiky
   /*  <div>

  <div>
    <div class="card-head">
<img src="https://www.thesslstore.com/blog/wp-content/uploads/2017/05/circle-with-i-1.png" className="icon"/>
    </div>
    <div class="card-body">

    </div>
  </div>
</div> */