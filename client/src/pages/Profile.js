import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getFollow } from '../redux/actions/userAction'
import { getAvaByUser } from '../redux/actions/avatarAction'
import { GLOBALTYPES } from '../redux/actions';
import FollowModal from '../components/home/follows/FollowModal';

function Profile() {
    const { auth, user, ava , following} = useSelector(state => state)
    const params = useParams()
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    const [infor, setInfor] = useState([])

    useEffect(() => {
        if (params.id == auth.user.idUser) {
            setCheck(true)
            setInfor(auth.user)
            dispatch(getFollow(auth.user.idUser))
        } else {
            console.log('profile')
            dispatch(getUser(params.id))
            setInfor(user.user)
            dispatch(getAvaByUser(params.id))
            dispatch(getFollow(params.id))
        }
    }, [params.id, auth.user.idUser, setCheck, dispatch])

    if (infor.length === 0) return null;

    console.log(infor)

    return (
        <>
         {following && <FollowModal idUser={infor.idUser}/>}
        <div className="profile">
            <div className="info">
                <div className="info_container">
                    {
                        check && auth.user.avas.length > 0 &&
                        <img
                            src={auth.user.avas}
                            alt="avatar"
                            className="supper-avatar"
                            style={{ filter: "invert(0)" }}
                        />
                    }

                    {
                        !check && infor.avas.length > 0 &&
                        <img
                            src={infor.avas[0].avatar.url}
                            alt="avatar"
                            className="supper-avatar"
                            style={{ filter: "invert(0)" }}
                        />
                        || <img
                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                            alt="avatar"
                            className="supper-avatar"
                            style={{ filter: "invert(0)" }}
                        />
                    }
                    {/*                      <img
                        src={check && auth.user.avas || infor.avas[0].avatar.url  }
                        alt="avatar"
                        className="supper-avatar"
                        style={{ filter: "invert(0)" }}
                    />  */}
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{infor.lastName} {infor.firstName}</h2>
                            <button className="btn btn-outline-info">{check && 'Edit Profile' || 'Follow'}</button>
                        </div>
                        <div className="follow_btn">
                            <span className="mr-4">{user.follows.totalFollower} Followers</span>
                            <span className="ml-4" onClick={() => dispatch({ type: GLOBALTYPES.FOLLOWING, payload: true })}>{user.follows.totalFollowing} Following</span>
                        </div>
                        <p className="m-0" />
                        <h6 className="m-0">{infor.email}</h6>
                        <a href target="_blank" rel="noreferrer" />
                        <p />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Profile;