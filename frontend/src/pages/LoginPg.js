import { useState } from 'react'
import { useSignin } from '../hooks/useSignin' 

export default function LoginPg() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signin, error, isLoading } = useSignin() 

  const handleSubmit = async (e) => {
    e.preventDefault()
    signin(email, password)
  }

  return (
    <div className="container-sm p-4 mt-5">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="w-35 me-4 d-none d-md-block">
            <h3 className="display-5 fs-2">Join the SurveyCollector marketing power</h3>
            <p className='fs-5 text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
            <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
            <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
            <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>

          </div>
          <div className="d-flex flex-column me-1 w-25">
            <a className='btn btn-secondary my-1 text-dark' style={{background:"white"}} href={`${process.env.REACT_APP_API_URL}/auth/google`}>Sign up with Google </a>
            <a className='btn btn-success my-1' style={{background:"#314a86"}} href={`${process.env.REACT_APP_API_URL}/auth/facebook`}>Sign up with Facebook  </a>
            <a className='btn btn-success my-1' style={{background:"black"}} href={`${process.env.REACT_APP_API_URL}/auth/github`}>Sign up with Github  </a>
            <div className="card mt-3 p-4">
              <form onSubmit={handleSubmit}>        
                <div className="form-field mb-3">    
                    <label className='fw-semibold fs-6 mb-1' for="email">Email</label>  
                    <input type="email" id="email" required
                            className='form-control'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-field mb-3">    
                    <label className='fw-semibold fs-6 mb-1' for="password">Password</label>  
                    <input type="password" id="password" required
                            className='form-control'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                    <span className="form-text">Passwords must contain at least eight characters, including at least 1 uppercase, 1 symbol and 1 number.</span>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}

                <button disabled={isLoading} className='btn btn-primary w-100 mb-2'>Sign up/ Login</button>
                <p className="form-text">By clicking “Sign up”, you agree to our <a href="#">terms of service</a>, <a href="#">privacy policy</a> and <a href="#">cookie policy</a></p>
                
              </form>
            </div>
          </div>
        </div>

    </div>
  )
}