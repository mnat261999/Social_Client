import React, { useContext } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../GlobalState';
import { Carousel } from "react-bootstrap";
import axios from 'axios';
import { GLOBALTYPES } from '../../redux/actions';

const { Meta } = Card;

function ProfilePost({ posts, idUser }) {

    //console.log(posts)

    const state = useContext(GlobalState)
    const [readMore, setReadMore] = state.postAPI.readMore
    const [callback, setCallback] = state.postAPI.callback
    const dispatch = useDispatch()

    const { auth } = useSelector(state => state)


    const IconFont = createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/font_2850982_hjpzburceo7.js'
        ],
    });

    const handleDeletePost = async (id) =>{
        const res = await axios.delete(`/api2/post/${id}`,{
            headers: { Authorization: `Bearer ${auth.token}` }
        })

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
        setCallback(!callback)
    }
    return (
        <div className="profile_post">
            <Row gutter={[24, 24]}>
                {
                    posts.map(p => (
                        <Col span={8}>
                            <Card
                                style={{ width: 350 }}
                                cover={
                                    p.medias.length > 0
                                        ?
                                        <Carousel>
                                            {
                                                p.medias.map(m => (
                                                    m.typeMedia == "image"
                                                    &&
                                                    <Carousel.Item>
                                                        <img
                                                            className="card-img-top"
                                                            src={m.media.url}
                                                            alt="First slide"
                                                        />
                                                    </Carousel.Item>
                                                    ||
                                                    <Carousel.Item>
                                                        <video
                                                            controls
                                                            className="card-img-top"
                                                            src={m.media.url}
                                                            alt="First slide"
                                                        />
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>
                                        : ""
                                }
                                actions={
                                    idUser === auth.user.idUser ?
                                        [
                                            <Row justify="center" align="middle">
                                                <Col span={4}>{p.likes.length}</Col>
                                                <Col span={4}><IconFont type="icon-like" /></Col>
                                            </Row>,
                                            <IconFont type="icon-view" />,
                                            <IconFont type="icon-delete1" key={p.idPost} onClick={() => handleDeletePost(p.idPost)}/>,
                                        ]
                                        :
                                        [
                                            <Row justify="center" align="middle">
                                                <Col span={4}>{p.likes.length}</Col>
                                                <Col span={4}><IconFont type="icon-like" /></Col>
                                            </Row>,
                                            <IconFont type="icon-view" />
                                        ]
                                }
                            >
                                <p className="newsfeed__content-text">
                                    {
                                        p.content.length < 50
                                            ? p.content
                                            : readMore ? p.content + " " : p.content.slice(0, 50) + '...'
                                    }
{/*                                     {
                                        p.content.length > 20 &&
                                        <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                            {readMore ? 'Hide content' : 'Read more'}
                                        </span>

                                    } */}
                                </p>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default ProfilePost;