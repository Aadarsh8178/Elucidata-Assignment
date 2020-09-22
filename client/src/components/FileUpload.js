import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setLoading }) {
  const [file, setFile] = useState(""); // storing the uploaded file
  const handleChange = (e) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/upload", formData);
      setLoading(false);
      console.log(res);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleChange}
        className="btn btn-secondary"
      />
      <button onClick={uploadFile} className="m-4 btn btn-primary">
        Upload
      </button>
    </div>
  );
}
export default FileUpload;
