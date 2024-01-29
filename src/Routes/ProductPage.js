import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ProductPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
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
            {loading ? <div className="loader" /> :
                data.map((item, id) => {
                    return (
                        <div className='productData' onClick={() => navigate(`/product/${item.category}/${item.id}`)} key={id}>
                            <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                            <h2 className='productTitle'><code>{item.title.slice(0, 15)}..</code></h2>
                            <span>{item.rating} <i className="fa-regular fa-star" /></span>
                            <div className="productPrices">
                                <div className="Dprice">₹{item.Dprice}</div>
                                <div className="prod discPercent">{item.discountPercentage}% off <i className="fa-solid fa-circle-info"></i></div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
