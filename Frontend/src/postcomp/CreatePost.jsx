import React, { useEffect, useState } from 'react';
import './createpost.css';
import {post} from '../Rest'

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
const [photoData,setPhotoData]=useState([])

useEffect(() => {
  (async ()=>{

    setPhotoData(await Promise.all(
      Array.from(photos).map(async (photo) => {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    ))
  })()
}, [photos])

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(title,destination,date,description,country,state,district,category,photos,photoData.length>0,rating,itinerary){
      await post("post/createpost",{title,destination,date,description,country,state,district,category,photoData,rating,itinerary})
    }
  };
  return (
    <div className="upload-form-container">
      <h2>Upload Travel Log</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>District</label>
          <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <div className="select-wrapper">
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select a category</option>
              <option value="Adventure">Adventure</option>
              <option value="Beach">Beach</option>
              <option value="City">City</option>
              {/* Add more categories as needed */}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Photos</label>
          <input type="file" multiple onChange={(e) => setPhotos(e.target.files)} required />
        </div>
        <div className="form-group">
        <label>Rating</label>
  <div className="rating">
    {[...Array(5)].map((_, index) => (
      <React.Fragment key={index}>
        <input  type="radio" id={`star${index + 1}`} name="rating" value={5 - index} onChange={() => setRating(5 - index)} checked={rating === 5 - index} />
        <label htmlFor={`star${index + 1}`}>★</label>
      </React.Fragment>
    ))}
  </div>
        </div>
        <div className="form-group">
          <label>Travel Itinerary</label>
          <textarea value={itinerary} onChange={(e) => setItinerary(e.target.value)} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CreatePost;
