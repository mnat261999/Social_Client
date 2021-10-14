import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { GLOBALTYPES } from '../redux/actions';
import { isPass, isMatch } from '../utils/ValidateForgot'
import axios from 'axios';

const initialState = {
    password: '',
    cf_password: ''
}

function ResetPass() {
    const [data, setData] = useState(initialState)
    const { password, cf_password } = data
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)
    const { token } = useParams()
    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleResetPass = async (e) => {
        e.preventDefault()
        if (!isPass(password)) {
            setData({ ...data })
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: 'Password must be at least 8 characters, one letter and one number.'
                }
            })
        }

        if (!isMatch(password, cf_password)) {
            setData({ ...data })
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: 'Password did not match.'
                }
            })
        }

        try {
            const res = await axios.post('/api1/user/reset', { password }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(res)

            if(res.status != 200) return  dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: res.data.msg
                }
            })

            setData({ ...data })

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
            //setData({ ...data })
            //showErrMsg('error', err.response.data.msg)

        }
    }


    return (
        <div className="auth_page">
            <form onSubmit={handleResetPass}>
                <h3 className="text-uppercase text-center mb-4">ĐẶT LẠI MẬT KHẨU</h3>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">

                        <input type={typePass ? "text" : "password"}
                            className="form-control" id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password" />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">

                        <input type={typeCfPass ? "text" : "password"}
                            className="form-control" id="cf_password"
                            onChange={handleChangeInput} value={cf_password} name="cf_password" />
                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-3">
                    Đặt lại
                </button>
            </form>
        </div>
    );
}

export default ResetPass;