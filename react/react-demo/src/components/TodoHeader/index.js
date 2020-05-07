import React, { Component } from 'react'
import Prop from 'prop-types'

export default class index extends Component {
    static propTypes = {
        title: Prop.string
    }
    static defaultProps = {
        title: '公共头部'
    }

    render() {
        return (
            <div>
                {this.props.title}{this.props.children}
            </div>
        )
    }
}
