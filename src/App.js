import React from 'react';
import './paper.css'
import './App.css'
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap';
import Line from 'rc-progress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.list = [];
    this.state.number = 0;
    this.state.newItem = "";
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  getlist(item) {
    let items = [];
    this.state.list.map((item, i) => items.push(

      <div className="class">
        <li onClick={() => { this.setStatus(item) }} className={item.status ? "paper-btn btn-block btn-success" : "paper-btn btn-block"}>{item.name}{item.date}</li>
        <button onClick={() => this.moveUp(i)} className="flex sm-0.5 col btn-warning" >up</button>
        <button onClick={() => this.moveDown(i)} className="flex sm-0.5 col btn-secondary">down</button>
        <button onClick={() => this.removeItem(i)} className="flex sm-0.5 col btn-danger"> X </button>
      </div>))
    return items;
  }

  setStatus(item) {
    let l = this.state.list;
    let i = l.indexOf(item)
    l[i].status = !l[i].status

    axios.put("http://localhost:8080/task2/" + l[i]._id, l[i]).then((res) => {
      console.log(res.data);
    })



    this.setState(
      { list: l }
    )


    let count = this.state.number;
    if (this.state.list[i].status) {
      count++;
      this.setState(
        { number: count }
      )
    }
    else {
      count--;
      this.setState(
        { number: count }
      )
    }
  }



  getValue(e) {
    // console.log(e.target.value)
    this.setState(
      { newItem: e.target.value }
    )
    // console.log("newitem", this.state.newItem);

  }

  setValue(e) {
    console.log("newitem inside set", this.state.newItem);

    if (this.state.newItem.trim()) {
      let l = this.state.list;
      let d = new Date()
      let obj = { name: this.state.newItem, status: false, date: d.toLocaleDateString() }

      axios.post("http://localhost:8080/task", obj)
        .then((res) => {
          console.log(res.data);
          this.getData();
        })
    }
  }

  keyPress = (e) => {
    if (e.keyCode === 13) {
      this.setValue();
    }
  }

  moveUp = (i) => {
    // console.log("move up");
    let x = this.state.list;
    console.log(i);
    if (i !== 0)
      [x[i], x[i - 1]] = [x[i - 1], x[i]]
    console.log(x);
    this.setState({
      list: x
    })

  }


  moveDown = (i) => {
    let x = this.state.list;
    console.log(i);
    if (i !== 0)
      [x[i], x[i + 1]] = [x[i + 1], x[i]]
    console.log(x);
    this.setState({
      list: x
    })

  }

  removeItem(i) {
    let count = this.state.number;
    if (this.state.list[i].status)
      count--;
    this.setState(
      { number: count }
    )
    let x = this.state.list.slice(0);
    axios.delete("http://localhost:8080/task3/" + x[i]._id).then((res) => {
      console.log("delete");
      console.log(res.data);
      this.getData()
    })
  }

  componentDidMount() {
    this.getData()
  }
  getData() {
    axios.get("http://localhost:8080/task1")
      .then((res) => {
        this.setState({
          list: res.data,
          newItem:""
        })
      })
  }

  render() {
    // let x=(this.count()/this.state.list.length)*100;
    // let n = x.toFixed(0)
    return (
      <div>
        <h1 className="row flex-center">Dymanic List</h1>

        <div class="progress margin-bottom">
          <div className={"bar striped secondary w-"+((this.state.number / this.state.list.length )* 100).toFixed(0)}>{((this.state.number / this.state.list.length )* 100).toFixed(0)}%</div>
        </div>
       
        <div className="row flex-right">
          <input type="text" className="sm-6 col" onChange={this.getValue} onKeyDown={this.keyPress} value={this.state.newItem}></input>
          <button onClick={this.setValue} className="sm-6 col btn-secondary "> Add Item
          </button>

        </div>
        <h4 className="row flex-center"> length:{this.state.number}/{this.state.list.length} </h4>


        <ul className="col">
          {this.getlist()}
        </ul>
      </div>

    )
  }
}

export default List


//syllable
//functions in pyhton