import React, { Component, createRef } from 'react'

export default class index extends Component {
    constructor() {
        super()

        this.state = {
            inputV: 'xxx'
        }

        this.inputDom = createRef()
    }
    onChangeE = (e) => {
        // console.log(e.currentTarget)
        this.setState({
            inputV: e.currentTarget.value
        })
    }
    handleClick = () => {
        this.props.addTodo(this.state.inputV)
        this.setState(
            () => {
                return {
                    inputV: ''
                }
            },
            () => {
                this.inputDom.current.focus()
            }
        )
    }
    render() {
        return (
            <div>
                <input type="text" ref={this.inputDom} onChange={this.onChangeE} value={this.state.inputV} /><button onClick={this.handleClick}>{this.props.btnText}</button>
            </div>
        )
    }
}
