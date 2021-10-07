import { GLOBALTYPES } from '../actions/index'


const followingReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.FOLLOWING:
            return action.payload;
        default:
            return state;
    }
}


export default followingReducer