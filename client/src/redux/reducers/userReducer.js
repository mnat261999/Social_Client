import { GLOBALTYPES } from "../actions";

const initialState = {
    user: [],
    follows: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_USER_ID:
            return {
                ...state,
                user: action.payload.user
            };
        case GLOBALTYPES.GET_FOLLOW:
            return{
                ...state,
                follows: action.payload
            }
        default:
            return state;
    }
}

export default userReducer