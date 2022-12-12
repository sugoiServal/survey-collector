
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaySuccessPg() {
  const navigate = useNavigate()
  useEffect(() => {
    const waitAndRedirect = async () => {
      await new Promise(r => setTimeout(r, 3000));
      navigate('/surveys')
      navigate(0)
    }
    waitAndRedirect()
  }, [])
  
  return (
    <div>PaySuccessPg: pay success redirect in 3 seconds</div>
  )
}
