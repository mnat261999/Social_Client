import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getFollow } from '../redux/actions/userAction'
import { getAvaByUser } from '../redux/actions/avatarAction'
import { GLOBALTYPES } from '../redux/actions';
import FollowingModal from '../components/home/follows/FollowingModal';
import FollowerModal from '../components/home/follows/FollowerModal';
import ProfileModal from '../components/profile/ProfileModal';
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import ProfileTab from '../components/profile/ProfileTab';
import FollowBtn from '../components/profile/FollowBtn';

function Profile() {
    const state = useContext(GlobalState)
    const { auth, user, ava, following, profile, follower } = useSelector(state => state)
    const params = useParams()
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    const [length, setLength] = useState(false)
    const [callbackProfile] = state.userAPI.callbackProfile
    const [userId, setUserId] = state.postAPI.userId
    const [postsByUser] = state.postAPI.postsByUser

    console.log(params.id)

/*     useEffect(() =>{
        console.log('test')
    }) */


     useEffect(() => {
        console.log('test')
        dispatch(getAvaByUser(params.id))
        setUserId(params.id)
        if (params.id == auth.user.idUser) {
            setCheck(true)

            dispatch(getFollow(auth.user.idUser))
            if (auth.user.avas.length == 0) {
                setLength(false)
            } else { setLength(true) }
        } else {
            console.log('profile')
            setCheck(false)
            dispatch(getUser(params.id))
            dispatch(getFollow(params.id))
        }
    }, [callbackProfile, params.id, auth.user.idUser, setCheck, dispatch, setLength]) 



    return (
        <>
            {check && following && <FollowingModal idUser={auth.user.idUser} />}
            {check && follower && <FollowerModal idUser={auth.user.idUser} />}
            {!check && following && <FollowingModal idUser={user.user.idUser} />}
            {!check && follower && <FollowerModal idUser={user.user.idUser} />}
            {profile && <ProfileModal />}
            <div className="profile">
                <div className="info">
                    <div className="info_container">

                        {
                            ((check && ava.avatarCurrent != undefined)
                                && <img
                                    src={ava.avatarCurrent.avatar.url}
                                    alt="avatar"
                                    className="supper-avatar"
                                    style={{ filter: "invert(0)" }}
                                />)

                            || ((check && ava.avatarCurrent == undefined) && <img
                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                alt="avatar"
                                className="supper-avatar"
                                style={{ filter: "invert(0)" }}
                            />)
                        }

                        {
                            (!check && ava.avatarCurrent != undefined) ?
                                <img
                                    src={ava.avatarCurrent.avatar.url}
                                    alt="avatar"
                                    className="supper-avatar"
                                    style={{ filter: "invert(0)" }}
                                />
                            : (!check && ava.avatarCurrent == undefined) && <img
                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                alt="avatar"
                                className="supper-avatar"
                                style={{ filter: "invert(0)" }}
                            />
                        }
                        <div className="info_content">
                            <div className="info_content_title">
                                {
                                    check && <h2>{auth.user.lastName} {auth.user.firstName}</h2>
                                }
                                {
                                    !check && <h2>{user.user.lastName} {user.user.firstName}</h2>
                                }

                                {
                                    check ?
                                        <button className="btn btn-outline-info" onClick={() => dispatch({ type: GLOBALTYPES.PROFILE, payload: true })}>
                                            Edit Profile
                                        </button> : <FollowBtn u={user} />

                                }
                            </div>
                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => dispatch({ type: GLOBALTYPES.FOLLOWER, payload: true })}>{user.follows.totalFollower} Followers</span>
                                <span className="ml-4" onClick={() => dispatch({ type: GLOBALTYPES.FOLLOWING, payload: true })}>{user.follows.totalFollowing} Following</span>
                            </div>
                            <p className="m-0" />
                            {
                                check && <h6 className="m-0">{auth.user.email}</h6>
                            }
                            {
                                !check && <h6 className="m-0">{user.user.email}</h6>
                            }

                            {
                                check && <p className="m-0">{auth.user.phone}</p>
                            }
                            {
                                !check && <p className="m-0">{user.user.phone}</p>
                            }

                            <a href target="_blank" rel="noreferrer" />
                            <p />
                        </div>
                    </div>
                </div>

                <ProfileTab list={ava.listAva} posts={postsByUser} idUser={userId}/>
            </div>
        </>
    );
}

export default Profile;