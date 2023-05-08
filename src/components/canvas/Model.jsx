import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Model = (props) => {
  const meshRef = useRef();

  // const computer = useGLTF('./desktop_pc/scene.gltf')
  const [model, setModel] = useState(useGLTF('./models/Fractal_Linked_Star.gltf'))

  // Rotate the modal on every frame
  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor='black'/>
      <pointLight intensity={1}/>
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={model.scene}
        scale={props.isMobile ? 1 : 1.3}
        position={[0, 0, 0]}
        rotation={[-0.01, -0.9, -0.1]}
      />
    </mesh>
  )
}

const ModelCanvas = (props) => {
  let size = props.isMobile ? '200px' : '350px'
  return (
    <Canvas
      style={{display: 'block', width: size, height: size}}
      className='mx-auto md:top-[50vh] top-[55vh]'
      frameloop='demand' 
      shadows
      camera={{ position: [30, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model isMobile={props.isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ModelCanvas