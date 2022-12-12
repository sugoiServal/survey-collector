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

        try {
            // logout with fetch
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: 'GET',
                credentials: 'include' 
            })

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })
            // ? dispatch ready or not
            navigate('/')
            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            } 
        } 
        catch(err) {
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