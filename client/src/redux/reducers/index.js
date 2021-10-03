import { combineReducers } from 'redux'
import auth from './authReducer'
import arlet from './arletReducer'

export default combineReducers({
    auth,
    arlet
})