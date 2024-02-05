import React, { useState } from 'react'
import { Route, Routes, useNavigate, Link } from 'react-router-dom'
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
import { UserLogOut } from '../Redux/Slice';
import axios from 'axios';

export default function HomeCompo() {
    const navigate = useNavigate()
    const { Authorized } = useSelector(state => state.App)
    const imageClick = () => navigate('/')
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [loading, SetLoading] = useState(false)

    const handleSearchClick = (e) => {
        SetLoading(true)
        axios.get(`https://e-commerce-backend-w7x2.onrender.com/search/${input}`).then((response) => {
            setData(response.data);
            SetLoading(false)
        })
    }
    const handleSearchItemClick = () => {
        setData([])
    }
    return (
        <>
            <header className='header'>
                <div className="headerLeft">
                    <img onClick={imageClick} className='siteLogo' src={logo} alt='uShop' />
                </div>
                <div className='headerRight'>
                    <div className='searchBox'>
                        <input className='search' type='text' placeholder='search products' onChange={(e) => setInput(e.target.value)} value={input} />
                        <i className="fa-solid fa-magnifying-glass searchIcon" onClick={handleSearchClick}></i>
                    </div>
                    {
                        Authorized ? <i title='Log Out' className="fa-solid fa-right-from-bracket LogOutIconButton" onClick={() => dispatch(UserLogOut())}></i> : <div className='profile' onClick={() => navigate('/user/register')}>
                            <i className="fa-regular fa-user"></i>
                        </div>
                    }
                    <div className='shopping' onClick={() => navigate('/cart')}>
                        <i className="fa-solid fa-cart-shopping" />
                    </div>
                </div>

                {
                    data.length > 0 && <div className="searchItemContainer">
                        {
                            loading ? <div className="loader" /> : <>
                                {
                                    data.map((item) => {
                                        return <p key={item.id} className='SearchList__Item'><Link to={`/product/${item.category}/${item.id}`} onClick={()=>handleSearchItemClick()}>{item.title.slice(0, 50)}</Link></p>
                                    })
                                }
                            </>
                        }
                    </div>
                }
            </header>
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
