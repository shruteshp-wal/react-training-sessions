import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import Counter from './Counter';
import axios from 'axios';



class UserList extends Component {
  render() {
    return (
      <div>
        {this.props.input.map((user, index) => {
          return (
            <div key={`user_${index}`}>{`Hello! ${user.fn} ${user.ln}`}</div>
          )
        })}
      </div>
    )
  }
}


class App1 extends Component {

  constructor(props){
    super(props)

    this.addUser = this.addUser.bind(this)

    this.state = {
      users: [
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "`df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
      ]
    }
  }

  componentDidMount() {
    console.log("App Mounted");
  }


  addUser() {
    console.log("Trying to modify input");

    this.setState({
      users: this.state.users.concat([
        {fn: "Mr", ln: "Surprise"}
      ]),
    })
  }

  render() {
    console.log("App Rendered");
    return (
      <React.Fragment>
        <UserList input={this.state.users} />
        <button type="button" onClick={this.addUser}>Add user</button>
      </React.Fragment>
    )
  }
}


class App2 extends Component {
  constructor(props) {
    super(props);

    this.updateInterval = null;

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      this.props.onInterval()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  handleCheckboxChange(event) {
    this.props.onCheckboxChange(event)

    // TODO: event.stopPropagation()
    // TODO: event.preventDefault()
  }

  render() {
    return (
      <React.Fragment>
        <input type="checkbox" value={this.props.shouldDisplayTime} onChange={this.handleCheckboxChange}/>
        {
          this.props.shouldDisplayTime ? (
            <TimeDisplay time={this.props.time}/>
          ) : (
            <p>Please check the box to display time</p>
          )
        }
      </React.Fragment>
    );
  }
}

function TimeDisplay(props) {
  return <p>{props.time.toLocaleString()}</p>
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showSearchInput: false,
      time: new Date(),
      shouldDisplayTime: true,
    };

    this.showSearch = this.showSearch.bind(this)
    this.hideSearch = this.hideSearch.bind(this)
    this.handleInterval = this.handleInterval.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

  }

  showSearch() {
    this.setState({
      showSearchInput: true,
    })
  }

  hideSearch() {
    this.setState({
      showSearchInput: false,
    })
  }

  handleInterval(){
    this.setState({
      time: new Date()
    })
  }

  handleCheckboxChange(event) {
    this.setState({
      shouldDisplayTime: event.target.checked
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.showSearchInput ? <Search inputValue={this.state.time.toLocaleString()} onClose={this.hideSearch}/> : <button type="button" onClick={this.showSearch}>Search</button>
        }
        <App2
          shouldDisplayTime={this.state.shouldDisplayTime}
          time={this.state.time}
          onInterval={this.handleInterval}
          onCheckboxChange={this.handleCheckboxChange}
        />
      </React.Fragment>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {  };

    this.inputElement = null;
  }

  componentDidMount(){
    this.inputElement.focus()
  }
  

  render() {
    return (
      <React.Fragment>
        <input type="text" value={this.props.inputValue} ref={(htmlNode) => {
          this.inputElement = htmlNode;
        }}/>
        <button type="button" onClick={this.props.onClose}>close</button>
      </React.Fragment>
    );
  }
}

export default App1;
