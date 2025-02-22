import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { FavoriteBorder, Comment, Favorite } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import PhotoGallery from "./PhotoGallery";
import "./postdetails.css";
import { post } from "../Rest";
import CommentPopup from "../gencomment/CommentPopup";
import { toast } from 'react-toastify';

const PostDetails = ({ postData }) => {
  const [comments, setComments] = useState([]);
  const [yourComments, setYourComments] = useState([]);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);

  const [isSkeleton, setIsSkeleton] = useState(true);
  const [isliked, setIsliked] = useState(false);
  const [howmanyliked, sethowmanyliked] = useState(0);
  useEffect(() => {
    setIsSkeleton(true);

    (async () => {
      const { likedset, likedhowmany } = await post("favorites/get-likes", {
        postId: postData._id,
      });
      setIsliked(likedset);
      sethowmanyliked(likedhowmany);
      setIsSkeleton(false);
    })();
  }, []);
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
  const handleLike = async () => {
    setIsSkeleton(true);
    try {
      const { likedset, likedhowmany } = await post("favorites/post-likes", {
        postId: postData._id,
      });
      sethowmanyliked(likedhowmany);
      setIsliked(likedset);
      toast.success('Post liked successfully!',{ position: "bottom-center",});
    } catch (error) {
      toast.error('Failed to like post. Please try again.',{ position: "bottom-center",});
    } finally {
      setIsSkeleton(false);
    }
  };

  const handleOpenCommentPopup = async() => {
    try {
      const res = await post("comments/get-comments", {
        postId: postData._id,
      });
      setYourComments(res.yourComments);
      setComments(res.comments);
      setIsCommentPopupOpen(true);
      // toast.success('Comments fetched successfully!',{ position: "bottom-center",});
    } catch (error) {
      toast.error('Failed to fetch comments. Please try again.',{ position: "bottom-center",});
    }
  };
  const handleCloseCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };
  const handleAddComment = async(newComment) => {
    try {
      const res = await post("comments/post-comments", {
        postId: postData._id,
        content: newComment.content,
      });
      setYourComments([...yourComments, newComment]);
      toast.success('Comment added successfully!',{ position: "bottom-center"});
    } catch (error) {
      toast.error('Failed to add comment. Please try again.',{ position: "bottom-center",});
    }
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
            {isSkeleton ? (
              <CircularProgress size={24} />
            ) : isliked ? (
              <>
                <Favorite onClick={handleLike} />
                {howmanyliked > 0 ? howmanyliked : ""}
              </>
            ) : (
              <>
                <FavoriteBorder onClick={handleLike} />
                {howmanyliked > 0 ? howmanyliked : ""}
              </>
            )}
          </IconButton>

          <IconButton onClick={handleOpenCommentPopup}>
            <Comment />
          </IconButton>
          <CommentPopup
            open={isCommentPopupOpen}
            handleClose={handleCloseCommentPopup}
            comments={comments}
            handleAddComment={handleAddComment}
            yourComments={yourComments}

          />
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
