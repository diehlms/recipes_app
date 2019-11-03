import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { connect } from 'react-redux'

class Header extends Component {

    render() {
        let authLink = ''
        if (this.props.user[1] && this.props.user[1].user) {
            authLink = (
                <Link to='logout'>Log Out</Link>
            )
        } else {
            authLink = (
                <Link to='login'>Log In</Link>
            )
        }

        return (
            <div className="Header">
                <h3><Link to='/'>Recipes</Link></h3>
                <ul className="headerLinks">
                    {authLink}
                    <Link to='/about'>About</Link>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, null)(Header)