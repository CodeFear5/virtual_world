import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';
import './ARViewer.css';
import { initializeApp, getApps } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfWYRWOQyNrn9WGv3Wfz_EM47ZpbL_Yqs",
  authDomain: "virtual-world-84ce0.firebaseapp.com",
  projectId: "virtual-world-84ce0",
  storageBucket: "virtual-world-84ce0.appspot.com",
  messagingSenderId: "306111432374",
  appId: "1:306111432374:web:1b7d4cfea3b7ab7ef123f7",
  measurementId: "G-1K1M3CNJR7"
};

// Initialize Firebase if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const storage = getStorage(app);

const ARViewer = () => {
  const [modelSrc, setModelSrc] = useState('');
  const [firebaseFiles, setFirebaseFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);

  // Handle file upload from local storage
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
      const url = URL.createObjectURL(file);
      setModelSrc(url);
    } else {
      alert('Please upload a .glb or .gltf file');
    }
  };

  // Trigger file input for local upload
  const triggerFileInput = () => {
    inputFileRef.current.click();
  };

  // Handle file upload from Firebase
  const handleFirebaseFileUpload = async (url) => {
    setLoading(true);
    setModelSrc(url);
    setLoading(false);
  };

  // Load available files from Firebase
  const loadFirebaseFiles = async () => {
    const listRef = ref(storage, '/');
    const res = await listAll(listRef);
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      })
    );
    setFirebaseFiles(files);
  };

  // Load Firebase files on component mount
  useEffect(() => {
    loadFirebaseFiles();
  }, []);

  return (
    <div className="ar-viewer-container">
      {/* Local file upload button */}
      <button className="upload-button" onClick={triggerFileInput}>Upload 3D Model</button>
      <input
        type="file"
        accept=".glb,.gltf"
        style={{ display: 'none' }}
        ref={inputFileRef}
        onChange={handleFileUpload}
      />

      {/* Firebase file selection */}
      <div className="firebase-file-selector">
        <label>Select 3D Model from Firebase:</label>
        <select onChange={(e) => handleFirebaseFileUpload(e.target.value)}>
          <option value="">Select a model...</option>
          {firebaseFiles.map((file) => (
            <option key={file.url} value={file.url}>
              {file.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Viewer */}
      {modelSrc && (
        <div className="model-viewer-container">
          <model-viewer
            src={modelSrc}
            alt="A 3D model"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            style={{ width: '100%', height: '500px' }}
            touch-action="manipulation"
            interaction-prompt="when-focused"
            environment-image="neutral"
            exposure="1"
            shadow-intensity="1"
            shadow-softness="0.5"
            min-camera-orbit="auto auto 0deg"
            max-camera-orbit="auto auto 360deg"
            min-field-of-view="10deg"
            max-field-of-view="45deg"
          >
            <button className="ar-button" slot="ar-button">View in AR</button>
          </model-viewer>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default ARViewer;
