import { CameraControls, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useEffect, useMemo, useRef } from "react"
import { MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three"


const DemonCore2 = () => {


    const camera = useRef(null)

    const { scene, nodes } = useGLTF('/models/demon_core.glb')

    const {
        cellRoughness,
        cellMetalness
    } = useControls({
        cellRoughness:{
            value:.56,
            min:0,
            max:1
        },
        cellMetalness:{
            value:.65,
            min:0,
            max:1
        },
    })

    const cellMaterial = useMemo(() => {
        const mat = new MeshPhysicalMaterial({
            color:0x111111,
            roughness:.23,
            metalness:.6
        })

        return mat;
    },[])

    useEffect(() => {
      
        console.log(scene)

        scene.traverse(node => {
            if(!node.isMesh) return;

            console.log(node.name.includes('Icosphere'))
            if(node.name.includes('Icosphere')) {
                node.material = cellMaterial;
            }

            if(node.name == 'core_base') {
                node.material = new MeshStandardMaterial({
                    color:'#080f21',
                    metalness:.6,
                    roughness:.56
                })
            }

            if(node.name == 'bg') {
                node.material = new MeshBasicMaterial({
                    color:0x333333
                })
            }


        })
    
      return () => {
        
      }
    }, [scene,nodes])

    useEffect(() => {
        scene.traverse(node => {
            if(!node.isMesh) return;

            if(node.name.includes('Icosphere')) {
                node.material.roughness = cellRoughness;
                node.material.metalness = cellMetalness;
            }
            //  if(node.name == 'core_base') {
            //     console.log('meow')
            //     node.material.roughness = cellRoughness;
            //     node.material.metalness = cellMetalness;
            // }
        })
    },[
        cellRoughness,
        cellMetalness
    ])
    

  return (
    <>
        <pointLight color={0xff1aaa} intensity={10} />
        <CameraControls ref={camera}  />
        <primitive object={scene} />
    </>
  )
}

export default DemonCore2