import React, { useEffect, useState } from 'react';
import CommentDisplay from './CommentDisplay';

function Comments({post}) {

    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [replyComments, setReplyComments] = useState([])
    const [next, setNext] = useState(2)

    useEffect(() => {
        const newCm = post.comments.filter(cm => cm)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))

    },[post.comments,setComments,setShowComments,next])

    useEffect(() => {
        const newRep  = post.comments.filter(cm => cm.replies.length > 0)
        setReplyComments(newRep)
        console.log(newRep)
    },[post.comments,setReplyComments])
    return (
        <>
            {/*           {
              post.comments.length > 0
              && post.comments.map((com) =>(
                  <CommentDisplay key={com.idComment} comment={com} post={post}/>
              ))||""
          }
 */}
            {
                showComments.map((comment, index) => (
                    <CommentDisplay key={comment.idComment} comment={comment} post={post} />
                    
                ))
            }

            {
                comments.length - next > 0
                ? <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(next + 10)}>
                    See more comments...
                </div>

                : comments.length > 2 &&
                <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(2)}>
                    Hide comments...
                </div>
            } 
        </>
    );
}

export default Comments;