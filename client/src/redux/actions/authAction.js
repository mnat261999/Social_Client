import { GLOBALTYPES } from './index'
import axios from 'axios'


export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await axios.post('api1/user/login',data)

        const user = await axios.get('api1/user/infor',{
            headers: {Authorization: `Bearer ${res.data.token}`}
        })

        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.token,
                user : user.data.userInfor
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
                error: err.response.data.msg
            } 
        })
    }
}