import React, { useState } from 'react';

const FileViewer = () => {
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const handleViewFile = () => {
    setFileUrl(`/api/get-file?fileName=${encodeURIComponent(fileName)}`);
  };

  return (
    <div>
      <input
        type="text"
        value={fileName}
        onChange={handleInputChange}
        placeholder="Enter file name"
      />
      <button onClick={handleViewFile}>View File</button>
      {fileUrl && (
        <iframe
          src={fileUrl}
          style={{ width: '100%', height: '500px' }}
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
};

export default FileViewer;
