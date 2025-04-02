import React from 'react';
import { FaDownload, FaCloudUploadAlt, FaPlay, FaPause } from 'react-icons/fa';

const CardComponent = ({
  handleFileUpload,
  selectedFile,
  firebaseFiles,
  handleSelectChange,
  handleExportToLocal,
  handleExportToFirebase,
  toggleAnimation,
  isAnimationPlaying,
  loading,
  animations,
  handleAnimationSelect,
  selectedAnimation,
}) => {
  return (
    <div className="card">
      <h2>Import</h2>
      <input
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileUpload}
        style={{ fontSize: '18px', padding: '10px', marginBottom: '20px', width: '100%' }}
      />
      
      <select
        value={selectedFile ? selectedFile.name : ''}
        onChange={handleSelectChange}
        style={{ fontSize: '18px', padding: '10px', marginBottom: '20px', width: '100%', color: 'black', backgroundColor: '#61dafb', cursor: 'pointer' }}
      >
        <option value="">Select a file from Firebase</option>
        {firebaseFiles.map(file => (
          <option key={file.name} value={file.name}>{file.name}</option>
        ))}
      </select>
      
      <h2>Export</h2>
      <button onClick={handleExportToLocal} style={{ fontSize: '18px', padding: '10px', marginBottom: '20px' }} title="Export to Local">
        <FaDownload style={{ marginRight: '8px' }} />
        Export to Local
      </button>
      
      <button onClick={handleExportToFirebase} style={{ fontSize: '18px', padding: '10px', marginBottom: '20px' }} title="Export to Firebase">
        <FaCloudUploadAlt style={{ marginRight: '8px' }} />
        Export to Firebase
      </button>
      
      <h2>Animations</h2>
      <button onClick={toggleAnimation} style={{ fontSize: '18px', padding: '10px', marginBottom: '20px' }} title={isAnimationPlaying ? "Pause Animation" : "Play Animation"}>
        {isAnimationPlaying ? <FaPause style={{ marginRight: '8px' }} /> : <FaPlay style={{ marginRight: '8px' }} />}
        {isAnimationPlaying ? "Pause Animation" : "Play Animation"}
      </button>
      
      {animations && animations.length > 0 && (
        <select
          value={selectedAnimation || ''}
          onChange={handleAnimationSelect}
          style={{ fontSize: '18px', padding: '10px', marginBottom: '20px', width: '100%', color: 'black', backgroundColor: '#61dafb', cursor: 'pointer' }}
        >
          <option value="">Select Animation</option>
          {animations.map(animation => (
            <option key={animation.name} value={animation.name}>{animation.name}</option>
          ))}
        </select>
      )}
      
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CardComponent;