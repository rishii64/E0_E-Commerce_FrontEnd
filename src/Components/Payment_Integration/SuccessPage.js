import React from 'react'
import success from './success.gif'
import {useNavigate} from 'react-router-dom'

export default function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div className='successPage'>
      <img className='successImg' src={success} alt='success' />
      <button className='btnGoShopping' onClick={()=>navigate('/')}>continue</button>
    </div>
  )
}
