import { CameraControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from "three";

const DemonCore2 = () => {

  const camera = useRef(null);
  const coreRef = useRef(null);
  const cells = useRef([])

  const { scene, nodes } = useGLTF("/models/demon_core.glb");

  // const {
  //     cellRoughness,
  //     cellMetalness
  // } = useControls({
  //     cellRoughness:{
  //         value:.56,
  //         min:0,
  //         max:1
  //     },
  //     cellMetalness:{
  //         value:.65,
  //         min:0,
  //         max:1
  //     },
  // })

  const cellMaterial = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.56,
      metalness: 0.65,
    });

    return mat;
  }, []);

  useEffect(() => {
    cells.current = {};
    scene.traverse((node) => {
      if (!node.isMesh) return;

      if (node.name.includes("Icosphere")) {
          node.material = cellMaterial;
          cells.current[node.name] = {
            object:node,
            originalPosition:new Vector3(),
          }

          node.getWorldPosition(cells.current[node.name].originalPosition)
      }

      if (node.name == "core_base") {
        node.material = new MeshStandardMaterial({
          color: "#111317",
          metalness: 0.6,
          roughness: 0.56,
        });
      }
    });

    return () => {};
  }, [scene, nodes]);

  // useEffect(() => {
  //     scene.traverse(node => {
  //         if(!node.isMesh) return;

  //         if(node.name.includes('Icosphere')) {
  //             node.material.roughness = cellRoughness;
  //             node.material.metalness = cellMetalness;
  //         }
  //         //  if(node.name == 'core_base') {
  //         //     console.log('meow')
  //         //     node.material.roughness = cellRoughness;
  //         //     node.material.metalness = cellMetalness;
  //         // }
  //     })
  // },[
  //     cellRoughness,
  //     cellMetalness
  // ])

  useFrame((_, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y -= delta * 0.08;
  });

  return (
    <>
      <pointLight color={"#1E3FFF"} intensity={30} />
      <CameraControls ref={camera} />
      <group ref={coreRef}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default DemonCore2;
