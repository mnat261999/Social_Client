import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authAction'

const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)
    const { auth } = useSelector(state => state)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        console.log(auth)
        if(auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">ĐĂNG NHẬP</h3>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email} />
                    
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                   
                </div>
                
                <button type="submit" className="btn btn-dark w-100 mt-3"
                disabled={email && password ? false : true}>
                    Đăng nhập
                </button>

                <p className="my-2">
                    Bạn chưa có tài khoản? <Link to="/register" style={{color: "crimson"}}>Đăng ký</Link>
                </p>
                <p className="my-2">
                   <Link to="/forgot_password" style={{color: "crimson"}}>Quên mật khẩu?</Link>
                </p>
            </form>
        </div>
    )
}

export default Login