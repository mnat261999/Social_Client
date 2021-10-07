import { GLOBALTYPES } from '../actions/index'


const replyReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.REPLY:
            return action.payload;
        default:
            return state;
    }
}


export default replyReducer