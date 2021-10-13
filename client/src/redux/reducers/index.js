import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import ava from './avatarReducer'
import user from './userReducer'
import status from './statusReducer'
import reply from './replyReducer'
import following  from './followingReducer'
import profile from './profileReducer'
import follower  from './followerReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    ava,
    user,
    status,
    reply,
    following,
    profile,
    follower
})