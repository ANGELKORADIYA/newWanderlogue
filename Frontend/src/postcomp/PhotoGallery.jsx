import React, { useState } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './photogallery.css';

const PhotoGallery = ({ photos, showName }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <Box className="photo-gallery">
      <Paper elevation={3} sx={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Box className="photo-container">
          {photos.length > 0 && (
            <>
              <img src={photos[currentPhotoIndex].src} alt={`Photo ${currentPhotoIndex + 1}`} />
              {showName && (
                <Typography variant="caption" className="photo-name">
                  {photos[currentPhotoIndex].name}
                </Typography>
              )}
            </>
          )}
          <Box className="overlay">
            <IconButton className="prev" onClick={goToPreviousPhoto}>
              <ArrowBack />
            </IconButton>
            <IconButton className="next" onClick={goToNextPhoto}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      <Box className="photo-indicator">
        {photos.length > 0 && `${currentPhotoIndex + 1}/${photos.length}`}
      </Box>
    </Box>
  );
};

export default PhotoGallery;
