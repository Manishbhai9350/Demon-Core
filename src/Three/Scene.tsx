import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import DemonCore from './DemonCore'
import { useControls } from 'leva'

const Scene = () => {

    const { ly, y, scale } = useControls({
        y:{
            value:-3.3,
            min:-4,
            max:5
        },
        scale:{
            min:1,
            max:5,
            value:3.2
        },
        ly:{
            value:1.55,
            min:-4,
            max:4,
            step:.001
        }
    })

  return (
    <div className="three-canvas">
        <Canvas
        camera={{
            position:[0,1,6]
        }}
        >
            {/* <mesh>
                <boxGeometry />
                <meshBasicMaterial color={0xff0000} />
            </mesh> */}
            <CameraControls />
            <directionalLight position={[5,5,5]} lookAt={[0,ly,0]} color={"#07175bff"} intensity={5} />
            <directionalLight position={[-5,-5,5]} lookAt={[0,ly,0]} color={"#07175bff"} intensity={2} />
            <DemonCore ly={ly} scale={scale} position={[0,y,0]} />
        </Canvas>
    </div>
  )
}

export default Scene