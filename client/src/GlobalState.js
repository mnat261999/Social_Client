import React, {createContext} from 'react'
import { useSelector } from 'react-redux'
import NotiAPI from './api/NotiAPI'
import PostsAPI from './api/PostAPI'
import UserAPI from './api/UserAPI'



export const GlobalState = createContext()


export const DataProvider = ({children}) =>{

    const {auth} = useSelector(state => state)


    const state = {
        postAPI:PostsAPI(auth.token),
        userAPI:UserAPI(auth.token),
        notiAPI:NotiAPI(auth.token)
    } 

    console.log(state)


    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
