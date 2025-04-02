import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import GUI from 'lil-gui';
import { Raycaster, Vector2, AnimationMixer, Box3, Vector3 } from 'three';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import CardComponent from './CardComponent';
import Sidebar from './Sidebar';
import './Sidebar.css';
import './Viewer.css';

const firebaseConfig = {
  apiKey: "AIzaSyCfWYRWOQyNrn9WGv3Wfz_EM47ZpbL_Yqs",
  authDomain: "virtual-world-84ce0.firebaseapp.com",
  projectId: "virtual-world-84ce0",
  storageBucket: "virtual-world-84ce0.appspot.com",
  messagingSenderId: "306111432374",
  appId: "1:306111432374:web",
  measurementId: "G-1K1M3CNJR7"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function Viewer() {
  const [model, setModel] = useState(null);
  const [animations, setAnimations] = useState(null);
  const [selectedAnimation, setSelectedAnimation] = useState(null);
  const [lightProperties, setLightProperties] = useState({
    type: 'ambientLight',
    color: '#ffffff',
    intensity: 7,
    position: { x: 0, y: 0, z: 0 }
  });
  const [sceneProperties, setSceneProperties] = useState({
    wireframe: false,
    autoRotate: false,
    backgroundColor: '#000000',
    showGrid: true,
    gridSize: 10,
    gridDivisions: 10
  });
  const [modelDimensions, setModelDimensions] = useState({ width: 0, height: 0, depth: 0 });
  const [firebaseFiles, setFirebaseFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const guiRef = useRef(null);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const loader = new GLTFLoader();
    loader.load(URL.createObjectURL(file), (gltf) => {
      setModel(gltf.scene);
      setAnimations(gltf.animations);
      setSelectedAnimation(gltf.animations[0]?.name || null);
      updateModelDimensions(gltf.scene);
    });
  };
  const handleFirebaseFileUpload = async (url) => {
    setLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        setModel(gltf.scene);
        setAnimations(gltf.animations);
        setSelectedAnimation(gltf.animations[0]?.name || null);
        updateModelDimensions(gltf.scene);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
        setLoading(false);
      }
    );
  };

  const loadFirebaseFiles = async () => {
    const listRef = ref(storage, '/');
    const res = await listAll(listRef);
    const files = await Promise.all(res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { name: itemRef.name, url };
    }));
    setFirebaseFiles(files);
  };

  const handleExportToLocal = async () => {
    const exporter = new GLTFExporter();
    if (model) {
      exporter.parse(
        model,
        (result) => {
          const output = JSON.stringify(result, null, 2);
          const blob = new Blob([output], { type: 'application/json' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'modified_model.gltf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        { binary: false }
      );
    }
  };

  const handleExportToFirebase = async () => {
    const exporter = new GLTFExporter();
    if (model) {
      exporter.parse(
        model,
        async (result) => {
          const output = JSON.stringify(result, null, 2);
          const blob = new Blob([output], { type: 'application/json' });

          let fileName = window.prompt('Enter a name for the file (without extension):');
          if (!fileName) {
            fileName = 'model'; // Default filename if user cancels prompt
          }

          fileName += '.gltf';
          const fileRef = ref(storage, fileName);

          try {
            await uploadBytes(fileRef, blob);
            const url = await getDownloadURL(fileRef);
            alert(`File uploaded successfully: ${url}`);
            loadFirebaseFiles(); // Refresh the file list after upload
          } catch (error) {
            console.error('An error occurred during upload:', error);
            alert('Upload failed. Please try again.');
          }
        },
        { binary: false }
      );
    }
  };


  useEffect(() => {
    loadFirebaseFiles();
  }, []);

  const handleSelectChange = (event) => {
    const selectedFile = firebaseFiles.find(file => file.name === event.target.value);
    setSelectedFile(selectedFile.url);
    handleFirebaseFileUpload(selectedFile.url);
  };

  const handleAnimationSelect = (event) => {
    setSelectedAnimation(event.target.value);
  };

  const toggleAnimation = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  const updateModelDimensions = (loadedModel) => {
    if (loadedModel) {
      const box = new Box3().setFromObject(loadedModel);
      const size = box.getSize(new Vector3());
      const dimensions = {
        width: size.x.toFixed(2),
        height: size.y.toFixed(2),
        depth: size.z.toFixed(2),
      };
      setModelDimensions(dimensions);
      console.log('Model Dimensions:', dimensions);
    }
  };


  return (
    <div className="app-container">
      <Sidebar
        lightProperties={lightProperties}
        setLightProperties={setLightProperties}
        sceneProperties={sceneProperties}
        setSceneProperties={setSceneProperties}
        modelDimensions={modelDimensions}
        model={model}
        selectedMesh={selectedMesh}
      />
      <CardComponent
        handleFileUpload={handleFileUpload}
        selectedFile={selectedFile}
        firebaseFiles={firebaseFiles}
        handleSelectChange={handleSelectChange}
        handleExportToLocal={handleExportToLocal}
        handleExportToFirebase={handleExportToFirebase}
        toggleAnimation={toggleAnimation}
        isAnimationPlaying={isAnimationPlaying}
        loading={loading}
        animations={animations}
        handleAnimationSelect={handleAnimationSelect}
        selectedAnimation={selectedAnimation}
      />

<Canvas style={{ height: 'calc(100vh - 10px)', width: 'calc(100% - 500px)', background: sceneProperties.backgroundColor }}>
        <Stats className='stats' />
        <OrbitControls autoRotate={sceneProperties.autoRotate} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Scene
          model={model}
          animations={animations}
          lightProperties={lightProperties}
          sceneProperties={sceneProperties}
          isAnimationPlaying={isAnimationPlaying}
          selectedAnimation={selectedAnimation}
          selectedMesh={selectedMesh} // Pass the selected mesh to the Scene
          setSelectedMesh={setSelectedMesh}
        />
      </Canvas>
    </div>
  );
}

function HoverHighlight({ setHoveredObject, setSelectedObject }) {
  const { gl, scene, camera } = useThree();
  const raycaster = useMemo(() => new Raycaster(), []);
  const mouse = useRef(new Vector2());
  const canvasRef = useRef(gl.domElement);
  const previousHoveredObject = useRef(null);
  const originalColor = useRef(null);

  const onMouseMove = useCallback((event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  const onClick = useCallback(() => {
    if (previousHoveredObject.current) {
      setSelectedObject(previousHoveredObject.current);
      console.log('Clicked Mesh:', previousHoveredObject.current.name);
    }
  }, [setSelectedObject]);

  useEffect(() => {
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('click', onClick);
    return () => {
      canvasRef.current.removeEventListener('mousemove', onMouseMove);
      canvasRef.current.removeEventListener('click', onClick);
    };
  }, [onMouseMove, onClick]);

  useFrame(() => {
    raycaster.setFromCamera(mouse.current, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      setHoveredObject(object);

      if (previousHoveredObject.current && previousHoveredObject.current !== object) {
        previousHoveredObject.current.material.emissive.setHex(originalColor.current);
      }

      if (object.material && object.material.emissive) {
        if (previousHoveredObject.current !== object) {
          originalColor.current = object.material.emissive.getHex();
          previousHoveredObject.current = object;
        }
        if (object !== setSelectedObject) {
          object.material.emissive.setHex(0xaaaaaa);
        }
      }
    } else {
      if (previousHoveredObject.current) {
        previousHoveredObject.current.material.emissive.setHex(originalColor.current);
        previousHoveredObject.current = null;
        originalColor.current = null;
      }
      setHoveredObject(null);
    }
  });

  return null;
}

function Scene({
  model,
  animations,
  lightProperties,
  sceneProperties,
  isAnimationPlaying,
  selectedAnimation,
  selectedMesh, // Ensure this prop is received
  setSelectedMesh // Ensure this function is received
}) {
  const { scene, camera } = useThree();
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const mixerRef = useRef(new AnimationMixer(null));
  useEffect(() => {
    if (model) {
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = sceneProperties.wireframe;
        }
      });
    }
  }, [model, sceneProperties.wireframe]);

  useEffect(() => {
    if (model) {
      const box = new Box3().setFromObject(model);
      const size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());

      const cameraOffset = 1.5;
      const cameraPosition = new Vector3().copy(center);
      cameraPosition.x += size / 2.0;
      cameraPosition.y += size / 4.0;
      cameraPosition.z += size * cameraOffset;

      camera.position.copy(cameraPosition);
      camera.lookAt(center);
    }
  }, [model, camera]);

  useEffect(() => {
    if (model) {
      scene.add(model);
      if (animations && animations.length > 0) {
        mixerRef.current = new AnimationMixer(model);
        const initialAction = mixerRef.current.clipAction(animations[0]);
        initialAction.play();
      }
    }
    return () => {
      if (model) {
        scene.remove(model);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
    };
  }, [model, animations, scene]);

  useFrame((state, delta) => {
    if (mixerRef.current && isAnimationPlaying) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <>
      <HoverHighlight setHoveredObject={setHoveredMesh} setSelectedObject={setSelectedMesh} />
      {lightProperties.type === 'ambientLight' ? (
        <ambientLight intensity={lightProperties.intensity} color={lightProperties.color} />
      ) : lightProperties.type === 'directionalLight' ? (
        <directionalLight
          intensity={lightProperties.intensity}
          color={lightProperties.color}
          position={[lightProperties.position.x, lightProperties.position.y, lightProperties.position.z]}
        />
      ) : lightProperties.type === 'pointLight' ? (
        <pointLight
          intensity={lightProperties.intensity}
          color={lightProperties.color}
          position={[lightProperties.position.x, lightProperties.position.y, lightProperties.position.z]}
        />
      ) : lightProperties.type === 'spotLight' ? (
        <spotLight
          intensity={lightProperties.intensity}
          color={lightProperties.color}
          position={[lightProperties.position.x, lightProperties.position.y, lightProperties.position.z]}
          angle={Math.PI / 5}
          penumbra={0.2}
          castShadow
        />
      ) : null}
      {sceneProperties.showGrid && (
        <gridHelper args={[sceneProperties.gridSize, sceneProperties.gridDivisions]} />
      )}
    </>
  );
}



export default Viewer;