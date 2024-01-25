import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Headphone() {
  const [data, setData] = useState([])
  // const [loading, setLoading] = useState('')
  useEffect(() => {
    axios.get('http://localhost:4000/store')
      .then((response) => {
        setData(response.data)
      })
  })
  return (
    <div className='products'>
      {data.filter((item) => item.category === 'headphone').map((item, id) => {
        return (
          <div className='productData' key={id}>
            <img className='headphoneImg' src={item.images.LinkOne} alt={item.title}/>
            <h3 className='productTitle'><code>{item.title.slice(0,30)}</code></h3>
          </div>
        )
      })}
    </div>
  )
}
