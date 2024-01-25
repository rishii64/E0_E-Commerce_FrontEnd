import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from '../Routes/Home'
import Mobile from '../Routes/Mobile'
import Laptop from '../Routes/Laptop'
import Camera from '../Routes/Camera'
import Headphone from '../Routes/Headphone'

export default function HomeCompo() {
    return (
        <>
            <div className='header'>
                <select className='language'>
                    <option value='ENG'>Eng</option>
                    <option value='HIN'>HIN</option>
                    <option value='BEN'>BEN</option>
                    <option value='TML'>TML</option>
                    <option value='KND'>KND</option>
                </select>
                <div className='headerRight'>
                    <div className='searchBox'>
                        <input className='search' type='text' placeholder='search products'></input>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className='profile'>
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div className='shopping'>
                        <i class="fa-solid fa-bag-shopping"></i>
                    </div>
                </div>
            </div>
            <h1 className='title'><span>u</span>Shop</h1>
            <BrowserRouter>
                <nav>
                    <NavLink className='homePageLink' to='/home'>Home</NavLink>
                    <NavLink className='homePageLink' to='/mobiles'>Mobile</NavLink>
                    <NavLink className='homePageLink' to='/laptops'>Laptop</NavLink>
                    <NavLink className='homePageLink' to='/cameras'>Camera</NavLink>
                    <NavLink className='homePageLink' to='/headphones'>Headphone</NavLink>
                </nav>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/mobiles' element={<Mobile />} />
                    <Route path='/laptops' element={<Laptop />} />
                    <Route path='/cameras' element={<Camera />} />
                    <Route path='/headphones' element={<Headphone/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}