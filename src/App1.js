import React from 'react';
import './paper.css'
import './App.css'
import axios from 'axios';


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
      let obj = { title: this.state.newItem, status: false, date: d.toLocaleDateString() }


      l.push(obj);
      this.setState(
        { list: l, newItem: "" }
      )
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
    x.splice(i, 1)
    this.setState({
      list: x

    })

  }
  componentDidMount() {
    axios.get("http://localhost:8080/tasks")
      .then((res) => {
        this.setState({
          list: res.data
        })
      })
  }

  render() {
    return (
      <div>
        <h1 className="row flex-center">Dymanic List</h1>

        <div>
          <h4 className="row flex-center">Progress Bar</h4>
          <div className="progress margin-bottom sm-5 md-5 row flex-center"></div>
          <div classNme={"bar w-" + (this.state.number / this.state.list.lenght * 100)}></div>

        </div>
        <div className="row flex-right">
          <input type="text" className="sm-6 col" onChange={this.getValue} onKeyDown={this.keyPress} value={this.state.newItem}></input>
          <button onClick={this.setValue} className="sm-6 col btn-secondary "> Add Item </button>
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