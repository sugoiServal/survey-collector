import { createContext, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// create AuthContext
export const AuthContext = createContext()
// define Reducer to manage AuthContext 
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state,  authIsReady: true}
    case 'AUTH_TYPE':
      return { ...state,  authType: action.payload}
    case 'UPDATE_CREDIT':
      return {...state, credit: action.payload}
    default:
      return state
  }
}

// define Provider wrapper
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })
  

  useEffect(() => {
    
    const sessionUser = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/get_user`, {
        method: 'GET',
        credentials: 'include' 
      })
      const user = await response.json()
      if (user.ok) {
        console.log('fetched user');
        dispatch({ type: 'LOGIN', payload: user._doc }) 
      } else {
        console.log('Cannot fetch user, not logged in or not signup in backend');
      }
      dispatch({ type: 'AUTH_IS_READY'})
    }
    const JwtUser = () => {
      const userSession = JSON.parse(localStorage.getItem('user'))
      if (userSession) {
        dispatch({ type: 'LOGIN', payload: userSession }) 
        dispatch({ type: 'AUTH_IS_READY'})
        return userSession
      }
    }
       
    // try JWT 
    if (state.authType === 'JWT') {
      const user = JwtUser()
    }
    else {
      console.log('Cannot fetch user via JWT, now try session');
      sessionUser()
    }
  }, [])

  console.log('AuthContext state:', state) 
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}