import React, { useState } from 'react';

const FileDropArea = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // Process the dropped files here
    console.log('Dropped files:', files);
  };

  return (
    <div
      className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drop your files here</p>
    </div>
  );
};

export default FileDropArea;
