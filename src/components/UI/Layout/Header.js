import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

class Header extends Component {
    
    componentDidMount() {
        this.props.onCheckAuthState()
    }

    render() {
        let authLink = ''

        let authToken = localStorage.getItem('userId')

        if (!authToken) {
            authLink = (
                <Link to='login'>Login</Link>
            )
        } else {
            authLink = (
                <Link to='logout'>Logout</Link>
            )
        }

        return (
            <div className="Header">
                <h3><Link to='/'>Recipes</Link></h3>
                <ul>
                    {authLink}
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.authCheckState())
    }
}
export default connect(null, mapDispatchToProps)(Header)