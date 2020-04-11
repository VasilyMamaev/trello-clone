import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <nav className="header-wrapper">
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">Home</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Login</Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header
