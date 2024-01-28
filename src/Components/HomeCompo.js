import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import logo from './ushop.png'
import Home from '../Routes/Home'
import ProductPage from '../Routes/ProductPage'
import ReadProducts from '../Routes/ReadProducts'
import Footer from './Footer'
export default function HomeCompo() {
    const navigate = useNavigate()
    const imageClick = ()=> navigate('/home')
    return (
        <>
            <div className='header'>
                <div className="headerleft">
                {/* <select className='language'>
                    <option value='ENG'>Eng</option>
                    <option value='HIN'>HIN</option>
                    <option value='BEN'>BEN</option>
                    <option value='TML'>TML</option>
                    <option value='KND'>KND</option>
                </select> */}
                    <img onClick={imageClick} className='siteLogo' src={logo} alt='uShop' />
                </div>
                <div className='headerRight'>
                    <div className='searchBox'>
                        <input className='search' type='text' placeholder='search products'></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className='profile'>
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div className='shopping'>
                        <i className="fa-solid fa-bag-shopping"></i>
                    </div>
                </div>
            </div>
            <h1 className='title'><span>u</span>Shop</h1>
                <nav>
                    <NavLink className='homePageLink' to='/'>Home</NavLink>
                    <NavLink className='homePageLink' to='/products/mobile'>Mobile</NavLink>
                    <NavLink className='homePageLink' to='/products/laptop'>Laptop</NavLink>
                    <NavLink className='homePageLink' to='/products/camera'>Camera</NavLink>
                    <NavLink className='homePageLink' to='/products/headphone'>Headphone</NavLink>
                </nav>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products/:category' element={<ProductPage />} />
                    <Route path='/product/:category/:id' element={<ReadProducts />} />
                </Routes>
            <Footer/>
        </>
    )
}