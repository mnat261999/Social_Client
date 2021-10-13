import { Tabs } from 'antd';

import React from 'react';
import ProfileAva from './ProfileAva';
import ProfilePost from './ProfilePost';

const { TabPane } = Tabs;

function ProfileTab({list, posts, idUser}) {
    const panes = [
        { title: 'Posts', content: <ProfilePost posts={posts} idUser={idUser}/>, key: '1' },
        { title: 'Avatars', content: <ProfileAva listava={list}/> , key: '2' }
    ];
    return (
        <div>
            <Tabs centered>
                {panes.map(_ => (
                    <TabPane tab={_.title} key={_.key}>
                        {_.content}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default ProfileTab;