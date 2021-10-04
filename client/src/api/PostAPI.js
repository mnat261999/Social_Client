import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function PostsAPI(token) {
    const [posts, setPosts] = useState([])
    const [callback, setCallback] = useState(false)
    
    useEffect(() =>{
        const getPosts = async () =>{
            const res = await axios.get(`/api2/post/getall`,{
                headers: {Authorization: `Bearer ${token}`}
            })

            setPosts(res.data)

        }
        getPosts()
    },[callback])

    return {
        posts: [posts, setPosts],
        callback:[callback, setCallback]
    }
}

export default PostsAPI;