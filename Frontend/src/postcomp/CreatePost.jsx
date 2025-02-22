import React, { useEffect, useState } from 'react';
import './createpost.css';
import { post } from '../Rest';
import { toast } from 'react-toastify';
import { Box, TextField, Button, Typography, MenuItem, CircularProgress } from '@mui/material';
import PhotoGallery from './PhotoGallery';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(3);
  const [itinerary, setItinerary] = useState('');
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setPhotoData(
        await Promise.all(
          Array.from(photos).map(async (photo) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            return new Promise((resolve, reject) => {
              reader.onload = () => resolve({ src: reader.result, name: photo.name });
              reader.onerror = (error) => reject(error);
            });
          })
        )
      );
    })();
  }, [photos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    document.body.style.cursor = 'wait';

    if (
      title &&
      destination &&
      date &&
      description &&
      country &&
      state &&
      district &&
      category &&
      photos &&
      photoData.length > 0 &&
      rating &&
      itinerary
    ) {
      try {
        await post('post/createpost', {
          title,
          destination,
          date,
          description,
          country,
          state,
          district,
          category,
          photoData,
          rating,
          itinerary,
        });
        toast.success('Post created successfully!', { position: 'bottom-center' });
        setTitle('');
        setDestination('');
        setDate('');
        setDescription('');
        setCountry('');
        setState('');
        setDistrict('');
        setCategory('');
        setPhotos([]);
        setRating(3);
        setItinerary('');
        setPhotoData([]);
      } catch (error) {
        toast.error('Failed to create post. Please try again.', { position: 'bottom-center' });
      } finally {
        setLoading(false);
        document.body.style.cursor = 'default';
      }
    }
  };
  return (
    <Box className="upload-form-container" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Upload Travel Log</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          fullWidth
          margin="normal"
        >
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Beach">Beach</MenuItem>
          <MenuItem value="City">City</MenuItem>
          {/* Add more categories as needed */}
        </TextField>
        <Box sx={{ my: 3, p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Choose Photos
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => setPhotos(e.target.files)}
            />
          </Button>
    
          {photoData.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <PhotoGallery photos={photoData} showName={true} />
            </Box>
          )}
        </Box>
        <Box className="rating" sx={{ marginTop: 4 }}>
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={`star${index + 1}`}
                name="rating"
                value={5 - index}
                onChange={() => setRating(5 - index)}
                checked={rating === 5 - index}
              />
              <label htmlFor={`star${index + 1}`}>★</label>
            </React.Fragment>
          ))}
        </Box>
        <TextField
          label="Travel Itinerary"
          value={itinerary}
          required
          onChange={(e) => setItinerary(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
