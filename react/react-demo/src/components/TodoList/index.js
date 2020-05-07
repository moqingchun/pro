import React, { Component } from 'react'
import Item from './item'

export default class index extends Component {
    render() {
        return (
            <div>
                {
                    this.props.todos.map(item => {
                        return <Item compChange={this.props.compChange} key={item.id} {...item} />
                    })
                }
            </div>
        )
    }
}
