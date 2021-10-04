import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function UserAPI() {
    const [users, setUser] = useState([])
    
   
    useEffect(() =>{
        const getUsers = async () =>{
            const res = await axios.get(`/api1/user/all`)

            //console.log(res)

            setUser(res.data.userList)

        }
        getUsers()
    },[])

    return {
        users: [users, setUser] 
    }
}

export default UserAPI;