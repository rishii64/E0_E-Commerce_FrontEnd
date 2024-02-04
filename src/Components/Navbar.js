import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <h1 className='title'><span>u</span>Shop</h1>
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <button className="menu-btn">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar1"></span>
          </button>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li><NavLink className='homePageLink' to='/'>Home</NavLink></li>
            <li><NavLink className='homePageLink' to='/products/mobile'>Mobile</NavLink></li>
            <li><NavLink className='homePageLink' to='/products/laptop'>Laptop</NavLink></li>
            <li><NavLink className='homePageLink' to='/products/camera'>Camera</NavLink></li>
            <li><NavLink className='homePageLink' to='/products/headphone'>Headphone</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

