import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import InfiniteScroll from 'react-infinite-scroll-component';
import CardHeader from './posts/CardHeader';
import CardBody from './posts/CardBody';
import CardFooter from './posts/CardFooter';
import Comments from './comments/Comments';

function CardPost() {
    const state = useContext(GlobalState)
    const [posts] = state.postAPI.posts
    const [total] = state.postAPI.total
    const [result] = state.postAPI.result
    const [page, setPage] = state.postAPI.page
    return (
        <>
            <InfiniteScroll
                dataLength={total} //This is important field to render the next data
                next={result < page * 3 ? "" : () => setPage(page + 1)}
                hasMore={true}
                loader={<h3 className="text-center mt-6">Loading...</h3>}
            >
                {
                    posts.map(_ => (
                        <div className="newsfeed posts" data-index={0}>
                            <CardHeader key={_.idPost} post={_} />

                            <CardBody key={_.idPost} post={_} />


                            <div className="newsfeed__comment">
                                <CardFooter key={_.idPost} post={_} />
                                <Comments key={_.idPost} post={_}/>
                            </div>
                        </div>
                    ))
                }
            </InfiniteScroll>
        </>
    );
}

export default CardPost;