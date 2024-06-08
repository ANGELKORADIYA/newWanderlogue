import React, { useState, useEffect } from "react";
import PostDetails from "../postcomp/PostDetails";
import { post } from "../Rest";
function CommentHolder(props) {
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setposts([]); // Clear previous posts
      const fetchedPosts = await post(`post/my-comments`);
      setposts(fetchedPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div
      className={`random-posts  ${
        props.isSidebarActive ? "post-list-onsiderbar" : ""
      }`}
    >
      {posts.map((postData, index) => (
        <>
          <PostDetails key={index} postData={postData} />
        </>
      ))}

      {isLoading && <p className="loadmore">Loading...</p>}
      {posts.length == 0 && !isLoading && <p>You dont have any posts </p>}
    </div>
  );
}

export default CommentHolder;
