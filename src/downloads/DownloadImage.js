import React, { useState } from 'react';

function ImageDownloader() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDownload = () => {
    // Use the Fetch API to download the image from the URL
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob data
        const blobUrl = window.URL.createObjectURL(blob);
        setImageData(blobUrl);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Image</button>
      {imageData && (
        <div>
          <img src={imageData} alt="Downloaded" />
          <a href={imageData} download="downloaded_image.png">
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageDownloader;
