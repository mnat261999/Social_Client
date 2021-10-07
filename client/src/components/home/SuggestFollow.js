import axios from 'axios';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { GLOBALTYPES } from '../../redux/actions';

function SuggestFollow() {
    const state = useContext(GlobalState)
    const { auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [suggest, setSuggest] = state.userAPI.suggest
    const [callback, setCallback] = state.userAPI.callback


    const handleFollow = async (id) =>{
        try {
            const res =await axios.post(`/api1/follows/${id}`," ",{
                headers: {Authorization: `Bearer ${auth.token}`}  
            })
            setCallback(!callback)
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
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                <i className="fas fa-redo" style={{ cursor: "pointer" }} />
            </div>
            {
                suggest.map(s => (
                    <>
                        <div className="suggestions">
                            <div className="d-flex p-2 align-items-center justify-content-between w-100 undefined">
                                <div>
                                    <Link
                                        className="d-flex align-items-center"
                                        to={`/profile/${s.idUser}`}
                                    >
                                        {
                                            s.avas.length == 0
                                            && <img
                                                src="https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"
                                                alt="avatar"
                                                className="big-avatar"
                                                style={{ filter: "invert(0)" }}
                                            />
                                        }

                                        {
                                            s.avas.length > 0
                                            && s.avas.map(a => (
                                                a.checkNow == true
                                                &&
                                                <img
                                                    src={a.avatar.url}
                                                    alt="avatar"
                                                    className="big-avatar"
                                                    style={{ filter: "invert(0)" }}
                                                />
                                            ))
                                        }
                                        {/*                                       <img
                                            src=""
                                            alt="avatar"
                                            className="big-avatar"
                                            style={{ filter: "invert(0)" }}
                                        /> */}
                                        <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                                            <span className="d-block">{s.lastName} {s.firstName}</span>
                                            <small style={{ opacity: "0.7" }}>{s.lastName} {s.firstName}</small>
                                        </div>
                                    </Link>
                                </div>
                                <button className="btn btn-outline-info" key={s.idUser} onClick={() => handleFollow(s.idUser)} >Follow</button>
                            </div>

                        </div>
                    </>
                ))
            }
        </div>
    );
}

export default SuggestFollow;