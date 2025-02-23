import React, { useState, useEffect } from 'react';
import PostDetails from './PostDetails';
import './randomposts.css';
import { post } from '../Rest';
import { Link } from 'react-router-dom';
import GoogleAdsComponent from './GoogleAds';
import { Box, Button, CircularProgress } from '@mui/material';

const RandomPosts = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      fetchMorePosts();
    }
  };

  const fetchMorePosts = async () => {
    setIsLoading(true);
    const newPosts = await post('post/fetch-posts');
    setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMorePosts();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoadMore = async () => {
    fetchMorePosts();
  };

  return (
    <Box className="grid-container">
      <Box className="sidebar">
        <Link to="/trending">Trending Posts</Link>
        <Link to="/top-commented">Top Commented Posts</Link>
        <Link to="/popular">Popular Posts</Link>
      </Box> 
      <Box className={`random-posts ${props.isSidebarActive ? 'post-list-onsiderbar' : ''}`}>
        {allPosts.length > 0 &&
          allPosts.map((postData, index) => (
            <PostDetails key={index} postData={postData} />
          ))}

        {isLoading && <CircularProgress />}
        {!isLoading && <Button onClick={handleLoadMore} className='loadmore'>Load More ...</Button>}
      </Box>
      <Box className="ads">
        <GoogleAdsComponent />
      </Box>  
    </Box>
  );
};

export default RandomPosts;
