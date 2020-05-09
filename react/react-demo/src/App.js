import React, { Component, Fragment } from 'react'//Fragment空标签，不会在页面生成

import {
    TodoHeader,
    TodoInput,
    TodoList,
    Like,
    Cart
} from './components'

import {getTodos} from './services'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            title: '头部',
            slot: '哈哈',
            btnText: '添加',
            loding:false,
            todos: []
        }
    }
    addTodo = (pa) => {
        // console.log(pa)
        this.setState({
            todos: this.state.todos.concat({
                id: Math.random(),
                title: pa,
                completed: false
            })
        })
    }
    compChange = (pa) => {
        this.setState((prevState) => {
            return {
                todos: prevState.todos.map(v => {
                    if (v.id === pa) {
                        v.completed = !v.completed
                    }
                    return v
                })
            }
        })
    }
    getTodo = ()=>{
        this.setState({
            loding:true
        })
        getTodos().
        then(res=>{
            if(res.status === 200){
                this.setState({
                    todos:res.data.slice(0,20)
                })
            }
        }).
        catch(res=>{
            console.log(res)
        }).
        finally(()=>{
            this.setState({
                loding:false
            })
        })
    }
    componentDidMount(){
        this.getTodo()
    }
    render() {
        return (
            <Fragment>
                <TodoHeader title={this.state.title}>
                    {this.state.slot}
                </TodoHeader>

                <TodoInput btnText={this.state.btnText} addTodo={this.addTodo} />

                {
                    this.state.loding ? <div>加载中...</div> :
                    <TodoList todos={this.state.todos} compChange={this.compChange} />
                }

                <Like />
                ==================================购物车=================================
                <Cart />
            </Fragment>
        )
    }
}
