import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ButtonLike({ isLike, handleLike, handleUnLike, post }) {
    const { auth } = useSelector(state => state)
    const [liked, setLiked] = useState(false)
    //console.log(post)
    useEffect(() =>{
        if(post.likes.find(_ => _.idUserCreator === auth.user.idUser)){
            setLiked(true)
        }
        return () => setLiked(false)
    },[post.likes,auth.user.idUser])
    return (
        <>
            {
                (isLike && liked)  ?
                    <li className="newsfeed__action-item active reaction" onClick={handleUnLike}>
                        <i className="fas fa-thumbs-up newsfeed__action-item-icon" />
                        <span className="newsfeed__action-item-text">Thích</span>
                    </li>
                    :
                    <li className="newsfeed__action-item  reaction" onClick={handleLike}>
                        <i className="fas fa-thumbs-up newsfeed__action-item-icon" />
                        <span className="newsfeed__action-item-text">Thích</span>
                    </li>
            }
        </>
    );
}

export default ButtonLike;