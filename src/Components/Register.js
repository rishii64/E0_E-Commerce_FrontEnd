import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = () => {
    try {
      axios.post('https://e-commerce-backend-w7x2.onrender.com/register', { email, password })
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg === 'This email is already in use !!') {
            alert(res.data.msg)
            navigate('/login')
          }
          else {
            toast('Success!!', {
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
      console.error('Registration failed with error', err)
    }
  }
  return (
    <div className='registerPage'>
      <ToastContainer />
      <section>
        <h1>Looks like you're new here!</h1>
        <cite><b>Sign up to get started</b></cite>
      </section>
      <span>
        <label>Name: </label>
        <input type='text' placeholder='enter name' /> <br /><br />
      </span>
      <span>
        <label>E-mail: </label>
        <input type='text' placeholder='enter e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />  <br /><br />
      </span>
      <span>
        <label>Password: </label>
        <input type='text' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />  <br />
      </span>
      <button className='btnRegister' onClick={handleRegister}>Register</button>
      <p onClick={() => navigate('/login')}>Existing User? Login</p>
    </div>
  )
}
