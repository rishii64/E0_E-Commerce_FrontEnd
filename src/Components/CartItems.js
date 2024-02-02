import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { UserLogin, addToCart, increaseQuantity, decreaseQuantity, removeProduct, calculateTotalAmount } from '../Redux/Slice'

export default function CartItems() {
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const { cartItems } = useSelector(state => state.App)
  const dispatch = useDispatch()
  console.log(cartItems);

  useEffect(() => {
    const token = localStorage.getItem('Token:')
    if (!token) {
      navigate('/user/login')
    }
    else {
      axios.get('http://localhost:4000/user/cart')
        .then((res) => {
          setMsg(res.data.msg)
        })
    }
  }, [navigate])
  console.log(msg);

  const handleIncrement = (id) => {
    dispatch(increaseQuantity({ id }))
  }
  const handleDecrement = (id) => {
    dispatch(decreaseQuantity({ id }))
  }
  const handleRemove = (id) => {
    dispatch(removeProduct(id))
  }

  return (
    <div>
      <ToastContainer />

      {
        cartItems.length <= 0 ? <h2 className='emptyCartMessage'>Cart is Empty</h2> :
          cartItems.map((item, index) => {
            return (
              <div className="cartProducts" key={index}>
                <img className='cartImg' src={item.images.LinkOne} alt="" />

                <div className="prodDetails">
                  <h2 className='cartTitle'>{item.title.slice(0, 10)}</h2>
                  <p> ₹{item.Dprice}</p>
                  <span>
                    <button className='btnDecrement' onClick={() => handleDecrement(item.id)}>-</button>
                    <span> {item.cartQuantity}</span>
                    <button className='btnIncrement' onClick={() => handleIncrement(item.id)}>+</button>
                  </span>
                  <button className='remove' onClick={() => handleRemove(item.id)}>Remove</button>
                  <button className='buyNow' >Buy Now</button>
                </div>

                <div className="priceDetails">
                  <span>Price: ₹{item.Dprice * item.cartQuantity}</span>
                  <span>Discount: {item.discountPercentage}%</span>
                  <span>Shipping: Free</span>
                  <span>Total Price: ₹{item.Dprice * item.cartQuantity}</span>
                </div>
              </div>
            )
          }
          )
      }
    </div>
  )
}

