import { GLOBALTYPES } from '../actions/index'


const followerReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.FOLLOWER:
            return action.payload;
        default:
            return state;
    }
}


export default followerReducer