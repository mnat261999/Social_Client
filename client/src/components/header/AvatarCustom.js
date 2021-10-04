import React from 'react';
import { useSelector } from 'react-redux'

function AvatarCustom({ src, size}) {
    const { theme } = useSelector(state => state)
    return (
        <img src={src} alt="avatar" className={size} style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}></img>
    );
}

export default AvatarCustom;