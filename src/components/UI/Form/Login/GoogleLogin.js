import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

function GoogleLogin (props) {
    const logoutHandler = () => {
        props.onLogout()
        props.history.push('/public')
    }

    const loginHandler = () => {
        props.onLogin()
        props.history.push('/')
    }

    return (
        <div>
            google login
            {props.user[1] && props.user[1].user ? 
                <button onClick={logoutHandler}>Logout</button>
            :
                <button onClick={loginHandler}>Log in</button>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actions.login()),
        onLogout: () => dispatch(actions.logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin)
