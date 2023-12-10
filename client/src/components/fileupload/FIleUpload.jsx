import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed

const FileUpload = () => {
  let apiUrl = "http://localhost:5000/api";
  const [selectedFile, setSelectedFile] = useState(null);
  const[content,setContent]=useState(null);
   const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading,setLoading]=useState(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
  const fetchVoices = async () => {
    console.log("useEffect.... speech");
    const speechSynthesisVoices = window.speechSynthesis.getVoices();
    setVoices(speechSynthesisVoices);
    setLoading(false);  // Set loading to false once voices are fetched
  };

  // Fetch available voices when the component mounts
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = fetchVoices;
  } else {
    fetchVoices();
  }
}, []);

const speakText = (text) => {
  console.log("Speak Text....");
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  if (selectedVoice) {
    speech.voice = selectedVoice;
  }


  // Delay the speak call to ensure other asynchronous operations are complete
  setTimeout(() => {
    
      window.speechSynthesis.speak(speech);
   
  }, 100);
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
      setContent(response.data.content);
      if(response.data.content){
        speakText(response.data.content);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    setSelectedVoice(selectedVoice);
  };

 


  return (
    (!loading)?
     
    (<div style={{ textAlign: 'center', marginTop: '50px' }}>
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
       <select onChange={handleVoiceChange} style={styles.voiceSelect}>
        <option value="">Select a Voice</option>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleReadClick} style={styles.readButton}>
       Upload
      </button>


      
      {
        content && (
          <div>
            <h3>File Content:</h3>
            <p>{content}</p>
          </div>
        )
      }
    </div>
  ):(
    <div>Loading...</div>
  )
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
