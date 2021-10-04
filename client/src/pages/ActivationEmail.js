import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { activateEmail } from '../redux/actions/authAction'


function ActivationEmail() {
    const {activation_token} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if(activation_token){
            dispatch(activateEmail(activation_token))
        }
    },[activation_token,dispatch])
    return (
        <div>
            
        </div>
    );
}

export default ActivationEmail;