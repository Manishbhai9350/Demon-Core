import { CameraControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

import {
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Raycaster,
  Vector2,
  Vector3,
  type Object3DEventMap,
} from "three";

const DemonCore2 = () => {
  const camera = useRef<Object3D<Object3DEventMap> | null>(null);
  const coreRef = useRef<Object3D<Object3DEventMap> | null>(null);
  const cells = useRef<
    | {
        object: Object3D<Object3DEventMap>;
        originalPosition: Vector3;
      }
    | object
  >({});

  const mouseObserver = useRef(null);
  const intersecting = useRef<boolean>(false);

  const { scene, nodes } = useGLTF("/models/demon_core-compressed.glb");

  const raycaster = new Raycaster();
  const mouse2D = new Vector2();
  const intersectPoint = new Vector3();
  const worldPosition = new Vector3();

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

      if (node.name.includes("demon-fractured_cell")) {
        node.material = cellMaterial;
        cells.current[node.name] = {
          object: node,
          originalPosition: new Vector3(),
          targetPosition: new Vector3(),
          distance: 0,
        };

        node.getWorldPosition(cells.current[node.name].originalPosition);
        cells.current[node.name].direction = cells.current[
          node.name
        ].object.position
          .clone()
          .normalize(); // local direction
        cells.current[node.name].distance =
          cells.current[node.name].object.position.length(); // base radius
      }

      if (node.name == "core_base") {
        node.material = new MeshStandardMaterial({
          color: new Color("#111317"),
          metalness: 0.6,
          roughness: 0.56,
        });
      }

      if (node.name == "mouse-intersector") {
        mouseObserver.current = node;
        mouseObserver.current.visible = false;
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

  useEffect(() => {
    const mouseMove = (e) => {
      if (!mouseObserver.current || !camera.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const nx = (x / innerWidth) * 2 - 1;
      const ny = -(y / innerHeight) * 2 + 1;

      mouse2D.set(nx, ny);

      const observer = mouseObserver.current;

      raycaster.setFromCamera(mouse2D, camera.current);
      const intersect = raycaster.intersectObject(observer,false);

      if (intersect.length) {
        intersecting.current = true;
        intersectPoint.copy(intersect[0].point);
        return;
      }
      intersecting.current = false;
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  

  // const {
  //   noise,
  //   darkness,
  //   eskil,
  //   offset,
  //   blend
  //  } = useControls({
  //   eskil:{
  //     value:false
  //   },
  //   offset:{
  //     value:.1,
  //     min:0,
  //     max:.5
  //   },
  //   darkness:{
  //     value:1.1,
  //     min:0,
  //     max:2
  //   },
  //   noise:{
  //     value:.02,
  //     min:0,
  //     max:.1
  //   },
  //   blend:{
  //     value:BlendFunction.SCREEN,
  //     options:BlendFunction
  //   }
  // });

  const { force, radius, blend, darkness, eskil, noise, offset } = {
    radius: 0.5,
    force: -0.2,
    eskil: false,
    offset: innerWidth < 900 ? 0.1 : 0.1,
    darkness: innerWidth < 900 ? 1.1 : 1,
    noise: innerWidth < 900 ? 0.02 : 0.014,
    blend: BlendFunction.SCREEN,
  };

  useFrame((_, delta) => {
    if (!coreRef.current || !cells.current) return;

    coreRef.current.rotation.y -= delta * 0.08;


    // Animating Each Fractured Cell;
    for (const cellName in cells.current) {
      const cell = cells.current[cellName];

      let targetDistance = cell.distance;

      if (intersecting.current) {
        cell.object.getWorldPosition(worldPosition);

        let dist = worldPosition.distanceTo(intersectPoint);
        dist = THREE.MathUtils.clamp(dist, 0, radius);

        const strength = 1 - dist / radius;
        targetDistance += strength * force;
      }

      cell.targetPosition.copy(cell.direction).multiplyScalar(targetDistance);

      cell.object.position.lerp(cell.targetPosition, 0.06);
    }
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={0.5} />
      <pointLight color={new Color("#1E3FFF")} intensity={200} />
      <spotLight
        color={new Color("#ffffff")}
        intensity={20}
        position={[0, 5, 3]}
        lookAt={[0, 0, 0]}
      />
      <PerspectiveCamera makeDefault={true} ref={camera} position={[0,1,3]} onUpdate={(cam) => cam.lookAt(0, 0, 0)}  />
      <group ref={coreRef}>
        <primitive object={scene} />
      </group>
      <EffectComposer resolutionScale={0.3}>
        {/* <DepthOfField focusDistance={1} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        <Noise opacity={noise} blendFunction={blend} />
        <Vignette eskil={eskil} offset={offset} darkness={darkness} />
      </EffectComposer>
    </>
  );
};

export default DemonCore2;
