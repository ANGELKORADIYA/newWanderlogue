import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FavoriteBorder, Comment, Favorite } from "@mui/icons-material";
import PhotoGallery from "./PhotoGallery";
import "./postdetails.css";
import { post } from "../Rest";

const PostDetails = ({ postData }) => {
  const [isliked, setIsliked] = useState(false);
  const [howmanyliked, sethowmanyliked] = useState(0);
  useEffect(() => {
    (async () => {
      const {likedset,likedhowmany}=await post("favorites/get-likes", { postId: postData._id })
      setIsliked(likedset);
      sethowmanyliked(likedhowmany);
    })();
  },[]);
  const {
    title,
    destination,
    description,
    location,
    photoData,
    date,
    author,
    category,
    rating,
    itinerary,
  } = postData;

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };
  const handleLike = async() => {
    const {likedset,likedhowmany}=await post("favorites/post-likes", { postId: postData._id })
    sethowmanyliked(likedhowmany);
    setIsliked(likedset);
  };
  return (
    <Box className="post-details-container">
      <PhotoGallery photos={photoData} />
      <Box className="post-details">
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
        <Box className="info">
          <Typography variant="body2">Location: {location}</Typography>
          <Typography variant="body2">Category: {category}</Typography>
          <Typography variant="body2">Rating: {renderRatingStars()}</Typography>
          <Typography variant="body2">Itinerary: {itinerary}</Typography>
        </Box>
        <Box className="actions">
          <IconButton>
            {isliked ? (
              <Favorite onClick={handleLike} />
            ) : (
              <FavoriteBorder onClick={handleLike} />
            )}
            {howmanyliked>0? howmanyliked: ""}
          </IconButton>

          <IconButton>
            <Comment />
          </IconButton>
        </Box>
      </Box>
      <Box className="location">
        <Typography variant="body2">Destination: {destination}</Typography>
        <Typography variant="body2">Date: {date}</Typography>
        <Typography variant="body2">Author: {author}</Typography>
      </Box>
    </Box>
  );
};

export default PostDetails;
