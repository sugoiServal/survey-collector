
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
    <div className="container-lg mt-5">
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">PaySuccessPg: pay success redirect in 3 seconds!</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <p class="mb-0">Anyway it is a payment success page, sorry to keep it to long.</p>
    </div>
  </div>
  )
}
