import React, { Component } from 'react'

export default class item extends Component {
    handleChange = () => {
        this.props.compChange(this.props.id)
    }
    //避免多次渲染
    shouldComponentUpdate(a,b){
        // console.log(a,b)
        return a.isComp!==this.props.isComp
    }
    
    render() {
        console.log(11)
        const {
            name, isComp
        } = this.props

        return (
            <div>
                <input type="checkbox" checked={this.props.isComp} onChange={this.handleChange} />
                {name}{isComp ? "完成" : "未完成"}
            </div>
        )
    }
}
