// import React, { useEffect, useState } from "react";
// import "../styles/Gallery.css";

// const Gallery = () => {
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     // Load photos from localStorage
//     const loadPhotos = () => {
//       const storedPhotos = localStorage.getItem('donatedPhotos');
//       if (storedPhotos) {
//         setPhotos(JSON.parse(storedPhotos));
//       }
//     };

//     loadPhotos();

//     // Set up an event listener to reload when localStorage changes
//     window.addEventListener('storageUpdate', loadPhotos);

//     return () => {
//       window.removeEventListener('storageUpdate', loadPhotos);
//     };
//   }, []);

//   return (
//     <div className="gallery-container">
//       <h2>Donated Food Gallery</h2>
//       {photos.length === 0 ? (
//         <p className="no-photos-message">No donations have been uploaded yet.</p>
//       ) : (
//         <div className="photo-grid">
//           {photos.map((photo, index) => (
//             <div key={index} className="photo-card">
//               <div className="photo-image-container">
//                 <img src={photo.imageUrl} alt="Donated Food" className="photo-image" />
//               </div>
//               <div className="photo-info">
//                 <p className="uploader-name"><strong>Uploaded by:</strong> {photo.uploadedBy}</p>
//                 <p className="upload-date">{new Date(photo.uploadDate).toLocaleDateString()}</p>
//                 {photo.description && <p className="photo-description">{photo.description}</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;


import React, { useEffect, useState } from "react";
import "../styles/Gallery.css";

const Gallery = ({ currentUser }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Load photos from localStorage
    const loadPhotos = () => {
      const storedPhotos = localStorage.getItem('donatedPhotos');
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    };

    loadPhotos();

    // Set up an event listener to reload when localStorage changes
    window.addEventListener('storageUpdate', loadPhotos);

    return () => {
      window.removeEventListener('storageUpdate', loadPhotos);
    };
  }, []);

  // Function to delete a photo
  const handleDeletePhoto = (photoId) => {
    // Only allow deletion if the user is the one who uploaded the photo
    // or if the user is an admin (if you implement admin roles later)
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

  return (
    <div className="gallery-container">
      <h2>Donated Food Gallery</h2>
      
      {photos.length === 0 ? (
        <p className="no-photos-message">No donations have been uploaded yet.</p>
      ) : (
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <div className="photo-image-container">
                <img src={photo.imageUrl} alt="Donated Food" className="photo-image" />
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

      {/* <div className="storage-info">
        <h3>About Photo Storage</h3>
        <p>Photos are currently stored in your browser's local storage, which means:</p>
        <ul>
          <li>They will persist until you clear your browser data</li>
          <li>They are only visible on this device</li>
          <li>Storage capacity is limited (approximately 5MB)</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Gallery;