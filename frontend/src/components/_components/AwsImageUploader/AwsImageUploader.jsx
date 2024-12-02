// frontend/src/components/_components/AwsImagesUploader/AwsImagesUploader.jsx


import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AwsImageUploader = ({ onSubmit, buttonText = "Upload Image" }) => {
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [showUpload, setShowUpload] = useState(true);

  const handleImgClick = () => {
    console.log("click image");
    setShowUpload(!showUpload);
  };

  const updatedImgFromPC = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewUrl(reader.result);
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(imgUrl);
    setImgUrl("");
    setShowUpload(true);
    setPreviewUrl("");
  };

  return (
    <div className="aws-image-uploader">
      {showUpload && (
        <label htmlFor="file-upload">
          Select From Computer
          <input
            type="file"
            id="file-upload"
            name="img_url"
            onChange={updatedImgFromPC}
            accept=".jpg, .jpeg, .png, .gif"
          />
        </label>
      )}

      {!showUpload && previewUrl && (
        <div className="preview-container">
          <img
            src={previewUrl}
            alt="preview"
            style={{ height: "300px", width: "300px" }}
            className="round"
          />
          <button onClick={handleSubmit} className="_button black block twenty_margin">
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default AwsImageUploader;
