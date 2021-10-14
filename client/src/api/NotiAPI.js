import axios from 'axios';
import React, { useEffect, useState } from 'react';

function NotiAPI(token) {

    const [notis, setNotis] = useState([])
    const [notisNotMark, setNotisNotMark] = useState([])
    const [notiNotMarkTotal, setNotiNotMarkTotal] = useState(0)
    const [callbackNoti, setCallbackNoti] = useState(false)

    useEffect(()=>{
        const getNotis = async () =>{
            const res = await axios.get(`/api1/notification/getbyuser`,{
                headers: {Authorization: `Bearer ${token}`}
            })

            setNotis(res.data.listNoti)
            setNotisNotMark(res.data.listNotiNotMark)
            setNotiNotMarkTotal(res.data.listNotiNotMarkTotal)
        }

        getNotis()

    },[callbackNoti,token])
    return {
        notis:[notis, setNotis],
        notisNotMark:[notisNotMark, setNotisNotMark],
        notiNotMarkTotal:[notiNotMarkTotal, setNotiNotMarkTotal],
        callbackNoti:[callbackNoti, setCallbackNoti] ,
    }
}

export default NotiAPI;