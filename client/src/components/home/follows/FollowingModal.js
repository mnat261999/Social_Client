import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../../redux/actions';
import { Link } from 'react-router-dom';
import { getFollow } from '../../../redux/actions/userAction'
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';



function FollowingModal({idUser}) {
    const state = useContext(GlobalState)
    //console.log(idUser)
    const { auth, following, user } = useSelector(state => state)
    const [visible] = useState(following)
    const [callbackFollow, setCallbackFollow] = useState(false)
    const [callback, setCallback] = state.userAPI.callback

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getFollow(idUser))
    },[dispatch,idUser,callbackFollow])

    const handleUnfollow = async (id) =>{
        console.log(id)
       const res = await axios.delete(`/api1/follows/unfollow/${id}`,{
            headers: {Authorization: `Bearer ${auth.token}`}  
        })
        console.log(res)
        setCallbackFollow(!callbackFollow)
        setCallback(!callback)
    }

    return (
        <div>
            <Modal title="Following"
                visible={visible}
                onCancel={() => dispatch({ type: GLOBALTYPES.FOLLOWING, payload: false })}
                footer={[
                ]}
            >
                <div className='follow_content'>
                    {
                        user.follows.following.length > 0 &&
                        user.follows.following.map(f => (
                            <div className="d-flex p-2 align-items-center justify-content-between w-100 undefined">
                                <div>
                                    <Link
                                        className="d-flex align-items-center"
                                        to={`/profile/${f.idFollower.idUser}`}
                                    >

                                        {
                                            f.idFollower.avas.length == 0
                                            && <img
                                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                alt="avatar"
                                                className="big-avatar"
                                                style={{ filter: "invert(0)" }}
                                            />
                                        }

                                        {
                                            f.idFollower.avas.length > 0
                                            && f.idFollower.avas.map(a => (
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
                                        {/*                                      <img
                                            src=""
                                            alt="avatar"
                                            className="big-avatar"
                                            style={{ filter: "invert(0)" }}
                                        /> */}
                                        <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                                            <span className="d-block">{f.idFollower.lastName} {f.idFollower.firstName}</span>
                                            <small style={{ opacity: "0.7" }}>{f.idFollower.lastName} {f.idFollower.firstName}</small>
                                        </div>
                                    </Link>
                                </div>
                                {
                                    auth.user.idUser === idUser
                                    && <button className="btn btn-outline-danger" key={f.idFollower.idUser} onClick={() =>handleUnfollow(f.idFollower.idUser)}>UnFollow</button>
                                    || ""
                                }
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </div>
    );
}

export default FollowingModal;