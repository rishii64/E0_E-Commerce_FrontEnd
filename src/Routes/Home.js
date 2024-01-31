import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import shipping from './shipping.png'
import refund from './refund.png'
import support from './support.png'
import banner4 from './banner4.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const path = useParams().category
  const navigate = useNavigate()

  const handleLogOut =()=>{
    localStorage.removeItem('Token:')
    navigate('/login')
  }

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`https://e-commerce-backend-w7x2.onrender.com`)
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
    <div className='homePage'>
      <Carousel className='ImgCrsl'>
        <div className='imageContainer'>
          <img className='image' src="https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150867247.jpg?w=1380&t=st=1706529299~exp=1706529899~hmac=d42013852b0b4241b23b68f95877850368b10d414f5ea5d0d13d9631a641bf9d" alt='not found' />
        </div>

        <div className='imageContainer'>
          <img className='image' src="https://img.freepik.com/free-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?w=1060&t=st=1706529256~exp=1706529856~hmac=795b97af0b8bfb4ca2d67070f36d124d74c4937bf24ddd5ff8a070fea1f1fe08" alt='not found' />
        </div>
        <div className='imageContainer'>
          <img className='image' src="https://img.freepik.com/free-vector/realistic-black-friday-social-media-promo-template_23-2149110140.jpg?w=996&t=st=1706529420~exp=1706530020~hmac=3c386708ea5e7b4b57682f7a2e232287ea115f07664f8fe1c2fdd4beea5fc6dd" alt='not found' />
        </div>
        <div className='imageContainer'>
          <img className='image' src={banner4} alt='not found' />
        </div>
      </Carousel>

      <h1 className='bestSellers'>: BEST SELLERS :</h1>
      <div className="topProducts">
        <h2>Top Mobiles :</h2>
        <div className="topMobiles">
          {loading ? <div className="loader" /> :
            data.filter((item) => item.category === 'mobile' && item.id < 5).map((item, id) => {
              return (
                <div className='productData' onClick={() => navigate(`/product/${item.category}/${item.id}`)} key={id}>
                  <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                  <h2 className='productTitle'><code>{item.title.slice(0, 15)}</code></h2>
                  <span>{item.rating} <i className="fa-regular fa-star" /></span>
                  <div className="productPrices">
                    <div className="Dprice">₹{item.Dprice}</div>
                    <div className="prod discPercent">{item.discountPercentage}% off</div>
                  </div>
                </div>
              )
            })}
        </div>

        <h2>Top Headphones :</h2>
        <div className="topHeadphones">
          {loading ? <div className="loader" /> :
            data.filter(item => item.category === 'headphone' && item.id < 59).map((item, id) => {
              return (
                <div className='productData' onClick={() => navigate(`/product/${item.category}/${item.id}`)} key={id}>
                  <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                  <h2 className='productTitle'><code>{item.title.slice(0, 8)}..</code></h2>
                  <span>{item.rating} <i className="fa-regular fa-star" /></span>
                  <div className="productPrices">
                    <div className="Dprice">₹{item.Dprice}</div>
                    <div className="prod discPercent">{item.discountPercentage}% off</div>
                  </div>
                </div>
              )
            })}
        </div>

        <h2>Top Laptops :</h2>
        <div className="topLaptops">
          {loading ? <div className="loader" /> :
            data.filter(item => item.category === 'laptop' && item.id < 25).map((item, id) => {
              return (
                <div className='productData' onClick={() => navigate(`/product/${item.category}/${item.id}`)} key={id}>
                  <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                  <h2 className='productTitle'><code>{item.title.slice(0, 15)}..</code></h2>
                  <span>{item.rating} <i className="fa-regular fa-star" /></span>
                  <div className="productPrices">
                    <div className="Dprice">₹{item.Dprice}</div>
                    <div className="prod discPercent">{item.discountPercentage}% off</div>
                  </div>
                </div>
              )
            })}
        </div>

        <h2>Top Cameras :</h2>
        <div className="topCameras">
          {loading ? <div className="loader" /> :
            data.filter(item => item.category === 'camera' && item.id < 45).map((item, id) => {
              return (
                <div className='productData' onClick={() => navigate(`/product/${item.category}/${item.id}`)} key={id}>
                  <img className='cameraImg' src={item.images.LinkOne} alt={item.title} />
                  <h2 className='productTitle'><code>{item.title.slice(0, 12)}..</code></h2>
                  <span>{item.rating} <i className="fa-regular fa-star" /></span>
                  <div className="productPrices">
                    <div className="Dprice">₹{item.Dprice}</div>
                    <div className="prod discPercent">{item.discountPercentage}% off</div>
                  </div>
                </div>
              )
            })}
        </div>

      </div>


      <section className='deliveryInfo'>
        <div className="info">
          <img src={shipping} alt='shipping' />
          <h2>FREE SHIPPING</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aperiam quam tenetur? Molestiae voluptatum animi et reprehenderit, assumenda eum mollitia!</p>
        </div>
        <div className="info">
          <img src={refund} alt='refund' />
          <h2>REFUND 100%</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aperiam quam tenetur? Molestiae voluptatum animi et reprehenderit, assumenda eum mollitia!</p>
        </div>
        <div className="info">
          <img src={support} alt='support' />
          <h2>SUPPORT 24/7</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aperiam quam tenetur? Molestiae voluptatum animi et reprehenderit, assumenda eum mollitia!</p>
        </div>
      </section>
    </div>
  )
}
