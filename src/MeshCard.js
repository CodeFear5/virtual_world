import React, { useEffect, useState } from 'react';
import './MeshCard.css';

const MeshCard = ({ selectedMesh }) => {
  const [meshProperties, setMeshProperties] = useState({
    color: '#ffffff',
    wireframe: false,
    transparent: false,
    opacity: 1,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    name: '',
  });

  useEffect(() => {
    if (selectedMesh) {
      setMeshProperties({
        color: selectedMesh.material.color.getStyle(),
        wireframe: selectedMesh.material.wireframe,
        transparent: selectedMesh.material.transparent,
        opacity: selectedMesh.material.opacity,
        position: { ...selectedMesh.position },
        rotation: { ...selectedMesh.rotation },
        scale: { ...selectedMesh.scale },
        name: selectedMesh.name || 'Unnamed Mesh',
      });
    }
  }, [selectedMesh]);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setMeshProperties((prevProps) => ({ ...prevProps, color: newColor }));
    selectedMesh.material.color.set(newColor);
  };

  const handleWireframeToggle = (event) => {
    const wireframe = event.target.checked;
    setMeshProperties((prevProps) => ({ ...prevProps, wireframe }));
    selectedMesh.material.wireframe = wireframe;
  };

  const handleTransparencyToggle = (event) => {
    const transparent = event.target.checked;
    setMeshProperties((prevProps) => ({ ...prevProps, transparent }));
    selectedMesh.material.transparent = transparent;
  };

  const handleOpacityChange = (event) => {
    const opacity = parseFloat(event.target.value);
    setMeshProperties((prevProps) => ({ ...prevProps, opacity }));
    selectedMesh.material.opacity = opacity;
    selectedMesh.material.transparent = opacity < 1;
    selectedMesh.material.depthWrite = opacity >= 1;
  };

  const handlePositionChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    setMeshProperties((prevProps) => ({
      ...prevProps,
      position: { ...prevProps.position, [axis]: value },
    }));
    selectedMesh.position[axis] = value;
  };

  const handleRotationChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    setMeshProperties((prevProps) => ({
      ...prevProps,
      rotation: { ...prevProps.rotation, [axis]: value },
    }));
    selectedMesh.rotation[axis] = value;
  };

  const handleScaleChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    setMeshProperties((prevProps) => ({
      ...prevProps,
      scale: { ...prevProps.scale, [axis]: value },
    }));
    selectedMesh.scale[axis] = value;
  };

  if (!selectedMesh) {
    return <div>No mesh selected</div>;
  }

  return (
    <div className="mesh-card">
      <p>Selected Mesh: {meshProperties.name}</p>
      <div>
        <label>
          Color:
          <input type="color" value={meshProperties.color} onChange={handleColorChange} />
        </label>
      </div>
      <div>
        <label>
          Wireframe:
          <input type="checkbox" checked={meshProperties.wireframe} onChange={handleWireframeToggle} />
        </label>
      </div>
      <div>
        <label>
          Transparent:
          <input type="checkbox" checked={meshProperties.transparent} onChange={handleTransparencyToggle} />
        </label>
      </div>
      <div>
        <label>
          Opacity:
          <input type="range" min="0" max="1" step="0.01" value={meshProperties.opacity} onChange={handleOpacityChange} />
        </label>
      </div>
      <div>
        <h4>Position</h4>
        <label>
          X: <input type="number" value={meshProperties.position.x} onChange={handlePositionChange('x')} />
        </label>
        <label>
          Y: <input type="number" value={meshProperties.position.y} onChange={handlePositionChange('y')} />
        </label>
        <label>
          Z: <input type="number" value={meshProperties.position.z} onChange={handlePositionChange('z')} />
        </label>
      </div>
      <div>
        <h4>Rotation</h4>
        <label>
          X: <input type="number" value={meshProperties.rotation.x} onChange={handleRotationChange('x')} />
        </label>
        <label>
          Y: <input type="number" value={meshProperties.rotation.y} onChange={handleRotationChange('y')} />
        </label>
        <label>
          Z: <input type="number" value={meshProperties.rotation.z} onChange={handleRotationChange('z')} />
        </label>
      </div>
      <div>
        <h4>Scale</h4>
        <label>
          X: <input type="number" value={meshProperties.scale.x} onChange={handleScaleChange('x')} />
        </label>
        <label>
          Y: <input type="number" value={meshProperties.scale.y} onChange={handleScaleChange('y')} />
        </label>
        <label>
          Z: <input type="number" value={meshProperties.scale.z} onChange={handleScaleChange('z')} />
        </label>
      </div>
    </div>
  );
};

export default MeshCard;
