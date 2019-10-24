import React from 'react'
import { Link } from 'react-router-dom'

export default function Public() {
    return (
        <div>
            <p>Looks like you're not logged in. Please <Link to='login'>log in</Link> to access the features.</p>
        </div>
    )
}
