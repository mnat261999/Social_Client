import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvatarCustom from '../header/AvatarCustom';
import { GLOBALTYPES } from '../../redux/actions';
import { Button } from 'antd';

function Status() {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    return (
        <div className="status my-3 d-flex">
            {
                auth.user.avas.length == 0
                && <AvatarCustom src='https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png' size="big-avatar" /> ||
                <AvatarCustom src={auth.user.avas[0].avatar.url} size="big-avatar" />
            }
            {/* <AvatarCustom src={auth.user.avas[0].avatar.url} size="big-avatar" /> */}
            {/*             <button className="statusBtn flex-fill" onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                {auth.user.firstName}, what are you thinking?
            </button> */}

            <Button className="statusBtn flex-fill" onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                {auth.user.firstName}, what are you thinking?
            </Button>

        </div>
    );
}

export default Status;