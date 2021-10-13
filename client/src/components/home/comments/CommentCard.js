import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../../redux/actions';
import { GlobalState } from '../../../GlobalState'
import moment from 'moment';
import { createFromIconfontCN } from '@ant-design/icons';
import { Menu, Dropdown, Button, Input } from 'antd';
import axios from 'axios';
import InputComment from './InputComment';

const { TextArea } = Input;

function CommentCard({ comment, post }) {

    //console.log(comment)

    const state = useContext(GlobalState)
    const { auth, reply } = useSelector(state => state)
    const [content, setContent] = useState('')
    const [text, setText] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [users] = state.userAPI.users
    const [callback, setCallback] = state.postAPI.callback
    const [update, setUpdate] = useState(false)
    const [check, setCheck] = useState('')
    const [id, setId] = useState('')
    const dispatch = useDispatch()

    const IconFont = createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/font_2850982_xn33b8mvgo.js'
        ],
    });

    useEffect(() => {
        setContent(comment.content)
    }, [comment.content])

    const handleDeleteComment = async (id) => {
        console.log(id)
        try {
            if (id === comment.idComment) {
                await axios.delete(`/api2/comment/${id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }
            else {
                await axios.delete(`/api2/comment/reply/${id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }
            setCallback(!callback)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenEdit = async (id) => {
        setUpdate(!update)
        setId(id)
        if (id === comment.idComment) {
            console.log('text1')
            setCheck('comment')
            setText(comment.content)
        } else {
            console.log('text2')
            setCheck('reply')
            if (comment.replies.find(_ => _.idReply == id)) {
                setText(comment.replies.find(_ => _.idReply == id).content)
            }
        }
    }
    const handleChange = async e => {
        setText(e.target.value)
    }
    const handleCloseEdit = () => {
        setUpdate(!update)
        setText('')
        setId('')
        setCheck('')
    }

    const handleUpdate = async () => {
        try {
            if (id === comment.idComment) {
                await axios.put(`/api2/comment/${id}`, { content: text }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }else{
                await axios.put(`/api2/comment/reply/${id}`, { content: text }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }
            setCallback(!callback)
            setUpdate(!update)
            setText('')
            setId('')
            setCheck('')
        } catch (error) {
            console.log(error)
        }
    }



    const menu = (id) => {
        return <>
            <Menu>
                <Menu.Item key='1' onClick={() => handleOpenEdit(id)} icon={<IconFont type="icon-edit" />}>
                    Chỉnh sửa
                </Menu.Item>
                <Menu.Item key='2' onClick={() => handleDeleteComment(id)} icon={<IconFont type="icon-delete1" />}>
                    Xóa
                </Menu.Item>
            </Menu>
        </>
    };
    return (
        <>
            <div style={{ display: "block" }} className="newsfeed__commented-box">
                <div className="commented-box active mt-3">
                    <div className="commented-box__item">
                        <div className="commented-box__item-user">
                            <div className="commented-box__item-avatar">
                                {
                                    users.find(_ => _.idUser === comment.idUserCreator)
                                    && users.find(_ => _.idUser === comment.idUserCreator).avas.length > 0
                                    && users.find(_ => _.idUser === comment.idUserCreator).avas.map(_ => (
                                        _.checkNow == true &&
                                        <Link to={`/profile/${comment.idUserCreator}`}>
                                            <img src={_.avatar.url} alt />
                                        </Link>

                                    )) ||
                                    <Link to={`/profile/${comment.idUserCreator}`}>
                                        <img
                                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                        />
                                    </Link>
                                }
                            </div>
                            <div className="commented-box__item-info">
                                <div className="wrap">
                                    <div className="comented-box__parent">
                                        <div className="comented-box__item-content">
                                            <div className="comented-box__item-name">
                                                <Link to={`/profile/${comment.idUserCreator}`}>
                                                    {
                                                        users.find(_ => _.idUser === comment.idUserCreator)
                                                        && users.find(_ => _.idUser === comment.idUserCreator).lastName + " " + users.find(_ => _.idUser === comment.idUserCreator).firstName
                                                        || ""
                                                    }
                                                </Link>
                                            </div>
                                            {
                                                (update && (check === 'comment')) ?
                                                    <TextArea
                                                        value={text}
                                                        autoSize={{ minRows: 5, maxRows: 15 }}
                                                        onChange={handleChange}
                                                    />
                                                    //<textarea className="comented-box__textarea" rows="7" defaultValue={text} onChange={handleChange}/>
                                                    :
                                                    <div className="comented-box__item-text">
                                                        {
                                                            content.length < 100 ? content :
                                                                readMore ? content + ' ' : content.slice(0, 100) + '...'
                                                        }
                                                        {
                                                            content.length > 100 &&
                                                            <span style={{ fontSize: '1rem' }} className="readMore" onClick={() => setReadMore(!readMore)}>
                                                                {readMore ? 'Hide content' : 'Read more'}
                                                            </span>

                                                        }
                                                    </div>
                                            }

                                        </div>
                                        {
                                            (update && (check === 'comment')) ?
                                                <div className="commented-box__item-reaction" data-index={2}>
                                                    {

                                                        <>
                                                            <span className='font-weight-bold mr-3'>{moment(comment.createdAt).fromNow()}</span>
                                                            <span className="commented-box__item-reaction--respond active" onClick={handleCloseEdit}>
                                                                Hủy
                                                            </span>
                                                            <span className="ml-2 commented-box__item-reaction--respond active" onClick={handleUpdate}>
                                                                Cập Nhật
                                                            </span>

                                                        </>
                                                    }
                                                </div> :
                                                <div className="commented-box__item-reaction" data-index={2}>
                                                    {
                                                        reply.check && reply.comment === comment.idComment && !reply.rep &&
                                                        <>
                                                            <span className='font-weight-bold mr-3'>{moment(comment.createdAt).fromNow()}</span>
                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({ type: GLOBALTYPES.REPLY, payload: false })}>
                                                                Hủy
                                                            </span>

                                                        </>
                                                        ||
                                                        <>
                                                            <span className='font-weight-bold mr-3'>{moment(comment.createdAt).fromNow()}</span>
                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({
                                                                type: GLOBALTYPES.REPLY, payload: {
                                                                    check: true,
                                                                    comment: comment.idComment,
                                                                    rep: false
                                                                }
                                                            })}>
                                                                Phản hồi
                                                            </span>

                                                        </>
                                                    }
                                                </div>
                                        }
                                    </div>

                                    {
                                        auth.user.idUser === comment.idUserCreator
                                        && <div className="comment-three-dot">
                                            <Dropdown.Button overlay={() => menu(comment.idComment)} placement="bottomCenter" icon={<IconFont type="icon-menudots" />} />
                                        </div>
                                        || ""
                                    }
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
                        reply.check && reply.comment === comment.idComment && !reply.rep &&
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
                            <div className="newsfeed__comment-box" key={post.idPost}>
                                <InputComment key={post.idPost}
                                    idComment={comment.idComment}
                                    reply={true} />
                            </div>
                        </div>
                        || ""
                    }
                </div>
            </div>
            {
                comment.replies.length > 0 &&
                comment.replies.map(r => (
                    <>
                        <div className="pl-5">
                            <div style={{ display: "block" }} className="newsfeed__commented-box">
                                <div className="commented-box active mt-3">
                                    <div className="commented-box__item">
                                        <div className="commented-box__item-user">
                                            <div className="commented-box__item-avatar">
                                                {
                                                    users.find(_ => _.idUser === r.idUserCreator)
                                                    && users.find(_ => _.idUser === r.idUserCreator).avas.length > 0
                                                    && users.find(_ => _.idUser === r.idUserCreator).avas.map(_ => (
                                                        _.checkNow == true &&
                                                        <Link to={`/profile/${r.idUserCreator}`}>
                                                            <img src={_.avatar.url} alt />
                                                        </Link>

                                                    )) ||
                                                    <Link to={`/profile/${r.idUserCreator}`}>
                                                        <img
                                                            src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                        />
                                                    </Link>
                                                }
                                            </div>
                                            <div className="commented-box__item-info">
                                                <div className="wrap">
                                                    <div style={{ width: '100%' }}>
                                                        <div className="comented-box__item-content">
                                                            <div className="comented-box__item-name">
                                                                <Link to={`/profile/${r.idUserCreator}`}>
                                                                    {
                                                                        users.find(_ => _.idUser === r.idUserCreator)
                                                                        && users.find(_ => _.idUser === r.idUserCreator).lastName + " " + users.find(_ => _.idUser === r.idUserCreator).firstName
                                                                        || ""
                                                                    }
                                                                </Link>
                                                            </div>
                                                            {
                                                                (update && (check === 'reply')) ?
                                                                    <TextArea
                                                                        value={text}
                                                                        autoSize={{ minRows: 5, maxRows: 15 }}
                                                                        onChange={handleChange}
                                                                    />
                                                                    :
                                                                    <div className="comented-box__item-text">
                                                                        {
                                                                            r.content.length < 100 ? r.content :
                                                                                readMore ? r.content + ' ' : r.content.slice(0, 100) + '...'
                                                                        }
                                                                        {
                                                                            r.content.length > 100 &&
                                                                            <span style={{ fontSize: '1rem' }} className="readMore" onClick={() => setReadMore(!readMore)}>
                                                                                {readMore ? 'Hide content' : 'Read more'}
                                                                            </span>

                                                                        }
                                                                    </div>
                                                            }
                                                        </div>
                                                        {
                                                            (update && (check === 'reply')) ?
                                                                <div className="commented-box__item-reaction" data-index={2}>
                                                                    {

                                                                        <>
                                                                            <span className='font-weight-bold mr-3'>{moment(comment.createdAt).fromNow()}</span>
                                                                            <span className="commented-box__item-reaction--respond active" onClick={handleCloseEdit}>
                                                                                Hủy
                                                                            </span>
                                                                            <span className="ml-2 commented-box__item-reaction--respond active" onClick={handleUpdate}>
                                                                                Cập Nhật
                                                                            </span>

                                                                        </>
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="commented-box__item-reaction" data-index={2}>
                                                                    {
                                                                        reply.check && reply.comment === comment.idComment && reply.rep === r.idReply &&
                                                                        <>
                                                                            <span className='font-weight-bold mr-3'>{moment(r.createdAt).fromNow()}</span>
                                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({ type: GLOBALTYPES.REPLY, payload: false })}>
                                                                                Hủy
                                                                            </span>

                                                                        </>
                                                                        ||
                                                                        <>
                                                                            <span className='font-weight-bold mr-3'>{moment(r.createdAt).fromNow()}</span>
                                                                            <span className="commented-box__item-reaction--respond active" onClick={() => dispatch({
                                                                                type: GLOBALTYPES.REPLY, payload: {
                                                                                    check: true,
                                                                                    comment: comment.idComment,
                                                                                    rep: r.idReply
                                                                                }
                                                                            })}>
                                                                                Phản hồi
                                                                            </span>

                                                                        </>
                                                                    }
                                                                </div>
                                                        }
                                                    </div>

                                                    {
                                                        auth.user.idUser === r.idUserCreator
                                                        && <div className="comment-three-dot">
                                                            <Dropdown.Button key={r.idReply} overlay={() => menu(r.idReply)} placement="bottomCenter" icon={<IconFont type="icon-menudots" />} />
                                                        </div>
                                                        || ""
                                                    }
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
                                        reply.check && reply.comment === comment.idComment && reply.rep === r.idReply &&
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
                                            <div className="newsfeed__comment-box" key={post.idPost}>
                                                <InputComment key={post.idPost}
                                                    idComment={comment.idComment}
                                                    reply={true} />
                                            </div>
                                        </div>
                                        || ""
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    );
}

export default CommentCard;