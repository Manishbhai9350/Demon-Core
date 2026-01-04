import { CameraControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
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

  const { scene, nodes } = useGLTF("/models/demon_core.glb");

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

      if (node.name.includes("Icosphere")) {
        node.material = cellMaterial;
        cells.current[node.name] = {
          object: node,
          originalPosition: new Vector3(),
          targetPosition: new Vector3(),
        };

        node.getWorldPosition(cells.current[node.name].originalPosition);
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

      raycaster.setFromCamera(mouse2D, camera.current._camera);
      const intersect = raycaster.intersectObject(observer);

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

  // const { radius, force } = useControls({
  //   radius: {
  //     value: .8,
  //     min: 0.1,
  //     max: 1,
  //   },
  //   force: {
  //     value: .1,
  //     min: 0,
  //     max: .2,
  //     step: 0.001,
  //   },
  // });

  const { force,radius } = {
    radius: .5,
    force:-.2
  }

  useFrame((_, delta) => {
    if (!coreRef.current || !cells.current) return;

    coreRef.current.rotation.y -= delta * 0.08;

    for (const cellName in cells.current) {
      const cell = cells.current[cellName];

      if(intersecting.current) {
        // world position
      cell.object.getWorldPosition(worldPosition);

      // distance from interaction
      let dist = worldPosition.distanceTo(intersectPoint);

      // clamp
      dist = THREE.MathUtils.clamp(dist, 0, radius);

      // strength (0 → 1)
      const strength = 1 - dist / radius;

      // direction from interaction to cell
      const direction = worldPosition.clone().add(intersectPoint).normalize();

      // offset
      const offset = direction.multiplyScalar(strength * force);

      // target
      cell.targetPosition.copy(cell.originalPosition.clone().add(offset));
    } else {
      cell.targetPosition.copy(cell.originalPosition.clone());
    }

      // 👇 THIS is the missing piece
      cell.object.position.lerp(cell.targetPosition, .06);
    }
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={0.5} />
      <pointLight color={new Color("#1E3FFF")} intensity={200} />
      <spotLight color={new Color('#ffffff')} intensity={20} position={[0,5,3]} lookAt={[0,0,0]} />
      <CameraControls makeDefault ref={camera} />
      {/* <PerspectiveCamera makeDefault ref={camera} lookAt={[0,0,0]} position={[0,1,3.6]} /> */}
      <group ref={coreRef}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default DemonCore2;
