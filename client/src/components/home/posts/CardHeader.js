import React, { useContext, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../../GlobalState'
import { GLOBALTYPES } from '../../../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CardHeader({ post }) {
    //console.log({post})
    const { auth } = useSelector(state => state)
    const state = useContext(GlobalState)
    const [users] = state.userAPI.users
    const [callback, setCallback] = state.postAPI.callback
    const [dot, setDot] = useState(false)
    const dispatch = useDispatch()
    const handleEdit = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
    }

    const handleDeletePost = async () => {
        const res = await axios.delete(`/api2/post/${post.idPost}`, {
            headers: { Authorization: `Bearer ${auth.token}` }
        })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
        setCallback(!callback)
    }
    return (
        <div className="newsfeed__info">
            <div className="newsfeed__info-profile">
                {
                    /*                                     users.find(_ => _.idUser === _.idUser)
                                                        && users.find(_ => _.idUser === _.idUser).avas.length === 0
                                                        && <img className="newsfeed__-profile-avt"
                                                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                        />
                                                        || */
                    users.find(_ => _.idUser === post.idUser)
                    && users.find(_ => _.idUser === post.idUser).avas.length > 0
                    && users.find(_ => _.idUser === post.idUser).avas.map(_ => (
                        _.checkNow == true &&
                        <Link to={`/profile/${users.find(_ => _.idUser === post.idUser).idUser}`}>
                            <img className="newsfeed__-profile-avt"
                                src={_.avatar.url}
                            />
                        </Link>
                    )) ||
                    <Link to={`/profile/${users.find(_ => _.idUser === post.idUser).idUser}`}>
                        <img className="newsfeed__-profile-avt"
                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                        />
                    </Link>

                }
                <div className="newsfeed__info-profile-more">
                    <Link to={`/profile/${users.find(_ => _.idUser === post.idUser).idUser}`}>
                        <span className="newsfeed__info-name checked">
                            {users.find(_ => _.idUser === post.idUser) && users.find(_ => _.idUser === post.idUser).lastName + " " + users.find(_ => _.idUser === post.idUser).firstName || ""}
                        </span>
                    </Link>
                    <div className="newsfeed__info-time">
                        {`${moment(post.updatedAt).fromNow()}`}
                    </div>
                </div>
            </div>
            <div className="newsfeed__info-setting more-dots">
                <i className="fas fa-ellipsis-h" onClick={() => setDot(!dot)} />
                {
                    dot &&
                    <ul className="newsfeed__info-setting-list active" data-index={3}>
                        <div>
                            <li className="newsfeed__info-setting-item">
                                <div className="newsfeed__info-setting-item__img">
                                    <i className="fas fa-link" />
                                </div>
                                <div className="newsfeed__info-setting-item__content">
                                    <p className="newsfeed__info-setting-item__text">Nhúng</p>
                                </div>
                            </li>
                            {
                                auth.user.idUser === post.idUser &&
                                <>
                                    <li
                                        style={{ display: "flex" }}
                                        className="newsfeed__info-setting-item edit-post"
                                        onClick={handleEdit}
                                    >
                                        <div className="newsfeed__info-setting-item__img">
                                            <i className="fas fa-history" />
                                        </div>
                                        <div className="newsfeed__info-setting-item__content">
                                            <p className="newsfeed__info-setting-item__text">Chỉnh sửa bài viết</p>
                                        </div>
                                    </li>
                                    <li
                                        style={{ display: "flex" }}
                                        className="newsfeed__info-setting-item delete-post"
                                        onClick={handleDeletePost}
                                    >
                                        <div className="newsfeed__info-setting-item__img">
                                            <i className="fas fa-trash-alt" />
                                        </div>
                                        <div className="newsfeed__info-setting-item__content">
                                            <p className="newsfeed__info-setting-item__text">Xóa bài viết</p>
                                        </div>
                                    </li>
                                </>
                                || ""
                            }
                        </div>
                    </ul>
                    || ""
                }

            </div>
        </div>
    );
}

export default CardHeader;