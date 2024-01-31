import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import logo from './ushop.png'
import Home from '../Routes/Home'
import ProductPage from '../Routes/ProductPage'
import ReadProducts from '../Routes/ReadProducts'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import AddToCart from './AddToCart'

export default function HomeCompo() {
    const navigate = useNavigate()
    const imageClick = () => navigate('/')
    return (
        <>
            <div className='header'>
                <div className="headerLeft">
                    <img onClick={imageClick} className='siteLogo' src={logo} alt='uShop' />
                </div>
                <div className='headerRight'>
                    <div className='searchBox'>
                        <input className='search' type='text' placeholder='search products'></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className='profile' onClick={() => navigate('/register')}>
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div className='shopping' onClick={() => navigate('/addToCart')}>
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
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/addToCart' element={<AddToCart />} />
                <Route path='/' element={<Home />} />
                <Route path='/products/:category' element={<ProductPage />} />
                <Route path='/product/:category/:id' element={<ReadProducts />} />
            </Routes>
            <Footer />
        </>
    )
}