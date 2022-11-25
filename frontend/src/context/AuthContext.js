import { createContext, useReducer, useEffect } from 'react'
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
    const fetchUserStatus = async () => {
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
    fetchUserStatus()
  }, [])

  console.log('AuthContext state:', state) 
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}