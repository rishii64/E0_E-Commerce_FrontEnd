import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ReadProducts() {
  const { category, id } = useParams()
  // console.log(useParams());
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
  }, [category, id])
  return (
    <>
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
                  <button className='addToCart'><i className="fa-solid fa-cart-shopping" /> Add to cart</button>
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
