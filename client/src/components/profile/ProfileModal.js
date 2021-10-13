import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions';
import axios from 'axios';
import { getUserInfor } from '../../redux/actions/authAction'
import { GlobalState } from '../../GlobalState';

const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
}

function ProfileModal() {
    const state = useContext(GlobalState)
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const [visible] = useState(profile)
    const [callbackProfile, setCallbackProfile] = state.userAPI.callbackProfile
    const [data, setData] = useState(initialState)
    const { firstName, lastName, phone } = data
    const [avatar, setAvatar] = useState(false)

    useEffect(() =>{
        dispatch(getUserInfor(auth.token))
    },[dispatch,auth.token,callbackProfile])

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const files = e.target.files[0]
      
            let formData =  new FormData()
            formData.append('files', files)
      
            const res = await axios.post('/api1/upload/avatar', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${auth.token}` }
            }) 

            console.log(res)
      
            setAvatar(res.data)
        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response
                } 
            })
        }
      }
      

    const updateInfor  =  () => {
            axios.put('/api1/user/update', {
                firstName: firstName ? firstName : auth.user.firstName,
                lastName: lastName ? lastName : auth.user.lastName,
                phone: phone ? phone : auth.user.phone
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })

            setCallbackProfile(!callbackProfile)

            setData({...data})
    }

    const updateAvatar  =  () =>{
        axios.post('/api1/avatar', {avatar:avatar}, {
            headers: { Authorization: `Bearer ${auth.token}` }
        }) 
    }

    const handleUpdate = () => {
        if(firstName || lastName || phone) {
            updateInfor()
            dispatch(getUserInfor(auth.token))
            setCallbackProfile(!callbackProfile)
        }

        if(avatar){
            updateAvatar()
            dispatch(getUserInfor(auth.token))
            setCallbackProfile(!callbackProfile)
        }

        console.log(auth)
        
        dispatch({ type: GLOBALTYPES.PROFILE, payload: false })
    }
        

    return (
        <div>
            <Modal title="Edit Profile"
                visible={visible}
                onCancel={() => dispatch({ type: GLOBALTYPES.PROFILE, payload: false })}
                footer={[
                ]}
            >
                    <div className="edit_profile">
                        <div className="info_avatar">
                            {
                                auth.user.avas.length == 0 &&
                                <img
                                    src={avatar? avatar.url : "https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png"}
                                    alt="avatar"
                                    style={{ filter: "invert(0)" }}
                                />
                            }
                            {
                                auth.user.avas.length > 0 &&
                                <img
                                    src={avatar? avatar.url : auth.user.avas[0].avatar.url}
                                    alt="avatar"
                                    style={{ filter: "invert(0)" }}
                                />
                            }
                            <span>
                                <i className="fas fa-camera" />
                                <p>Change</p>
                                <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar}/>
                            </span>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="firstName">First Name</label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={auth.user.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="lastName">Last Name</label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={auth.user.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" className="form-control" defaultValue={auth.user.phone} onChange={handleChange} />
                        </div>

                        <button className="btn btn-info w-100 mt-5" type="submit" onClick={handleUpdate}>
                            Save
                        </button>
                    </div>
            </Modal>
        </div>
    );
}

export default ProfileModal;