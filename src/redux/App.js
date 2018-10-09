import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'

const reducer = (
    state = {
        todos: []
    }, 
    action
) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.value,
                ]
            }
            break;
        case "DELETE_TODO":
            let newTodos = state.todos.filter((todo, index) => {
                return index !== action.payload.value
            })
            return {
                ...state,
                todos: newTodos,
            }
        default:
            return state
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        title: 'Big Title'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (thingToDO) => {
            dispatch((dispatch) => {
                setTimeout(() => {
                    dispatch({
                        type: "ADD_TODO",
                        payload: {
                            value: thingToDO,
                        }
                    })
                }, 2000);
            })
            // return dispatch({
            //     type: "ADD_TODO",
            //     payload: {
            //         value: thingToDO,
            //     }
            // })
        },
        delete: (index) => {
            return dispatch({
                type: "DELETE_TODO",
                payload: {
                    value: index
                }
            })
        },
    }
}

class TodoList extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>{this.props.title}</h1>
                {

                    this.props.todos.map((todo, index) => {
                        return (
                            <div key={`todoitem-${index}`}>
                                <div>{`todo ${index + 1}`}</div>
                                <button type="button" onClick={
                                    (event) => {
                                        this.props.delete(index)
                                    }
                                }>Delete</button>
                            </div>
                        )
                    })
                }
                <button type="button" onClick={
                    (event) => {
                        this.props.addTodo("Newly added")
                    }
                }>Add todo</button>
            </React.Fragment>
        );
    }
}

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <TodoListContainer/>
            </Provider>
        );
    }
}

export default App;