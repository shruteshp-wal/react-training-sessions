import React, { Component } from 'react';


class Counter extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div>
        Count of TODOS: {this.props.count}
      </div>
    );
  }
}

export default Counter;
