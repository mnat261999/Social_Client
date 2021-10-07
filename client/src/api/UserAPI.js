import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function UserAPI(token) {
    const [users, setUser] = useState([])
    const [suggest, setSuggest] = useState([])
    const [callback, setCallback] = useState(false)
   
    useEffect(() =>{
        const getUsers = async () =>{
            const res = await axios.get(`/api1/user/all`)

            //console.log(res)

            setUser(res.data.userList)

        }
        getUsers()

        const getSuggest = async () =>{
            const res = await axios.get(`/api1/user/all_user`,{
                headers: {Authorization: `Bearer ${token}`}
            })

            console.log(res)

            setSuggest(res.data.userList)

        }
        getSuggest()

    },[callback])

    return {
        users: [users, setUser] ,
        suggest : [suggest, setSuggest],
        callback: [callback, setCallback]
    }
}

export default UserAPI;