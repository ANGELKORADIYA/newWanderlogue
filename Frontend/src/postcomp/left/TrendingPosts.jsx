import React, { useEffect, useState } from 'react';
import { post } from '../../Rest';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const fetchedTrendingPosts = await post('post/trending');
      setTrendingPosts(fetchedTrendingPosts);
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h3>Trending Posts</h3>
      <ul>
        {trendingPosts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;