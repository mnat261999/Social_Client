import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Image } from 'antd';
import { Row, Col } from 'antd';

function ProfileAva({ listava }) {
    console.log(listava)
    return (
        <Row gutter={[16, 16]}>
            {
                listava.length ?
                    listava.map(_ => (
                        <Col span={6}>
                            <Image
                                width={200}
                                src={_.avatar.url}
                            />
                        </Col>
                    )) : "No Avatar"
            }

        </Row>
    );
}

export default ProfileAva;