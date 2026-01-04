import { Canvas } from '@react-three/fiber'
import { CameraControls, Stats } from '@react-three/drei'
import DemonCore from './DemonCore'
import { useControls } from 'leva'
import DemonCore2 from './DemonCore2'

const Scene = () => {

    // const { ly, y, scale } = useControls({
    //     y:{
    //         value:-3.3,
    //         min:-4,
    //         max:5
    //     },
    //     scale:{
    //         min:1,
    //         max:5,
    //         value:3.2
    //     },
    //     ly:{
    //         value:1.55,
    //         min:-4,
    //         max:4,
    //         step:.001
    //     }
    // })

  return (
    <div className="three-canvas">
        <Stats />
        <Canvas
        camera={{
            position:[1.6,.8,1.6]
        }}
        >
            {/* <mesh>
                <boxGeometry />
                <meshBasicMaterial color={0xff0000} />
            </mesh> */}
            <directionalLight position={[5,5,5]} lookAt={[0,0,0]} color={"#ffffff"} intensity={2} />
            {/* <directionalLight position={[1.6,.8,1.6]} lookAt={[0,0,0]} color={"#5b637a"} intensity={5} /> */}
            {/* <DemonCore ly={ly} scale={scale} position={[0,y,0]} /> */}
            <DemonCore2 />
        </Canvas>
    </div>
  )
}

export default Scene