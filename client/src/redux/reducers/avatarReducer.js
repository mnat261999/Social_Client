import { GLOBALTYPES } from '../actions/index'

const initialState = {
    avas:[]
}

const avatarReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.AVATAR_BY_USER:
            return [...state.avas,action.payload]
        default:
            return state;
    }
}


export default avatarReducer