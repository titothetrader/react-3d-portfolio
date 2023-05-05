import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'

import CanvasLoader from '../Loader'

let ballCounter = 0
let levelCounter = 0

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl])
  let x = 0
  let y = 0
  let z = 0

  if (props.isMobile) {
    if (ballCounter === 0) {
      x = 7.5
      y = 13 - (levelCounter * 5)
    } else if (ballCounter === 1) {
      x = 2.5
      y = 13 - (levelCounter * 5)
    } else if (ballCounter === 2) {
      x = -2.5
      y = 13 - (levelCounter * 5)
    } else if (ballCounter === 3) {
      x = -7.5
      y = 13- (levelCounter * 5)
    }

  } else {
    if (props.index <= 6) {
      x = -30 + (props.index * 10)
      y = 5
    } else {
      x = -30 + ((props.index - 7) * 10)
      y = -5
    }
  }

  ballCounter += 1

  if (ballCounter === 4) {
    ballCounter = 0
    levelCounter += 1
  }

  return (
    <Float >
      <ambientLight intensity={0.15}/>
      <directionalLight position={[0, 0, -0.5]}/>
      <mesh castShadow receiveShadow scale={props.isMobile ? 2 : 2.75} position={[x, y, z]}>
        <icosahedronGeometry args={[1, 1]}/>
        <meshStandardMaterial 
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position ={[0, 0, 1]}
          rotation={[ 20 * Math.PI, 0, 0]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ( { technologies, isMobile }) => {
  return (
    <Canvas
      frameloop='demand' 
      shadows
      camera={{ position: [0, -180, 0], fov: 10 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {technologies.map((technology, index) => (
          <Ball key={technology.name} imgUrl={technology.icon} index={index} isMobile={isMobile} />
        ))}
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas