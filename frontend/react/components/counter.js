import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserInfo, login} from '../../redux/actions'

class Counter extends Component {

    reset = () => {
        const {dispatch} = this.props
        dispatch(getUserInfo(47))
    }
    login = () => {
        const {dispatch} = this.props
        dispatch(login({username: 'omid', password: 'salam'}))
    }

    render() {
        const {userInfo} = this.props
        return (
            <div>
                <span>{userInfo ? JSON.stringify(userInfo) : 'no data'}</span>
                <button onClick={this.login}>login</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {userInfo} = state
    return {userInfo}
}

export default connect(mapStateToProps)(Counter)