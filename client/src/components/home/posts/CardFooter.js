import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { GLOBALTYPES } from '../../../redux/actions/index';
import InputComment from '../comments/InputComment';

function CardFooter({post}) {
    const { auth} = useSelector(state => state)
    return (
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
            <div className="newsfeed__comment-box" key={post.idPost}>
                <InputComment post={post} reply={false}/>
            </div>
        </div>
    );
}

export default CardFooter;