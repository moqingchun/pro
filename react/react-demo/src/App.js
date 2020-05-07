import React, { Component, Fragment } from 'react'//Fragment空标签，不会在页面生成

import {
    TodoHeader,
    TodoInput,
    TodoList
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
    render() {
        return (
            <Fragment>
                <TodoHeader title={this.state.title}>
                    {this.state.slot}
                </TodoHeader>
                <TodoInput btnText={this.state.btnText} />
                <TodoList todos={this.state.todos} />
            </Fragment>
        )
    }
}
