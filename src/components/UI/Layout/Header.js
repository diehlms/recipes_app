import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className="Header">
            <h1><Link to='/'>Recipes</Link></h1>
            <ul>
                <Link to='login'>Login</Link>
            </ul>
        </div>
    )
}
