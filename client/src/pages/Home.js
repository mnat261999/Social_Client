import React from 'react';
import { Row, Col } from 'antd';
import Status from '../components/home/Status';
import CardPost from '../components/home/CardPost';

function Home() {
    return (
        <div>
            <Row gutter={[48, 40]} >
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} lx={{ span: 16 }}>
                    <Status/>
                    <CardPost/>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} lx={{ span: 8 }}>
                    TEST
                </Col>

            </Row>
        </div>
    );
}

export default Home;