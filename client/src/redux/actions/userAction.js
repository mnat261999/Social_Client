import { GLOBALTYPES } from './index'
import axios from 'axios'

export const getUser = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api1/user/get_id/${id}`)

        //console.log(res)
    
         dispatch({ 
            type: GLOBALTYPES.GET_USER_ID, 
            payload: {
                user:res.data.userInfor
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

export const getFollow = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api1/follows/following_list/${id}`)

        //console.log(res)
    
         dispatch({ 
            type: GLOBALTYPES.GET_FOLLOW, 
            payload: {
                following:res.data.following,
                totalFollowing:res.data.totalFollowing,
                follower:res.data.follower,
                totalFollower:res.data.totalFollower
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