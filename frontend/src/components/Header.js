// react
import { useState } from 'react'
import { Link } from 'react-router-dom';

// hooks
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'
import { useLogout } from '../hooks/useLogout'

// components
import Modal  from './Modal'
import CreditCartModal from './CreditCartModal';

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
  const handleCreditModal = async () => {
    console.log("handleCreditModal")
    SetCreditModalOpen(true)
    
  }
  console.log(creditModalOpen);

  return (
    <nav className='navbar navbar-expand-md bg-dark sticky-top navbar-dark'>
        <div className="container-xxl ">
          <Link className='navbar-brand' exact to={user ? "/surveys":"/"}>SurveyCollector</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
            aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
          </button>
        
          {!user && 
            <a className='btn btn-success' href={`${process.env.REACT_APP_API_URL}/auth/google`}>Sign with Google</a>
          }
          
          {user && 
            <div className="collapse navbar-collapse justify-content-end align-content-center" id="main-nav">
              <ul class="navbar-nav">
                <li class="nav-item d-none d-md-inline">
                  <button className='btn btn-warning mx-1' onClick={handleCreditModal}>Top up</button>
                </li>
                {/*top up: drop down */}
                <li class="nav-item d-md-none fw-bold">
                  <a className='text-light mx-1' onClick={handleCreditModal}>Top up</a>
                </li>
                <li class="nav-item">
                  <span class="lead mx-1 text-light fw-bold">credit:{user.credits}</span>
                </li>
                <li class="nav-item d-none d-md-inline">
                  <button className='btn btn-secondary mx-1' onClick={handleLogout}>Logout</button> 
                </li>
                {/*logout: drop down */}
                <li class="nav-item d-md-none fw-bold">
                  <a className='text-light mx-1' onClick={handleLogout}>Logout</a> 
                </li>
              </ul>
            </div>     
          }
        </div>
        {creditModalOpen && 
                  <Modal closeModal={()=>SetCreditModalOpen(false)}> 
                    <CreditCartModal/>
                  </Modal>
        }
    </nav>
  )
}
