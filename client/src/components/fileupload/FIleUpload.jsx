import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed

const FileUpload = () => {
  let apiUrl = "http://localhost:5000/api";
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleReadClick = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(formData);

      // need to replace url
      const response = await axios.post(`${apiUrl}/file-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input
        type="file"
        accept=".txt"  // Adjust the accepted file types as needed
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={styles.fileInputLabel}>
        {selectedFile ? `Selected File: ${selectedFile.name}` : 'Choose a File'}
      </label>
      <br />
      <button onClick={handleReadClick} style={styles.readButton}>
        Read
      </button>
    </div>
  );
};

const styles = {
  fileInputLabel: {
    cursor: 'pointer',
    padding: '10px',
    border: '2px solid #2196F3',
    borderRadius: '5px',
    display: 'inline-block',
  },
  readButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FileUpload;
