import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }


    render() {
        return (
            <div>
                <h1>{this.props.todoData.body}</h1>
                {
                    this.props.todoData.createdAt ? <span>{this.props.todoData.createdAt.toLocaleString()}</span> : null
                }
                
            </div>
        );
    }
}

class CreateTodoForm extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            body: ""
        }

        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBodyChange(event){
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        // Somehow we will have to tell the APP component to add this todo
        this.props.addTodo(Object.assign({}, this.state));
        this.setState({
            body: ""
        });
    }

    render() {
        return (
            
            <div>
                <Todo todoData={this.state}/>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleBodyChange} value={this.state.body} />
                    <button type="submit" onClick={this.handleSubmit}>Add TODO</button>
                </form>
            </div>
        );
    }
}


class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }


    render() {
        return (
            <div>
                {
                    this.props.todos.map((note, index)=>{
                        return <Todo todoData={note} key={index}/>
                    })
                }
                <CreateTodoForm addTodo={this.props.addTodo}/>
            </div>
        );
    }
}

export default TodoApp;
