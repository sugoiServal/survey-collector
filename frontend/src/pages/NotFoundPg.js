import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPg() {
  const navigate = useNavigate()
  useEffect(() => {
    const waitAndRedirect = async () => {
      await new Promise(r => setTimeout(r, 6000));
      navigate('/surveys')
      navigate(0)
    }
    waitAndRedirect()
  }, [])

  return (
    <div className="container-lg mt-5">
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Page cannot be found!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <p class="mb-0">Anyway it is a 404 page, sorry to keep it to long.</p>
      </div>
    </div>
  )
}
