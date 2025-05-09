import React, { useEffect, useState } from "react";
import "../styles/Gallery.css";

const Gallery = ({ currentUser }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // for modal view

  useEffect(() => {
    const loadPhotos = () => {
      const storedPhotos = localStorage.getItem('donatedPhotos');
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    };

    loadPhotos();
    window.addEventListener('storageUpdate', loadPhotos);

    return () => {
      window.removeEventListener('storageUpdate', loadPhotos);
    };
  }, []);

  const handleDeletePhoto = (photoId) => {
    const photoToDelete = photos.find(photo => photo.id === photoId);
    
    if (!currentUser || (photoToDelete.username !== currentUser.username)) {
      alert("You can only delete your own uploads!");
      return;
    }

    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    localStorage.setItem('donatedPhotos', JSON.stringify(updatedPhotos));
    setPhotos(updatedPhotos);
    window.dispatchEvent(new Event('storageUpdate'));
  };

  // const handleDeleteAllPhotos = () => {
  //   if (window.confirm("Are you sure you want to delete all donated photos?")) {
  //     localStorage.removeItem('donatedPhotos');
  //     setPhotos([]);
  //     window.dispatchEvent(new Event('storageUpdate'));
  //   }
  // };

  return (
    <div className="gallery-container">
      <h2>Donated Food Gallery</h2>
{/* 
      {photos.length > 0 && (
        <button className="delete-all-btn" onClick={handleDeleteAllPhotos}>
          Delete All Photos
        </button>
      )} */}

      {photos.length === 0 ? (
        <p className="no-photos-message">No donations have been uploaded yet.</p>
      ) : (
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <div className="photo-image-container">
                <img
                  src={photo.imageUrl}
                  alt="Donated Food"
                  className="photo-image"
                  onClick={() => setSelectedImage(photo.imageUrl)}
                />
              </div>
              <div className="photo-info">
                <p className="uploader-name">
                  <strong>Uploaded by:</strong> {photo.uploadedBy} 
                  {photo.username && <span className="username">(@{photo.username})</span>}
                </p>
                <p className="upload-date">{new Date(photo.uploadDate).toLocaleDateString()}</p>
                {photo.description && <p className="photo-description">{photo.description}</p>}
                
                {currentUser && photo.username === currentUser.username && (
                  <button 
                    className="delete-photo-btn" 
                    onClick={() => handleDeletePhoto(photo.id)}
                  >
                    Delete Photo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full view" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
