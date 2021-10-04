import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../GlobalState'
import { Carousel } from 'antd';
function CardPost() {
    const { auth, theme } = useSelector(state => state)
    const state = useContext(GlobalState)
    const [posts, setPosts] = state.postAPI.posts
    const [users, setUser] = state.userAPI.users

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };


    return (
        <>
            {
                posts.map(_ => (
                    <div className="newsfeed" data-index={0}>
                        <div className="newsfeed__info">
                            <div className="newsfeed__info-profile">
                                {
                                    /*                                     users.find(_ => _.idUser === _.idUser)
                                                                        && users.find(_ => _.idUser === _.idUser).avas.length === 0
                                                                        && <img className="newsfeed__-profile-avt"
                                                                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                                        />
                                                                        || */
                                    users.find(_ => _.idUser === _.idUser)
                                    && users.find(_ => _.idUser === _.idUser).avas.length > 0
                                    && users.find(_ => _.idUser === _.idUser).avas.map(_ => (
                                        _.checkNow == true &&
                                        <img className="newsfeed__-profile-avt"
                                            src={_.avatar.url}
                                        />
                                    )) || <img className="newsfeed__-profile-avt"
                                        src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                    />

                                }
                                <div className="newsfeed__info-profile-more">
                                    <span className="newsfeed__info-name checked">
                                        {users.find(_ => _.idUser === _.idUser) && users.find(_ => _.idUser === _.idUser).lastName + " " + users.find(_ => _.idUser === _.idUser).firstName || ""}
                                    </span>
                                    <div className="newsfeed__info-time">
                                        1 phút trước
                                    </div>
                                </div>
                            </div>
                            <div className="newsfeed__info-setting more-dots">
                                <i className="fas fa-ellipsis-h" />
                            </div>
                        </div>
                        <div className="newsfeed__content">
                            <p className="newsfeed__content-text">{_.content}</p>
                            {
                                _.medias.length > 0
                                &&
                                <Carousel >
                                    {
                                        _.medias.map(m => (
                                            m.typeMedia == "image"
                                            &&
                                            <div>
                                                <img className="d-block w-100" controls src={m.media.url}></img>
                                            </div>
                                            ||
                                            <div>
                                                <video className="d-block w-100" controls src={m.media.url}></video>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                                || ""
                            }
                        </div>
                        <div className="newsfeed__respond">
                            <div
                                title={6800}
                                style={{ display: "flex" }}
                                className="newsfeed__respond-react"
                            >
                                <div className="newsfeed__respond-react-icon">
                                    <i className="fas fa-thumbs-up" />
                                </div>
                                <span className="newsfeed__respond-react-total">{_.likes.length}</span>
                            </div>
                            <div style={{ display: "flex" }} className="newsfeed__respond-right">
                                <span>{_.comments.length} bình luận</span>
                            </div>
                        </div>
                        <ul data-index={0} className="newsfeed__action">
                            <li className="newsfeed__action-item  reaction">
                                <i className="fas fa-thumbs-up newsfeed__action-item-icon" />
                                <span className="newsfeed__action-item-text">Thích</span>
                            </li>
                            <li className="newsfeed__action-item comment-action">
                                <i className="far fa-comment-alt newsfeed__action-item-icon" />
                                <span className="newsfeed__action-item-text">Bình luận</span>
                            </li>
                            <li className="newsfeed__action-item">
                                <i className="fas fa-share newsfeed__action-item-icon" />
                                <span className="newsfeed__action-item-text">Chia sẻ</span>
                            </li>
                        </ul>
                        <div className="newsfeed__comment">
                            <div className="newsfeed__comment-user">
                                {
                                    auth.user.avas.length > 0
                                    && <img
                                        src={auth.user.avas[0].avatar.url}
                                        alt=""
                                        className="nav-wall newsfeed__comment-img avt"
                                    /> ||
                                    <img className="newsfeed__-profile-avt"
                                        src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                    />
                                }
                                <div className="newsfeed__comment-box">
                                    <input
                                        data-index={0}
                                        type="text"
                                        placeholder="Viết bình luận ..."
                                        className="newsfeed__comment-input"
                                    />
                                    <div className="newsfeed__comment-box-right">
                                        <div className="newsfeed__comment-box-icon test">
                                            <i className="far fa-laugh-beam" />
                                        </div>
                                        <div className="newsfeed__comment-box-icon">
                                            <i className="fas fa-camera" />
                                        </div>
                                        <div className="newsfeed__comment-box-icon">
                                            <i className="far fa-sticky-note" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                _.comments.length > 0
                                && _.comments.map(c => (
                                    <div style={{ display: "block" }} className="newsfeed__commented-box">
                                        <div className="commented-box active mt-3">
                                            <div className="commented-box__item">
                                                <div className="commented-box__item-user">
                                                    <div className="commented-box__item-avatar">
                                                        {
                                                            users.find(_ => _.idUser === c.idUserCreator)
                                                            && users.find(_ => _.idUser === c.idUserCreator).avas.length > 0
                                                            && users.find(_ => _.idUser === c.idUserCreator).avas.map(_ => (
                                                                _.checkNow == true &&
                                                                <img src={_.avatar.url} alt />
                                                            )) || <img
                                                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                            />
                                                        }
                                                    </div>
                                                    <div className="commented-box__item-info">
                                                        <div className="wrap">
                                                            <div className="comented-box__item-content">
                                                                <div className="comented-box__item-name">
                                                                    {
                                                                        users.find(_ => _.idUser === c.idUserCreator)
                                                                        && users.find(_ => _.idUser === c.idUserCreator).lastName + " " + users.find(_ => _.idUser === c.idUserCreator).firstName
                                                                        || ""
                                                                    }
                                                                </div>
                                                                <div className="comented-box__item-text">
                                                                    {c.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="commented-box__item-reaction" data-index={2}>
                                                            <span className="commented-box__item-reaction--respond active">
                                                                Phản hồi
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        data-index={2}
                                                        className="commented-box__item-delete"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i className="fad fa-trash-alt" />
                                                    </div>
                                                </div>
                                                <div
                                                    style={{ display: "none" }}
                                                    className="commented-box__item-respond-list"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default CardPost;