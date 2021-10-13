import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { GLOBALTYPES } from '../../../redux/actions/index';

function InputComment({ post,idComment, reply}) {


    
    const { auth} = useSelector(state => state)
    const state = useContext(GlobalState)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [callback, setCallback] = state.postAPI.callback

    const changeComment = async e => {
        //console.log(e.target.value)
        setComment(e.target.value)
    }

    const handleComment = async () => {
        try {

            if(reply){
                //console.log(idComment)
                const res = await axios.post(`/api2/comment/reply/${idComment}`, { content: comment }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })

                console.log({res})
            }else{
                await axios.post(`/api2/comment/${post.idPost}`, { content: comment }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }

            /*             console.log(res)
                        dispatch({ 
                            type: GLOBALTYPES.ALERT, 
                            payload: {
                                success: res.data.msg
                            } 
                        }) */

            setCallback(!callback)
            setComment('')
            dispatch({ type: GLOBALTYPES.REPLY, payload: false })

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
            <form style={{width:'100%'}} >
                <input
                    style={{width:'100%'}}
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
                    <i className="far fa-paper-plane" onClick={handleComment} ></i>
                </div>
                <div className="newsfeed__comment-box-icon">
                    <i className="fas fa-camera" />
                </div>
                <div className="newsfeed__comment-box-icon">
                    <i className="far fa-sticky-note" />
                </div>
            </div>
        </>
    );
}

export default InputComment;