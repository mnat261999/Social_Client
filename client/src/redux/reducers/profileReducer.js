import { GLOBALTYPES } from '../actions/index'

const profileReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.PROFILE:
            return action.payload
        default:
            return state;
    }
}


export default profileReducer