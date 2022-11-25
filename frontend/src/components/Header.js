import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'
import { useLogout } from '../hooks/useLogout'
export default function Header() {
  const { user } = useSubscribeAuthContext()
  const { logout, error, isPending } = useLogout()
  const handleLogout = () => {
    console.log('request logout')
    logout()
  }
  return (
    <header className='nav'>
        <div className="nav-wrapper">
          <Link exact to={user ? "/surveys":"/"}>SurveyCollector</Link>
        </div>
        {!user && <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>signin with google</a>}
        {user && <button onClick={handleLogout}>Logout</button> }
        
 

    </header>
  )
}
