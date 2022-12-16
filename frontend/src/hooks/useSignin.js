import { useState } from 'react'
import { useSubscribeAuthContext } from './useSubscribeAuthContext'

export const useSignin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useSubscribeAuthContext()

    const signin = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/password`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({email, password})
        })
        const json = await response.json()
    
        if (!response.ok) {   // (response is not 200)
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            const userDoc = {...json.user, JWTtoken: json.JWTtoken}
            localStorage.setItem('user', JSON.stringify(userDoc))

            // update the auth context
            dispatch({type: 'LOGIN', payload: userDoc})
            dispatch({type: 'AUTH_TYPE', payload: 'JWT'})

            // update loading state
            setIsLoading(false)
            console.log("signin OK")
        }
    }

    return { signin, isLoading, error }
}