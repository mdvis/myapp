import React from 'react';
import { put } from 'redux-saga/effects'
import { connect } from 'react-redux'
import './index.scss'

class FLIP extends React.Component {
    state = {
        list: [111111, 222222]
    }

    componentDidMount(){
        this.updateItemInfo()
        put({ type: 'SHOW_MORE_HOME' })
    }

    listRef = React.createRef()

    updateItemInfo = () => {
        const { listRef } = this
        const listItem = listRef.current.children
        Array.isArray(listItem)
    }

    render(){
        const { list } = this.state
        return (
            <ul ref={this.listRef} className="list">
                {
                    list.map((cur, ind) => (
                        <li key={ind}>
                            <span>{cur}</span>
                            <button>del</button>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default connect(() => ({}), dispatch => ({ dispatch }))(FLIP)
