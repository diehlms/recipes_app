import React, { Component } from 'react'
import firebase, { authRef, provider } from '../../../../firebase'
import { auth } from 'firebase';
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

export class GoogleLogin extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        this.props.onCheckAuthState()
    }

    render() {
        return (
            <div>
                google login
                {this.props.user ? 
                    <button onClick={() => this.props.onLogout()}>Logout</button>
                :
                    <button onClick={() => this.props.onLogin()}>Log in</button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actions.login()),
        onLogout: () => dispatch(actions.logout()),
        onCheckAuthState: () => dispatch(actions.checkAuthState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin)
