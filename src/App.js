import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Viewer from './Viewer';
import ARViewer from './ARViewer';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/3d-viewer" element={<Viewer />} />
        <Route path="/ar-viewer" element={<ARViewer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
