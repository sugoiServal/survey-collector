import { useState, useEffect } from 'react';
import { useSubscribeAuthContext } from '../hooks/useSubscribeAuthContext'
import "./CreditCartModal.css"
 

export default function CreditCartModal() {
    const { user } = useSubscribeAuthContext()
    const [creditAmount, setCreditAmount] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const handleCheckout = async () => {
        const amount = Number(creditAmount)
        if (typeof(amount) !== 'number' || amount <= 0) {
            setErrorMsg('Amount is not vaild!')
            return
        }

        // try stripe
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/credit/checkout`, {
            method: "POST",
            credentials: 'include' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'credit': amount,
                '_id': user._id,
            })
        })
        if (res.ok) {
            console.log('ok to next step');
            const json = await res.json()
            if (json.url) {
                window.location = json.url
            } else {
                console.log('unidentified checkout url, Check the response');
            }
        } else {
            console.log('catched error')
            return Promise.reject(res)
        }
    }


    return (
        <div className='credit-cart-modal'>
            <p className='fw-bold fs-3'>1 USD = 10 credit = 10 emails</p>
            <div className="mb-4">
                <label className='lead' htmlFor="credit">Your top up amount(USD):</label> 
                <input type="number" id="credit"
                    className='form-control'
                    placeholder={creditAmount}   
                    onChange={(e)=>setCreditAmount(e.target.value)}
                    required/> 
            </div>

            {errorMsg && <p className='alert alert-warning'>{errorMsg}</p>}
            <button className='btn btn-secondary btn-lg' onClick={() => handleCheckout()}>Checkout</button>   
        </div>
    )}
