import React, { useEffect, useState } from 'react';
import PostDetails from './PostDetails';
import './postlist.css';
import { post,get } from '../Rest';

const PostList = (props) => {
  const [posts, setposts] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {(setposts(await post(`post/${props.siteurl}`))) 
    setIsLoading(false)
  })();
    
  }, [])
  return (<div className={`random-posts  ${props.isSidebarActive?"post-list-onsiderbar":""}`} >
      {posts.map((postData, index) => (
        <>
        <PostDetails key={index} postData={postData} />
        </>
      ))}

      {isLoading && <p className='loadmore' >Loading...</p> }
      {posts.length==0 && !isLoading && <p>You dont have any posts </p>}
      </div>
  );
}; 

export default PostList;
