import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useDispatch } from "react-redux"
import { addToCart } from '../Redux/Slice';

export default function ReadProducts() {
  const { category, id } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('Token:')
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      setLoading(true)
      axios.get(`https://e-commerce-backend-w7x2.onrender.com/product/${category}/${id}`)
        .then(response => {
          setProducts(response.data)
          setLoading(false)
        })
    }
    catch (err) {
      console.error('Error:', err);
    }
  }, [category, id]);

  const handleAddToCartClick = (e, product) => {
    if (token) {
      toast.success('Item added successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(addToCart(product))
    } else {
      toast.error('User Not Logged In', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <Toaster />
      <div className="readProduct">
        {loading ? <div className="loader" /> :
          products.map((item, index) => {
            return (
              <div className='viewProduct' key={index}>
                <img className='prodImg' src={item.images.LinkOne} alt='not found' />
                <div className="productDetails">
                  <h2>{item.title}</h2>
                  <span>{item.rating} <i className="fa-regular fa-star" /></span>
                  <div className="productPrices">
                    <div className="Dprice">₹{item.Dprice}</div>
                    <div className="Aprice">₹{item.Aprice}</div>
                    <div className="discPercent">{item.discountPercentage}% off <i className="fa-solid fa-circle-info"></i></div>
                  </div>

                  <button className='addToCart' type='button' onClick={(e) => handleAddToCartClick(e, item)}>
                    <p className="button__text">Add to cart</p>
                    <span className="button__icon"><i className="fa-solid fa-plus" /></span>
                  </button>

                  <div className="productDesc">Description: {item.description}</div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="moreproducts">
      </div>
    </>
  )
}
