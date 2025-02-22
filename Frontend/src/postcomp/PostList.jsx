import React, { useEffect, useState } from 'react';
import PostDetails from './PostDetails';
import './postlist.css';
import { post } from '../Rest';
import { Link } from 'react-router-dom';
import GoogleAdsComponent from './GoogleAds';
import { Box, Typography, Button, CircularProgress, Grid } from '@mui/material';

const PostList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setIsLoading(true);
      setposts([]);
      const fetchedPosts = await post(`post/${props.siteurl}`);
      if (isMounted) {
        setposts(fetchedPosts);
        setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [props.siteurl]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box className="sidebar">
          <Link to="/trending">Trending Posts</Link>
          <Link to="/top-commented">Top Commented Posts</Link>
          <Link to="/popular">Popular Posts</Link>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className={`random-posts ${props.isSidebarActive ? "post-list-onsiderbar" : ""}`}>
          <Grid container spacing={2}>
            {posts.map((postData, index) => (
              <Grid item xs={12} key={index}>
                <PostDetails postData={postData} />
              </Grid>
            ))}
          </Grid>
          {isLoading && <CircularProgress style={{ marginTop: '30px' }}/>}
          {posts.length === 0 && !isLoading && <Typography style={{ marginTop: '30px' }}>You don't have any posts</Typography>}
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box className="ads">
          <GoogleAdsComponent />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PostList;
