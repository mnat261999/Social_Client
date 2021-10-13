import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../../redux/actions';
import { Link } from 'react-router-dom';
import { getFollow } from '../../../redux/actions/userAction'
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';

function FollowerModal({ idUser }) {
    const state = useContext(GlobalState)
    
    const { auth, user, follower } = useSelector(state => state)
    console.log({idUser})
    console.log(auth.user.idUser)
    const [visible, setVisible] = useState(follower)
    const [callbackFollow, setCallbackFollow] = useState(false)
    const [callback, setCallback] = state.userAPI.callback

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFollow(idUser))
    }, [dispatch, idUser, callbackFollow])

    const handleUnfollow = async (id) =>{
        console.log(id)
       const res = await axios.delete(`/api1/follows/unfollow/${id}`,{
            headers: {Authorization: `Bearer ${auth.token}`}  
        })
        console.log(res)
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
        <div>
            <Modal title="Follower"
                visible={visible}
                onCancel={() => dispatch({ type: GLOBALTYPES.FOLLOWER, payload: false })}
                footer={[
                ]}
            >
                <div className='follow_content'>
                    {
                        user.follows.follower.length > 0 &&
                        user.follows.follower.map(f => (
                            <div className="d-flex p-2 align-items-center justify-content-between w-100 undefined">
                                <div>
                                    <Link
                                        className="d-flex align-items-center"
                                        to={`/profile/${f.idUser.idUser}`}
                                    >
                                        {
                                            f.idUser.avas.length == 0
                                            && <img
                                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                alt="avatar"
                                                className="big-avatar"
                                                style={{ filter: "invert(0)" }}
                                            />
                                        }

                                        {
                                            f.idUser.avas.length > 0
                                            && f.idUser.avas.map(a => (
                                                a.checkNow == true
                                                &&
                                                <img
                                                    src={a.avatar.url}
                                                    alt="avatar"
                                                    className="big-avatar"
                                                    style={{ filter: "invert(0)" }}
                                                />
                                            ))
                                        }

                                        <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                                            <span className="d-block">{f.idUser.lastName} {f.idUser.firstName}</span>
                                            <small style={{ opacity: "0.7" }}>{f.idUser.lastName} {f.idUser.firstName}</small>
                                        </div>

                                    </Link>
                                </div>

                                {
                                    (user.follows.following.find(_ => _.idFollower.idUser === f.idUser.idUser)
                                    && auth.user.idUser === idUser
                                    && <button className="btn btn-outline-danger" key={f.idUser.idUser} onClick={() =>handleUnfollow(f.idUser.idUser)}>UnFollow</button>) ||
                                    (user.follows.following.find(_ => _.idFollower.idUser !== f.idUser.idUser)
                                    && auth.user.idUser === idUser
                                    && <button className="btn btn-outline-info" key={f.idUser.idUser} onClick={() =>handleFollow(f.idUser.idUser)}>Follow</button>)
  /*                                   auth.user.idUser === idUser
                                    && <button className="btn btn-outline-danger" key={f.idUser.idUser}>Follow</button>
                                    || "" */
                                }
                            </div>
                        )) || ""
                    }
                </div>
            </Modal>
        </div>
    );
}

export default FollowerModal;