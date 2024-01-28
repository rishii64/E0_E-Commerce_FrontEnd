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
      axios.get(`http://localhost:4000/product/${category}/${id}`)
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
    <div>
      { loading ? <p>Loading...</p> :
        <div className="readProduct">
          {products.map((item, index) => {
            return (
              <div className='viewProduct' key={index}>
                <img src={item.images.LinkOne} alt='not found' />
                <div className="productDetails">
                    <h2>{item.title}</h2>
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
