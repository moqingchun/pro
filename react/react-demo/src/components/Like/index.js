import React, { Component } from 'react'

export default class index extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false
        }
    }
    handleClick = ()=>{
        this.setState({
            isLiked:!this.state.isLiked
        })
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                {
                    this.state.isLiked ? '❤️取消' : '🖤点赞'
                }
            </div>
        )
    }
}
