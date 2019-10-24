import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

class Header extends Component {
    
    componentDidMount() {
        
    }

    render() {
        let authLink = ''

        if (!this.props.auth[1]) {
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)