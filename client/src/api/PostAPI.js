import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function PostsAPI(token) {
    const [posts, setPosts] = useState([])
    const [callback, setCallback] = useState(false)
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [total, setTotal] = useState(0)
    const [readMore, setReadMore] = useState(false)
    const [isLike, setLike] = useState(false)
    
    useEffect(() =>{
        const getPosts = async () =>{
            const res = await axios.get(`/api2/post/getall?limit=${page*3}`,{
                headers: {Authorization: `Bearer ${token}`}
            })

            console.log(res)

            setPosts(res.data.posts)
            setResult(res.data.result)
            setTotal(res.data.total)
        }

        

        setTimeout(() => {
            getPosts()
        }, 1000);
        
    },[callback,page])

    return {
        posts: [posts, setPosts],
        callback:[callback, setCallback],
        page:[page, setPage] ,
        result:[result, setResult],
        total:[total, setTotal],
        readMore: [readMore, setReadMore],
        isLike: [isLike, setLike]
    }
}

export default PostsAPI;