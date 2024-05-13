import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('Token:')
    if (token) {
      navigate('/');
    }
  }, [navigate])

  const handleRegister = () => {
    const tempData = { name, email, password }
    try {
      axios.post(`https://e-commerce-backend-w7x2.onrender.com/user/register`, tempData)
        .then((res) => {
          if (res.data.msg === 'This email is already in use !!') {
            toast.error('This email is already in use !!');
            setTimeout(() => {
              navigate('/user/login')
            }, 1000);
          }
          else {
            toast('Success!!');
            localStorage.setItem('Token:', res.data.token)
            setTimeout(() => {
              navigate('/')
            }, 1000);
          }
        })
    }
    catch (err) {
      console.error('Registration failed with error', err)
    }
  }

  return (
    <>
    <Toaster/>
      <div className='registerPage'>
        <section>
          <h1>Looks like you're new here!</h1>
          <cite><b>Sign up to get started</b></cite>
        </section>
        <span>
          <label>Name: </label>
          <input type='text' placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
        </span>
        <span>
          <label>E-mail: </label>
          <input type='text' placeholder='enter e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />  <br /><br />
        </span>
        <span>
          <label>Password: </label>
          <input type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)} />  <br />
        </span>
        <button className='btnRegister' onClick={handleRegister}>Register</button>
        <p onClick={() => navigate('/user/login')}>Existing User? Login</p>
      </div>
    </>
  )
}
