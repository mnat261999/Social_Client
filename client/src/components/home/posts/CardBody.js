import React, { useContext,useState } from 'react';
import { GlobalState } from '../../../GlobalState'
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import ButtonLike from './ButtonLike';
import axios from 'axios';

function CardBody({ post }) {
    const { auth} = useSelector(state => state)
    const state = useContext(GlobalState)
    const [readMore, setReadMore] = state.postAPI.readMore
    const [isLike, setLike] = state.postAPI.isLike
    const [callback, setCallback] = state.postAPI.callback

    const handleLike = async () =>{
        const res = await axios.post(`/api2/like/${post.idPost}`,' ',{
            headers: { Authorization: `Bearer ${auth.token}` }
        })

        //console.log(res)
        setLike(true)
        setCallback(!callback)
    }
    const handleUnLike = async () =>{
        await axios.delete(`/api2/like/${post.idPost}`,{
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        setLike(false)
        setCallback(!callback)
    }
    return (
        <>
            <div className="newsfeed__content">
                <p className="newsfeed__content-text">
                    {
                        post.content.length < 60
                            ? post.content
                            : readMore ? post.content + " " : post.content.slice(0, 60) + '...'
                    }
                    {
                        post.content.length > 60 &&
                        <span className="readMore" onClick={() => setReadMore(!readMore)}>
                            {readMore ? 'Hide content' : 'Read more'}
                        </span>

                    }
                </p>
                {
                    post.medias.length > 0
                    &&
                    <Carousel >
                        {
                            post.medias.map(m => (
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
                    <span className="newsfeed__respond-react-total">{post.likes.length}</span>
                </div>
                <div style={{ display: "flex" }} className="newsfeed__respond-right">
                    <span>{post.comments.length} bình luận</span>
                </div>
            </div>
            <ul data-index={0} className="newsfeed__action">
                <ButtonLike isLike={isLike}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
                />
                <li className="newsfeed__action-item comment-action">
                    <i className="far fa-comment-alt newsfeed__action-item-icon" />
                    <span className="newsfeed__action-item-text">Bình luận</span>
                </li>
                <li className="newsfeed__action-item">
                    <i className="fas fa-share newsfeed__action-item-icon" />
                    <span className="newsfeed__action-item-text">Chia sẻ</span>
                </li>
            </ul>
        </>
    );
}

export default CardBody;