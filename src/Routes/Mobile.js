import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Mobile() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:4000/store')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
  },[])
  return (
    <div className='products'>
      {loading ? <p>Loading...</p> :
        <>
          {data.filter((item) => item.category === 'mobile').map((item, id) => {
            return (
              <div className='productData' key={id}>
                <img className='mobileImg' src={item.images.LinkOne} alt={item.title} />
                <h3 className='productTitle'><code>{item.title}</code></h3>
              </div>
            )
          })}</>}
    </div>
  )
}
