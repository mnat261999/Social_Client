import { GLOBALTYPES } from '../actions/index'

const initialState = {
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.AUTH:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
        case GLOBALTYPES.GET_INFOR_USER:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
        default:
            return state;
    }
}


export default authReducer