import * as THREE from 'three'
import { useGLTF, useHelper } from '@react-three/drei'
import { useRef } from 'react'

export default function DemonCore(props) {
  const { nodes, materials } = useGLTF('/models/demon_core_1.glb')

  const lightRef = useRef<THREE.PointLight>(null!)

  // helper
  useHelper(lightRef, THREE.PointLightHelper, 0.5, '#1E3FFF')

  return (
    <group {...props} dispose={null}>
      <pointLight
        ref={lightRef}
        position={[0, props.ly, 0]}
        color={0x1e3fff}
        intensity={50}
      />

      <group position={[0, 1.309, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.11}>
        <mesh geometry={nodes.base.geometry} material={materials.Stand} position={[0, 0, -7.955]} scale={6.496} />
        <mesh geometry={nodes.core.geometry} material={materials.Beryllium} position={[0, 0, -0.994]} scale={6.496} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Plutonium} scale={1.791} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Screwdriver_handle} position={[10.147, 0.09, 0.614]} scale={1.577} />
        <mesh geometry={nodes.Object_5_1.geometry} material={materials.Shiny_Metal} position={[6.577, 0.09, 0.321]} scale={2.91} />
      </group>

      <mesh
        geometry={nodes.Plane.geometry}
        material={new THREE.MeshBasicMaterial({ color: 0x111111 })}
        position={[0, 0.135, 0]}
        scale={[2.014, 1, 1.246]}
      />
    </group>
  )
}

useGLTF.preload('/models/demon_core_1.glb')
