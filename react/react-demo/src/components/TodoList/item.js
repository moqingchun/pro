import React, { Component } from 'react'

export default class item extends Component {
    render() {
        return (
            <div>
                {this.props.name}{this.props.isComp ? "完成" : "未完成"}
            </div>
        )
    }
}
