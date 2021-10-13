import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFollow } from '../../redux/actions/userAction'
import axios from 'axios'
import { GlobalState } from '../../GlobalState'
import { GLOBALTYPES } from '../../redux/actions'

const FollowBtn = ({u}) => {
    const state = useContext(GlobalState)
    
    const { auth } = useSelector(state => state)
    const [callbackFollow, setCallbackFollow] = useState(false)
    const [callback, setCallback] = state.userAPI.callback
    const [followed, setFollowed] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log(u)
        console.log(u.follows.follower.find(item => item.idUser.idUser === auth.user.idUser))

        if(u.follows.follower.find(item => item.idUser.idUser === auth.user.idUser)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    }, [u.follows.follower,auth.user.idUser])

    useEffect(() => {
        dispatch(getFollow(u.user.idUser))
    }, [dispatch, u.user.idUser, callbackFollow])


    const handleUnfollow = async (id) =>{
        //console.log(id)
       const res = await axios.delete(`/api1/follows/unfollow/${id}`,{
            headers: {Authorization: `Bearer ${auth.token}`}  
        })
        //console.log(res)
        setCallbackFollow(!callbackFollow)
        setCallback(!callback)
    }

    const handleFollow = async (id) =>{
        try {
            await axios.post(`/api1/follows/${id}`," ",{
                headers: {Authorization: `Bearer ${auth.token}`}  
            })

            setCallbackFollow(!callbackFollow)
            setCallback(!callback)
        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response
                } 
            })
        }
    }


    return (
        <>
        {
            followed
            ? <button className="btn btn-outline-danger" onClick={() =>handleUnfollow(u.user.idUser)}
            >
                UnFollow
            </button>
            : <button className="btn btn-outline-info" onClick={() =>handleFollow(u.user.idUser)}
            >
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn