import React, { Component, Fragment } from 'react'//Fragment空标签，不会在页面生成

import {
    TodoHeader,
    TodoInput,
    TodoList,
    Like
} from './components'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            title: '头部',
            slot: '哈哈',
            btnText: '添加',
            todos: [{
                id: 1,
                name: 'jack',
                isComp: true
            }, {
                id: 2,
                name: 'fang',
                isComp: false
            }]
        }
    }
    addTodo = (pa) => {
        // console.log(pa)
        this.setState({
            todos: this.state.todos.concat({
                id: Math.random(),
                name: pa,
                isComp: false
            })
        })
    }
    compChange = (pa) => {
        this.setState({
            todos: this.state.todos.map(v => {
                if (v.id === pa) {
                    v.isComp = !v.isComp
                }
                return v
            })
        })
        // this.setState((prevState) => {
        //     return {
        //         todos: prevState.todos.map(v => {
        //             if (v.id === pa) {
        //                 v.isComp = !v.isComp
        //             }
        //             return v
        //         })
        //     }
        // }

        // )
    }
    render() {
        return (
            <Fragment>
                <TodoHeader title={this.state.title}>
                    {this.state.slot}
                </TodoHeader>

                <TodoInput btnText={this.state.btnText} addTodo={this.addTodo} />

                <TodoList todos={this.state.todos} compChange={this.compChange} />

                <Like />
            </Fragment>
        )
    }
}
