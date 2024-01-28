import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const path = useParams().category
    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`http://localhost:4000/products/${path}`)
                .then((response) => {
                    setData(response.data)
                    setLoading(false)
                })
        }
        catch (err) {
            console.error('Error:', err)
        }
    }, [path])
    return (
        <div className='products'>
            {loading ? <p>Loading...</p> :
                data.map((item, id) => {
                    return (
                        <div className='productData' key={id}>
                            <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                            <Link to={`/product/${item.category}/${item.id}`}><h3 className='productTitle'><code>{item.title.slice(0, 30)}</code></h3></Link>
                        </div>
                    )
                })}
        </div>
    )
}
