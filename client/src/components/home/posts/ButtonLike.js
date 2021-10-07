import React from 'react';

function ButtonLike({ isLike, handleLike, handleUnLike }) {
    return (
        <>
            {
                isLike ?
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