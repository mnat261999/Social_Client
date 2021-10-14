import { GLOBALTYPES } from './index'
import axios from 'axios'

export const getAvaByUser = (id) => async (dispatch) => {
    try {

        //console.log(id)

        const res = await axios.get(`/api1/avatar/${id}`)

        //console.log(res)
    
         dispatch({ 
            type: GLOBALTYPES.AVATAR_BY_USER, 
            payload: {
                idUser: id,
                avatarCurrent: res.data.avaCurrent,
                listAva : res.data.listAvas
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