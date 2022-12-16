// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// hooks
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'
import { useLogout } from '../hooks/useLogout'

// components
import Modal  from './Modal'
import CreditCartModal from './CreditCartModal';
const authHeaderConfig = require('../utils/authHeaderConfig')

export default function Header() {

  // logout
  const { user } = useSubscribeAuthContext()
  const { logout, error, isPending } = useLogout()
  const handleLogout = () => {
    console.log('request logout')
    logout()
  }

  // credit top up
  const [creditModalOpen, SetCreditModalOpen] = useState(false)
  const [credits, setCredits] = useState('')
  const handleCreditModal = async () => {
    SetCreditModalOpen(true)
  }
  useEffect(() => {
    const fetchCredits = async () => {
      console.log('useEffect triggered')
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/credit/get_credit`, {
        method: "GET",
        credentials: 'include' ,
        headers: authHeaderConfig(user, {
            'Content-Type': 'application/json'
        }),
      })
      const msg = await res.json()
      console.log(msg.credits);
      setCredits(msg.credits)
    }
    if (user) {
      fetchCredits()
    }
  }, [])
  
  return (
    <nav className='navbar navbar-expand-md bg-dark sticky-top navbar-dark'>
        <div className="container-xxl ">
          <Link className='navbar-brand' exact to={user ? "/surveys":"/"}>SurveyCollector</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
            aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
          </button>
        
          {!user && 
            <a className='btn btn-success' href={`/login`}>Signup/Login</a>
          }
          
          {user && credits !== undefined &&
            <div className="collapse navbar-collapse justify-content-end align-content-center" id="main-nav">
              <ul class="navbar-nav">
                <li class="nav-item d-none d-md-inline">
                  <button className='btn btn-warning mx-1' onClick={handleCreditModal}>Top up</button>
                </li>
                <li class="nav-item d-md-none fw-bold">
                  <a className='text-light mx-1' onClick={handleCreditModal}>Top up</a>
                </li>
      
                <li class="nav-item"> 
                  <span class="lead mx-1 text-light fw-bold">credit:{credits}</span>
                </li>
              
                <li class="nav-item d-none d-md-inline">
                  <button className='btn btn-secondary mx-1' onClick={handleLogout}>Logout</button> 
                </li>
                <li class="nav-item d-md-none fw-bold">
                  <a className='text-light mx-1' onClick={handleLogout}>Logout</a> 
                </li>
              </ul>
            </div>     
          }
          {user && (credits===undefined || credits===null) &&  <span className="alert alert-warning">credit not available</span>}
        </div>
        {creditModalOpen && 
                  <Modal closeModal={()=>SetCreditModalOpen(false)}> 
                    <CreditCartModal/>
                  </Modal>
        }
    </nav>
  )
}
