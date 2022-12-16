import React from 'react'
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'

export default function LandingPg() {
  const { user } = useSubscribeAuthContext()
  return (
    <div className='container-lg mt-5 text-center text-md-start'>
      <h1 className='display-2'>
        SurveyCollector!@
      </h1>
      <p className='display-5'>
        Collect feedback from your customers
      </p>
      {/* todo add a login page ref https://stackoverflow.com/users/signup?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2f56061590%2fwhat-is-difference-between-reactstrap-and-react-bootstrap */}
      <a href={user ? '/surveys' : `/login`} className='btn btn-lg btn-secondary my-4'>Try it Now!</a>

    </div>
  )
}
