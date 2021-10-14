import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'

function Register() {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        cf_password: ''
    }

    const [userData, setUserData] = useState(initialState)
    const { firstName, lastName, email, phone, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const { auth, alert } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">ĐĂNG KÝ</h3>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName"
                        onChange={handleChangeInput} value={firstName}
                        style={{ background: `${alert.firstName ? '#fd2d6a14' : ''}` }} />

                    <small className="form-text text-danger">
                        {alert.firstName ? alert.firstName : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName"
                        onChange={handleChangeInput} value={lastName}
                        style={{ background: `${alert.lastName ? '#fd2d6a14' : ''}` }} />

                    <small className="form-text text-danger">
                        {alert.firstName ? alert.lastName : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                        onChange={handleChangeInput} value={email}
                        style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone"
                        onChange={handleChangeInput} value={phone}
                        style={{ background: `${alert.phone ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.phone ? alert.phone : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">

                        <input type={typePass ? "text" : "password"}
                            className="form-control" id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password"
                            style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">

                        <input type={typeCfPass ? "text" : "password"}
                            className="form-control" id="cf_password"
                            onChange={handleChangeInput} value={cf_password} name="cf_password" 
                            style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-3">
                    Đăng ký
                </button>

                <p className="my-2">
                    Bạn đã có tài khoản? <Link to="/" style={{ color: "crimson" }}>Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;