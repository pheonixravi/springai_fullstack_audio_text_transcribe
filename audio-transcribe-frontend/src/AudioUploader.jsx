import { useState } from "react";
//import React, { useState } from "react";
import axios from "axios";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      alert("Error transcribing audio");
    }
  };
  return (
    <div className="container">
      <h1>Audito to Text Transcriber</h1>
      <div className="file-input">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <button className="upload-btn" onClick={handleUpload}>
        Upload Audio
      </button>
      <div className="transcription-result">
        <h2>Transcription Result:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioUploader;
