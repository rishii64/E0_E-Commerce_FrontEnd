import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slice";
import { ToastContainer, toast } from 'react-toastify';



function ProductFullDetailsComponent() {
  const [currentImage, setCurrentImage] = useState("");
  const [currentProduct, setCurrentProduct] = useState([]);
  const ProductID = useParams().title.split("-")[1];
  const { isLoggedIn } = useSelector((state) => state.User);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    axios.get(`https://ecom-backend-t7c9.onrender.com/product/${ProductID}`).then((response) => {
      setCurrentProduct(response.data);
      setCurrentImage(response.data[0].images[0])
      setIsLoading(false);
    })

  }, [ProductID]);

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      toast.success('Item Added Successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(addToCart(product))
    } else {
      toast.error('Permission Denied! First Sign In', {
        position: "top-center",
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

  const handleImageClick = (e) => {
    setCurrentImage(e.target.src)
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <section className='ProductFullDetailsContainer'>


        {
          isLoading ? <div className="loader" /> : <>
            <div className="Product--pictureContainer">
              <img src={currentImage} alt="ProductPoster" className={`${currentProduct[0]?.category}currentImage currentImage`} />
              <div className="MoreImageContainer">
                {
                  currentProduct[0]?.images.map((images, index) => {
                    return <div className='imageBox' key={index}>
                      <img src={images} alt="MoreImages" className='MoreImage' onClick={handleImageClick} />
                    </div>
                  })
                }
              </div>
            </div>

            <div className="Product--DetailsContainer">
              <h2 className='currentProduct--title'>{currentProduct[0]?.title}</h2>
              <p className="currentProduct--rating">{currentProduct[0]?.rating}<i className="fa-solid fa-star"></i></p>

              <p className="currentPrduct--price">
                <span className="Dprice">₹{currentProduct[0]?.Dprice}</span>
                <span className="Aprice">₹{currentProduct[0]?.Aprice}</span>
                <span className="DiscountPercentage">{currentProduct[0]?.discountPercentage}%off</span>
              </p>
              <div className="itemCountContainer">
                <button className='addToCartButton' onClick={() => handleAddToCart(currentProduct[0])}>Add To Cart</button>
              </div>


              <p className='currentPrduct--discription'>
                Description : {currentProduct[0]?.description}
              </p>
            </div>
          </>
        }
      </section>
    </>
  )
}

export default ProductFullDetailsComponent