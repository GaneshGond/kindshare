import React, { useEffect, useState } from "react";
import "../styles/Gallery.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Simulate fetching photos from a backend or local array
    const samplePhotos = [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/300",
        uploadedBy: "Volunteer A",
        description: "Leftover food from wedding",
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/300",
        uploadedBy: "Volunteer B",
        description: "Extra meals from restaurant",
      },
    ];
    setPhotos(samplePhotos);
  }, []);

  return (
    <div className="gallery-container">
      <h2>Donated Food Gallery</h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.imageUrl} alt="Donated Food" />
            <div className="photo-info">
              <p><strong>Uploaded by:</strong> {photo.uploadedBy}</p>
              <p>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
