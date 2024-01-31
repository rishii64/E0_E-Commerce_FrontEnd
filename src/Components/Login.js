import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    try {
      axios.post('http://localhost:4600/login', { email, password })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg === "User is not registered") {
            alert(res.data.msg)
            navigate('/register')
          }
          else if (res.data.msg === 'Password is incorrect') {
            toast.error('Password is incorrect!!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          else {
            toast.success('Logged in Successfully!!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem('Token:', res.data.token)
          }
        })
    }
    catch (err) {
      console.error('Login failed with error', err)
    }
  }
  return (
    <div className='loginPage'>
      <ToastContainer />
      <section>
        <h1>Login Page</h1>
        <cite><b>Get access to your Orders and Wishlist</b></cite>
      </section>
      <span>
        <label>E-mail: </label>
        <input type='text' placeholder='enter e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />  <br /><br />
      </span>
      <span>
        <label>Password: </label>
        <input type='text' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />  <br /><br />
      </span>
      <button className='btnLogin' onClick={handleLogin}>Login</button>
      <p onClick={() => navigate('/register')}>New Here? Create an account</p>
    </div>
  )
}
