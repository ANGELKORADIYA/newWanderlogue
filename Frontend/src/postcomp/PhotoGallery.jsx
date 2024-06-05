import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './photogallery.css';

const PhotoGallery = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <Box className="photo-gallery">
      <Box className="photo-container">
        {photos.length>0&&<img src={photos[currentPhotoIndex]} alt={`Photo ${currentPhotoIndex + 1}`} />}
        <Box className="overlay">
          <IconButton className="prev" onClick={goToPreviousPhoto}>
            <ArrowBack />
          </IconButton>
          <IconButton className="next" onClick={goToNextPhoto}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
      <Box className="photo-indicator">{`${currentPhotoIndex + 1}/${photos.length}`}</Box>
    </Box>
  );
};

export default PhotoGallery;
