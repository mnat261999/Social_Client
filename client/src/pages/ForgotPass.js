import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions';
import axios from 'axios';

const initialState = {
    email: ''
}

function ForgotPass() {
    const [data, setData] = useState(initialState)
    const {email} = data

    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email)
            return dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: 'Invalid emails.'
                } 
            })
            
        try {
            const res = await axios.post('/api1/user/forgot', {email})

            console.log(res)

            setData({...data})
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    success: res.data.msg
                } 
            })
        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
    }
    return (
        <div className="auth_page">
        <form onSubmit={handleSubmit}>
            <h3 className="text-uppercase text-center mb-4">Quên mật khẩu</h3>

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                onChange={handleChangeInput} value={email} />
                
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-3">
                Gửi
            </button>

        </form>
    </div>
    );
}

export default ForgotPass;