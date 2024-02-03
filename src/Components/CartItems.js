import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeProduct } from '../Redux/Slice'
// import Payment from './Payment_Integration/Payment';
import { checkoutProcess } from '../Redux/Slice';

export default function CartItems() {
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.App)
  const dispatch = useDispatch()
  var totalQuantity = 0
  var totalPrice = 0
  const [checkOut, setCheckout] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('Token:')
    if (!token) {
      navigate('/user/login')
    }
  }, [navigate]);

  // const handleCheckOutClick = (e)=>{
  //   setCheckout(true)
  // }

  const handleIncrement = (id) => {
    dispatch(increaseQuantity({ id }))
  }
  const handleDecrement = (id) => {
    dispatch(decreaseQuantity({ id }))
  }
  const handleRemove = (id) => {
    dispatch(removeProduct(id))
  }
  const handlebuynowClick = (e) => {
    setCheckout(true)
    setTimeout(() => {
      setCheckout(false)
      dispatch(checkoutProcess());
      navigate('/payment/success')
    }, 3000);
  }

  return (
    <div>
      <ToastContainer />
      {
        checkOut ? <div className="loader" /> : <>
          {
            cartItems.length <= 0 ? <div className='emptyCart'><h2 className='emptyCartMessage'>Cart is Empty</h2></div> :
              cartItems.map((item, index) => {
                totalQuantity += item.cartQuantity
                totalPrice += item.Dprice * item.cartQuantity
                return (
                  <div className="cartProducts" key={index}>
                    <img className='cartImg' src={item.images.LinkOne} alt="" />

                    <div className="prodDetails">
                      <h2 className='cartTitle'>{item.title.slice(0, 30)}</h2>
                      <p> ₹{item.Dprice}</p>
                      <div>
                        <button className='btnDecrement' onClick={() => handleDecrement(item.id)}>-</button>
                        <span> {item.cartQuantity} </span>
                        <button className='btnIncrement' onClick={() => handleIncrement(item.id)}>+</button>
                      </div>
                      <button className='btnRemove' onClick={() => handleRemove(item.id)}>
                        <p class="button__text">Remove</p>
                        <span class="button__icon"><i className="fa-solid fa-x" style={{ color: "white", }} /></span>
                      </button>
                    </div>
                  </div>
                )
              }
            )
          }
          {
            cartItems.length > 0 && <div className="priceDetails">
              <span>Price: ₹{totalPrice}</span>
              <span>Discount: 0 %</span>
              <span>Shipping: Free</span>
              <span>Total Price: ₹ {totalQuantity * totalPrice}</span>
              {/* <button onClick={handleCheckOutClick}>CheckOut</button> */}
              <button className='btnBuyNow' onClick={handlebuynowClick}>Buy Now <i className="fa-solid fa-credit-card" /></button>
            </div>
          }
        </>
      }
    </div>
  )
}

