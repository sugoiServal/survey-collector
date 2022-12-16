import { useEffect, useState } from 'react'
import { useSubscribeAuthContext } from './useSubscribeAuthContext'
import { useNavigate } from 'react-router-dom';
export const useLogout = () => {
    const navigate = useNavigate()
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { user, dispatch } = useSubscribeAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)

        // check if is jwt
        const userSession = JSON.parse(localStorage.getItem('user'))
        if (userSession) {
            localStorage.removeItem('user')
            dispatch({ type: 'LOGOUT' })
            navigate(0)
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            } 
            return 
        }
        // not jwt, try passport session logout
        try {
            // logout with fetch
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include' 
            })

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })
            dispatch({ type: 'AUTH_IS_READY' })
            
            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            } 
        } catch(err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
        navigate(0)
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}