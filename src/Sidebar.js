import React, { useState } from 'react';
import MeshCard from './MeshCard';

const Sidebar = ({
  lightProperties,
  setLightProperties,
  sceneProperties,
  setSceneProperties,
  modelDimensions,
  model,
  selectedMesh,
}) => {
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleChange = (setter, field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (setter, field, subField, value) => {
    setter(prev => ({ ...prev, [field]: { ...prev[field], [subField]: value } }));
  };

  const toggleExpand = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const generateNodeId = (object, parentId = '') => {
    return `${parentId}-${object.name || 'root'}`;
  };

  const printMeshHierarchy = (object, level = 0, parentId = '') => {
    const nodeId = generateNodeId(object, parentId);
  
    return (
      <table style={{ borderCollapse: 'collapse', margin: 0, padding: 0 }}>
        <tbody>
          <tr style={{ paddingLeft: `${level * 20}px` }}>
            <td>
              <button onClick={() => toggleExpand(nodeId)} style={{ padding: 0, background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
                {expandedNodes[nodeId] ? '[-]' : '[+]'} {object.name || 'Unnamed'}
              </button>
            </td>
          </tr>
          {expandedNodes[nodeId] && object.children && object.children.length > 0 && (
            <tr>
              <td>
                <table style={{ borderCollapse: 'collapse', margin: 0, padding: 0 }}>
                  <tbody>
                    {object.children.map((child, index) => (
                      <tr key={index}>
                        <td>{printMeshHierarchy(child, level + 1, nodeId)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  
  return (
    <div className="sidebar">
      <h2>Light Properties</h2>
      <label>
        Type:
        <select value={lightProperties.type} onChange={(e) => handleChange(setLightProperties, 'type', e.target.value)}>
          <option value="ambientLight">Ambient Light</option>
          <option value="directionalLight">Directional Light</option>
          <option value="pointLight">Point Light</option>
          <option value="spotLight">Spot Light</option>
        </select>
      </label>
      <label>
        Color:
        <input type="color" value={lightProperties.color} onChange={(e) => handleChange(setLightProperties, 'color', e.target.value)} />
      </label>
      <label>
        Intensity:
        <input type="range" min="0" max="10" value={lightProperties.intensity} onChange={(e) => handleChange(setLightProperties, 'intensity', e.target.value)} />
      </label>
      <h3>Position</h3>
      <label>
        X:
        <input type="range" min="-50" max="50" value={lightProperties.position.x} onChange={(e) => handleNestedChange(setLightProperties, 'position', 'x', e.target.value)} />
      </label>
      <label>
        Y:
        <input type="range" min="-50" max="50" value={lightProperties.position.y} onChange={(e) => handleNestedChange(setLightProperties, 'position', 'y', e.target.value)} />
      </label>
      <label>
        Z:
        <input type="range" min="-50" max="50" value={lightProperties.position.z} onChange={(e) => handleNestedChange(setLightProperties, 'position', 'z', e.target.value)} />
      </label>

      <h2>Scene Properties</h2>
      <label>
        Wireframe:
        <input type="checkbox" checked={sceneProperties.wireframe} onChange={(e) => handleChange(setSceneProperties, 'wireframe', e.target.checked)} />
      </label>
      <label>
        Auto Rotate:
        <input type="checkbox" checked={sceneProperties.autoRotate} onChange={(e) => handleChange(setSceneProperties, 'autoRotate', e.target.checked)} />
      </label>
      <label>
        Background Color:
        <input type="color" value={sceneProperties.backgroundColor} onChange={(e) => handleChange(setSceneProperties, 'backgroundColor', e.target.value)} />
      </label>
      <label>
        Show Grid:
        <input type="checkbox" checked={sceneProperties.showGrid} onChange={(e) => handleChange(setSceneProperties, 'showGrid', e.target.checked)} />
      </label>
      <label>
        Grid Size:
        <input type="range" min="1" max="100" value={sceneProperties.gridSize} onChange={(e) => handleChange(setSceneProperties, 'gridSize', e.target.value)} />
      </label>
      <label>
        Grid Divisions:
        <input type="range" min="1" max="100" value={sceneProperties.gridDivisions} onChange={(e) => handleChange(setSceneProperties, 'gridDivisions', e.target.value)} />
      </label>

      <h2>Dimensions</h2>
      <label>
        Width:
        <input type="number" value={modelDimensions.width} readOnly />
      </label>
      <label>
        Height:
        <input type="number" value={modelDimensions.height} readOnly />
      </label>
      <label>
        Depth:
        <input type="number" value={modelDimensions.depth} readOnly />
      </label>

      <h2>Mesh Properties</h2>
      <MeshCard selectedMesh={selectedMesh} />

      <h2>Mesh Hierarchy</h2>
      <div>
        {model ? printMeshHierarchy(model) : <p>No model loaded</p>}
      </div>
    </div>
  );
};

export default Sidebar;
