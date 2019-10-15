import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../../store/actions/index'

export class Login extends Component {
    state = {
        username: '',
        password: '',
        isSignup: true
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        let form = null
        let errorMessage = null
        let authRedirect = null

        if (this.props.loading) {
            form = 'loading'
        } else {
            form = (
                <form onSubmit={this.submitHandler}>
                    <div>
                        <p>Email:</p>
                        <input 
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeHandler}
                            placeholder="email"/>
                    </div>
                    <div>
                        <p>Password:</p>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                            placeholder="password"
                        />
                    </div>
                    <div>
                        <input type="submit"></input>
                    </div>
                    <div>
                        <button clicked={this.switchAuthModeHandler}>
                            switch to {this.state.isSignup ? 'sign in' : 'sign up'}
                        </button>
                    </div>
                </form>
            )
        }

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        return (
            <div>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
