import React, { Component } from 'react'

export default class item extends Component {
    handleChange = () => {
        this.props.compChange(this.props.id)
    }
    //避免多次渲染
    shouldComponentUpdate(a,b){
        // console.log(a,b)
        return a.completed!==this.props.completed
    }
    
    render() {
        // console.log(11)
        return (
            <div>
                <input type="checkbox" checked={this.props.completed} onChange={this.handleChange} />
                {this.props.title}{this.props.completed ? "完成" : "未完成"}
            </div>
        )
    }
}
