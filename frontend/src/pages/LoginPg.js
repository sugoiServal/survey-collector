import React from 'react'

export default function LoginPg() {
  return (
    <div className="container-lg">
        <a className='btn btn-success' href={`${process.env.REACT_APP_API_URL}/auth/google`}>Sign with Google </a>
        <a className='btn btn-success' href={`${process.env.REACT_APP_API_URL}/auth/facebook`}>Sign with Facebook  </a>
        {/* <a className='btn btn-success' href={`${process.env.REACT_APP_API_URL}/auth/google`}>Sign with Apple  </a> */}

    </div>
  )
}
