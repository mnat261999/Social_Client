import { GLOBALTYPES } from '../actions/index'

const initialState = {
    idUser: '',
    avatarCurrent: '',
    listAva : ''
}

const avatarReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.AVATAR_BY_USER:
            return {
                ...state,
                idUser: action.payload.idUser,
                avatarCurrent: action.payload.avatarCurrent,
                listAva : action.payload.listAva
            }
        default:
            return state;
    }
}


export default avatarReducer