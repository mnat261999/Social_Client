import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/index'
import AvatarCustom from './AvatarCustom'
import { GlobalState } from '../../GlobalState'
import { Menu, Dropdown, Row, Col } from 'antd';
import { Divider } from 'antd';
import axios from 'axios'


function MenuHeader() {
    const state = useContext(GlobalState)
    const [notiNotMarkTotal] = state.notiAPI.notiNotMarkTotal
    const [notisNotMark] = state.notiAPI.notisNotMark
    const [callbackNoti, setCallbackNoti] = state.notiAPI.callbackNoti

    const { auth, theme, ava } = useSelector(state => state)

    const dispatch = useDispatch()

    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' }
    ]


    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    const markAsOpenAll = async() =>{
        //console.log(auth.token)
        const res = await axios.put('/api1/notification/mark_open_all',{},{
            headers: { Authorization: `Bearer ${auth.token}` }
        })

        console.log(res)

        setCallbackNoti(!callbackNoti)
    }

    const menu = () => {
        return (
            <Menu>
                <h2 className="noti text-danger">Notification</h2>
                <Divider />
                {
                    notisNotMark.map(m => (
                        (m.notiType == 'follow') ?
                            <>

                                <Row gutter={[8, 8]} justify="start" align="middle">
                                    <Col span={8} style={{paddingLeft:'30px'}}>
                                        <img
                                            src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                                            alt="avatar"
                                            className="big-avatar"
                                            style={{ filter: "invert(0)" }}
                                        />
                                    </Col>
                                    <Col span={16} style={{paddingRight:'30px'}}>
                                        {m.idUserFrom.lastName} {m.idUserFrom.firstName} đã {m.notiType} bạn
                                    </Col>
                                </Row>
                                <Divider />
                            </>
                            :
                            (m.notiType == 'comment' || m.notiType == 'reply' || m.notiType == 'like') ?
                                <>
                                    <Row gutter={[8, 8]} justify="start" align="middle">
                                        <Col span={8} style={{paddingLeft:'30px'}}>
                                            <img
                                                src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                                                alt="avatar"
                                                className="big-avatar"
                                                style={{ filter: "invert(0)" }}
                                            />
                                        </Col>
                                        <Col span={16} style={{paddingRight:'30px'}}>
                                            {m.idUserFrom.lastName} {m.idUserFrom.firstName} đã {m.notiType} bài viết của bạn
                                        </Col>
                                    </Row>
                                    <Divider />
                                </>

                                : ""
                    ))
                }
                <Row gutter={[8, 8]} justify="start" align="middle">
                    <Col span={12}><p className="noti-mark text-danger" onClick={markAsOpenAll}>Đánh dấu đã đọc</p></Col>
                    <Col span={12}><Link className="noti-view text-danger">Xem tất cả</Link></Col>
                </Row>
            </Menu>
        )
    };

    /*     const menu = () => {
            return (
                <div
                    className="dropdown-menu show"
                    aria-labelledby="navbarDropdown"
                    style={{ transform: "translateX(75px)" }}
                >
                    <div style={{ minWidth: 300 }}>
                        <div className="d-flex justify-content-between align-items-center px-3">
                            <h3>Notification</h3>
                            <i
                                className="fas fa-bell-slash text-danger"
                                style={{ fontSize: "1.2rem", cursor: "pointer" }}
                            />
                        </div>
                        <hr className="mt-0" />
                        <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
                            <div className="px-2 mb-3">
                                <a
                                    className="d-flex text-dark align-items-center"
                                    href="/profile/615dbf8ac1f2600015c90e67"
                                >
                                    <img
                                        src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                                        alt="avatar"
                                        className="big-avatar"
                                        style={{ filter: "invert(0)" }}
                                    />
                                    <div className="mx-1 flex-fill">
                                        <div>
                                            <strong className="mr-1">naing</strong>
                                            <span>has started to follow you.</span>
                                        </div>
                                    </div>
                                </a>
                                <small className="text-muted d-flex justify-content-between px-2">
                                    8 days ago
                                </small>
                            </div>
                        </div>
                        <hr className="my-1" />
                        <div className="text-right text-danger mr-2" style={{ cursor: "pointer" }}>
                            Delete All
                        </div>
                    </div>
                </div>
            )
        } */



    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }

                <li className="nav-item dropdown" style={{ opacity: 1 }} >

                    <Dropdown overlay={menu} placement="bottomCenter" arrow>
                        <span className="nav-link position-relative" id="navbarDropdown"
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            <span className="material-icons">
                                notifications
                            </span>

                            <span className="notify_length">{notiNotMarkTotal}</span>

                        </span>
                    </Dropdown>

                    {/*                     <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div> */}

                </li>


                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* <Avatar src="" size="medium-avatar" /> */}
                        {
                            auth.user.avas.length == 0
                            && <AvatarCustom src='https://res.cloudinary.com/lucy2619288/image/upload/v1615978378/avatar/avatar_cugq40.png' size="avatar" /> ||
                            <AvatarCustom src={auth.user.avas[0].avatar.url} size="avatar" />
                        }
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${auth.user.idUser}`}>Profile</Link>

                        <label htmlFor="theme" className="dropdown-item"
                            onClick={() => dispatch({
                                type: GLOBALTYPES.THEME, payload: !theme
                            })}>

                            {theme ? 'Light mode' : 'Dark mode'}
                        </label>

                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default MenuHeader;