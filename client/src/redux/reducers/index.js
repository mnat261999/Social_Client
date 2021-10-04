import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import ava from './avatarReducer'
import user from './userReducer'
import status from './statusReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    ava,
    user,
    status
})