import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import logo from './ushop.png'
import Home from '../Routes/Home'
import ProductPage from '../Routes/ProductPage'
import ReadProducts from '../Routes/ReadProducts'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import CartItems from './CartItems'
import SuccessPage from './Payment_Integration/SuccessPage'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { UserLogOut } from '../Redux/Slice'
export default function HomeCompo() {
    const navigate = useNavigate()
    const { Authorized } = useSelector(state => state.App)
    const imageClick = () => navigate('/')
    const dispatch = useDispatch();
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
                    {
                        Authorized ? <i title='Log Out' className="fa-solid fa-right-from-bracket LogOutIconButton" onClick={()=>dispatch(UserLogOut())}></i> : <div className='profile' onClick={() => navigate('/user/register')}>
                            <i className="fa-regular fa-user"></i>
                        </div>
                    }
                    <div className='shopping' onClick={() => navigate('/cart')}>
                        <i title='Cart' className="fa-solid fa-bag-shopping"></i>
                    </div>
                </div>
            </div>
            <Navbar />
            <Routes>
                <Route path='/user/register' element={<Register />} />
                <Route path='/user/login' element={<Login />} />
                <Route path='/cart' element={<CartItems />} />
                <Route path='/payment/success' element={<SuccessPage />} />
                <Route path='/' element={<Home />} />
                <Route path='/products/:category' element={<ProductPage />} />
                <Route path='/product/:category/:id' element={<ReadProducts />} />
            </Routes>
            <Footer />
        </>
    )
}
