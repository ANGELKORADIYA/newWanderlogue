import React, { useEffect, useState } from 'react';
import { post } from '../../Rest';

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      const fetchedPopularPosts = await post('post/popular');
      setPopularPosts(fetchedPopularPosts);
    };

    fetchPopularPosts();
  }, []);

  return (
    <div>
      <h3>Popular Posts</h3>
      <ul>
        {popularPosts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPosts;