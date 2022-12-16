
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSubscribeAuthContext } from '../../hooks/useSubscribeAuthContext'
const authHeaderConfig = require('../../utils/authHeaderConfig')

export default function PaySuccessPg() {
  const navigate = useNavigate()
  const { user, dispatch, authIsReady } = useSubscribeAuthContext()

  useEffect(() => {
    const reFetchUser = async () => {
      // Todo expose an endpoint in credit route to get the credit
      // store credit somewhere in localstorage, decouple credit from user info
      // user info sole of auth purpose 
    }
    const waitAndRedirect = async () => {
      await new Promise(r => setTimeout(r, 3000));
      navigate('/surveys')
      navigate(0)
    }
    reFetchUser()
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
