import React, { useState, useContext, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';
function StatusModal() {
    const state = useContext(GlobalState)
    const { auth, status, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [imagesAfter, setImagesAfter] = useState([])
    const [visible, setVisible] = useState(status)
    const [callback, setCallback] = state.postAPI.callback

    useEffect(() => {
        console.log(status.onEdit)
        console.log({ images })
        console.log({ imagesAfter })
    }, [images])

    const handleChangeImages = async e => {
        e.preventDefault()

        const files = e.target.files[0]
        let newImages = []
        let after = []

        console.log(files.type)

        if (!files) return alert("File not exist.")

        if (files.size > 10 * 1024 * 1024) // 1mb
            return alert("Size too large!")

        let formData = new FormData()
        formData.append('files', files)

        if (files.type == 'image/jpeg' || files.type == 'image/png') {
            const res = await axios.post('/api2/upload/image', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${auth.token}` }
            })

            if (status.onEdit) {
                after.push({
                    media: {
                        public_id: res.data.public_id,
                        url: res.data.url
                    },
                    typeMedia: res.data.typeMedia
                })
            }

            newImages.push({
                media: {
                    public_id: res.data.public_id,
                    url: res.data.url
                },
                typeMedia: res.data.typeMedia
            })

        }

        if (files.type == 'video/mp4') {
            const res = await axios.post('/api2/upload/video', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: `Bearer ${auth.token}` }
            })

            if (status.onEdit) {
                after.push({
                    media: {
                        public_id: res.data.public_id,
                        url: res.data.url
                    },
                    typeMedia: res.data.typeMedia
                })
            } 
            newImages.push({
                media: {
                    public_id: res.data.public_id,
                    url: res.data.url
                },
                typeMedia: res.data.typeMedia
            })
        }

        setImages([...images, ...newImages])

        if (status.onEdit) {
            console.log('test 234')
            setImagesAfter([...imagesAfter, ...after])
        }

        //console.log(images)
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)

        if (status.onEdit) {
            status.medias.map(async _ => (
                await axios.delete(`/api2/post/delete_media/${_.idMedia}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            ))

        }
    }

    const handleSubmit = async (e) => {



        if (status.onEdit) {

            if(!content){
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: 'Content should not be empty'
                    }
                })

                dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }

            await axios.put(`/api2/post/update_content/${status.idPost}`, { content: content }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
            })

            if(imagesAfter.length > 0){
                await axios.put(`/api2/post/update_media/${status.idPost}`, { media: imagesAfter }, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                })
            }

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    success: 'Update success'
                }
            })

        } else {
            //console.log('test')
            const res = await axios.post('/api2/post/create', { content: content, media: images }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    success: res.data.msg
                }
            })
        }


        dispatch({ type: GLOBALTYPES.STATUS, payload: false })

        setCallback(!callback)
        setVisible(status)
        setImages([])
    }

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content)
            setImages(status.medias)
        }
    }, [status])

    return (
        <div className="status_modal">
            <Modal title="Create Post"
                visible={visible}
                onCancel={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
                footer={[
                    <div className="status_footer">
                        <button className="btn btn-secondary w-100" type="submit" onClick={handleSubmit}>
                            Post
                        </button>
                    </div>
                ]}
            >
                <form>
                    <div className="status_body">
                        <textarea name="content"
                            placeholder={`${auth.user.firstName}, what are you thinking?`}
                            onChange={e => setContent(e.target.value)}
                            value={content} />


                        <div className="show_images">
                            {
                                images.map((img, index) => (
                                    img.typeMedia == 'image' &&
                                    <div key={index} id="file_img">
                                        <img src={img.media.url} alt="images" class="img-thumbnail" style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
                                        <span onClick={() => deleteImages(index)}>&times; </span>
                                    </div>
                                    || img.typeMedia == 'video' &&
                                    <div key={index} id="file_img">
                                        <video controls src={img.media.url} alt="images" class="img-thumbnail" style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }} />
                                        <span onClick={() => deleteImages(index)}>&times; </span>
                                    </div>
                                ))
                            }
                        </div>


                        <div className="input_images">
                            <div className="file_upload">
                                <i className="fas fa-image" />
                                <input type="file" name="file" id="file"
                                    multiple accept="image/*,video/*" onChange={handleChangeImages} />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default StatusModal;