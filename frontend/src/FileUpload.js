import React, { useState } from "react";
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData)
      .then(res => {
        // Handle successful upload
      })
      .catch(error => {
        // Handle error
        console.error('Error uploading file: ', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button type="button" onClick={upload}>Upload</button>
    </div>
  );
}

export default FileUpload;