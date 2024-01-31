import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('Token:')
    console.log('token:', token);
    if (!token) {
      navigate('/login')
    }
    else {
      axios.get('http://localhost:4600/dashboard', {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      })
        .then((res) => {
          // alert('Your access is granted !!')
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
