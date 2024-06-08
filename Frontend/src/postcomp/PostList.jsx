import React, { useEffect, useState } from 'react';
import PostDetails from './PostDetails';
import './postlist.css';
import { post,get } from '../Rest';

const PostList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const [posts, setposts] = useState([])
  
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchPosts = async () => {
      setIsLoading(true);
      setposts([]); // Clear previous posts
      const fetchedPosts = await post(`post/${props.siteurl}`);
      if (isMounted) {
        setposts(fetchedPosts);
        setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false; // Cleanup function to avoid setting state on unmounted component
    };
  }, [props.siteurl]);

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
