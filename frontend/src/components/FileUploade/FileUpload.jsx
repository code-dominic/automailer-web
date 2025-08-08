import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FileUpload = ({token , needRefresh , setNeedRefresh }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure "file" matches the multer field name


    try {
      const response = await axios.post(`${backendURL}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
          "authorization" : token
          
        },
      });
      setNeedRefresh(needRefresh+1);
      alert(needRefresh);
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      alert("Failed to upload the file. Check the console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 2.2)"}}>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>Submit</Button>
      </Form>
    </div>
  );
};


export default FileUpload;
