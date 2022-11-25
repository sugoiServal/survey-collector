import React from 'react'
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'
import './LandingPg.css'
export default function LandingPg() {
  const { user } = useSubscribeAuthContext()
  return (
    <div>
      <h1 id="landing">
        SurveyCollector!!
      </h1>
      <p>Collect feedback from your</p>
      {!user && <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>signin with google</a>} 
    </div>
  )
}
