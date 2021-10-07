import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalState } from '../../GlobalState'
//import { Carousel } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
//import moment from 'moment';
import { GLOBALTYPES } from '../../redux/actions';
import CardHeader from './posts/CardHeader';
import CardBody from './posts/CardBody';
import CardFooter from './posts/CardFooter';
import Comments from './comments/Comments';

function CardPost() {
    //const { auth, theme, reply } = useSelector(state => state)
    const state = useContext(GlobalState)
    const [posts] = state.postAPI.posts
    //const [users] = state.userAPI.users
    const [total] = state.postAPI.total
    const [result] = state.postAPI.result
    const [page, setPage] = state.postAPI.page
    //const [callback, setCallback] = state.postAPI.callback
    //const [readMore, setReadMore] = state.postAPI.readMore
    //const [comment, setComment] = useState('')
    //const dispatch = useDispatch()
    /* 
        const changeComment = async e => {
    
            setComment(e.target.value)
        }
    
        const handleComment = async (id) => {
            try {
                const res = await axios.post(`/api2/comment/${id}`, { content: comment }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
                setCallback(!callback)
                setComment('')
    
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: err.response
                    }
                })
            }
        } */
    return (
        <>
            <InfiniteScroll
                dataLength={total} //This is important field to render the next data
                next={result < page * 3 ? "" : () => setPage(page + 1)}
                hasMore={true}
                loader={<h3 className="text-center mt-6">Loading...</h3>}
            >
                {
                    posts.map(_ => (
                        <div className="newsfeed posts" data-index={0}>
                            <CardHeader key={_.idPost} post={_} />

                            <CardBody key={_.idPost} post={_} />


                            <div className="newsfeed__comment">
                                <CardFooter key={_.idPost} post={_} />
                                <Comments key={_.idPost} post={_}/>
{/*                                 {
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
                                                                <div>
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
                                                                    <div className="commented-box__item-reaction" data-index={2}>
                                                                        {
                                                                            reply &&
                                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({ type: GLOBALTYPES.REPLY, payload: false })}>
                                                                                Hủy
                                                                            </span>
                                                                            ||
                                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({ type: GLOBALTYPES.REPLY, payload: true })}>
                                                                                Phản hồi
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="comment-three-dot">
                                                                    <i class="fas fa-ellipsis-v"></i>
                                                                </div>
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
                                                 {
                                                    reply &&
                                                    <div className="newsfeed__comment-user mt-2" style={{ paddingLeft: '36px' }}>
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
                                                        <div className="newsfeed__comment-box" key={_.idPost}>
                                                            <form >
                                                                <input
                                                                    data-index={0}
                                                                    type="text"
                                                                    placeholder="Viết bình luận ..."
                                                                    className="newsfeed__comment-input"
                                                                    onChange={changeComment}
                                                                    value={comment}
                                                                />
                                                            </form>
                                                            <div className="newsfeed__comment-box-right">
                                                                <div className="newsfeed__comment-box-icon test">
                                                                    <i className="far fa-paper-plane" onClick={() => handleComment(_.idPost)} ></i>
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
                                                    || ""
                                                } 
                                            </div>
                                        </div>
                                    ))
                                } */}
                            </div>
                        </div>
                    ))
                }
            </InfiniteScroll>
        </>
    );
}

export default CardPost;