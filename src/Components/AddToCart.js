// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../Redux/Slice";
// import { ToastContainer, toast } from 'react-toastify';

// export default function AddToCart() {
//   const [currentProduct, setCurrentProduct] = useState([]);
//   const [currentImage, setCurrentImage] = useState("");
//   const productID = useParams();
//   const { isLoggedIn } = useSelector((state) => state.User);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setIsLoading(true)
//     axios.get(`https://e-commerce-backend-w7x2.onrender.com/product/${productID}`).then((response) => {
//       setCurrentProduct(response.data);
//       setCurrentImage(response.data[0].images[0])
//       setIsLoading(false);
//     })
//   }, [productID]);

//   const handleAddToCart = (product) => {
//     if (isLoggedIn) {
//       toast.success('Item Added Successfully', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       dispatch(addToCart(product))
//     } else {
//       toast.error('Permission Denied! First Register', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }

//   const handleImageClick = (e) => {
//     setCurrentImage(e.target.src)
//   }
//   return (
//     <>
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <section className='ProductFullDetailsContainer'>
//         {
//           isLoading ? <div className="loader" /> : <>
//             <div className="Product--pictureContainer">
//               <img src={currentImage} alt="ProductPoster" className={`${currentProduct[0]?.category}currentImage currentImage`} />
//               <div className="MoreImageContainer">
//                 {
//                   currentProduct[0]?.images.map((images, index) => {
//                     return <div className='imageBox' key={index}>
//                       <img src={images} alt="MoreImages" className='MoreImage' onClick={handleImageClick} />
//                     </div>
//                   })
//                 }
//               </div>
//             </div>

//             <div className="Product--DetailsContainer">
//               <h2 className='currentProduct--title'>{currentProduct[0]?.title}</h2>
//               <p className="currentProduct--rating">{currentProduct[0]?.rating}<i className="fa-solid fa-star"></i></p>

//               <p className="currentPrduct--price">
//                 <span className="Dprice">₹{currentProduct[0]?.Dprice}</span>
//                 <span className="Aprice">₹{currentProduct[0]?.Aprice}</span>
//                 <span className="DiscountPercentage">{currentProduct[0]?.discountPercentage}%off</span>
//               </p>
//               <div className="itemCountContainer">
//                 <button className='addToCartButton' onClick={() => handleAddToCart(currentProduct[0])}>Add To Cart</button>
//               </div>

//               <p className='currentPrduct--discription'>
//                 Description : {currentProduct[0]?.description}
//               </p>
//             </div>
//           </>
//         }
//       </section>
//     </>
//   )
// }



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddToCart() {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('Token:')
    console.log('token:', token);
    if (!token) {
      navigate('/login')
    }
    else {
      axios.get('https://e-commerce-backend-w7x2.onrender.com/addToCart', {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      })
        .then((res) => {
          toast.info('Your access is granted !!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setMsg(res.data.msg)
        })
    }
  }, [navigate])
  return (
    <div>
      <ToastContainer />
      <h2><cite><code>{msg}</code></cite></h2>
    </div>
  )
}

