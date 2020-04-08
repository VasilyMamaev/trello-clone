import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">Login</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Home page</Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header
