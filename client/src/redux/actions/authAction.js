import { GLOBALTYPES } from './index'
import axios from 'axios'
import Validation from '../../utils/Validation'


export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await axios.post('api1/user/login',data)

 /*        console.log(res) */

        const user = await axios.get('api1/user/infor',{
            headers: {Authorization: `Bearer ${res.data.token}`}
        })

        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.token,
                user:  user.data.userInfor
            } 
        })

        localStorage.setItem("firstLogin", true)

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
                error: err.response
            } 
        })
    }
}

export const register = (data) => async (dispatch) =>{
    const check = Validation(data)

    if(check.errLength > 0)
    return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const {firstName,lastName,email,phone,password} = data
        
        const res = await axios.post('api1/user/register',{firstName:firstName,lastName:lastName,email:email,phone:phone,password:password})

        if(res.status == 200){
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    success: res.data.msg
                } 
            })
        }else{
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: res.data.msg
                } 
            })
        }

    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const activateEmail = (data) => async (dispatch) =>{
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

 
        const res = await axios.post('/api1/user/activation', {activate_token:data})

        //console.log(res)

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
                error: err.response
            } 
        })
    }
}

export const getUserInfor = (token) => async (dispatch) =>{
    try {
        const res = await axios.get('/api1/user/infor',{
            headers: {Authorization: `Bearer ${token}`}
        })

        //console.log(res)
        dispatch({ 
            type: GLOBALTYPES.GET_INFOR_USER, 
            payload: {
                token:token,
                user : res.data.userInfor
            } 
        })
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response
            } 
        })
    }
}

export const logout = () => async (dispatch) =>{
    try {
        localStorage.removeItem('firstLogin')
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await axios.post('/api1/user/logout')

        //console.log(res)


/*         dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: ''
            } 
        }) */

        dispatch({ 
            type: GLOBALTYPES.GET_INFOR_USER, 
            payload: {
                token:'',
                user: {}
            } 
        })

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })

        window.location.href = "/"

    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response
            } 
        })
    }
}
