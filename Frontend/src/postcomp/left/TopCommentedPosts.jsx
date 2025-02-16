import React, { useEffect, useState } from 'react';
import { post } from '../../Rest';

const TopCommentedPosts = () => {
  const [topCommentedPosts, setTopCommentedPosts] = useState([]);

  useEffect(() => {
    const fetchTopCommentedPosts = async () => {
      const fetchedTopCommentedPosts = await post('post/top-commented');
      setTopCommentedPosts(fetchedTopCommentedPosts);
    };

    fetchTopCommentedPosts();
  }, []);

  return (
    <div>
      <h3>Top Commented Posts</h3>
      <ul>
        {topCommentedPosts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopCommentedPosts;