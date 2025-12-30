import { useControls } from 'leva';
import './App.css';
import Speech from './components/Speech.tsx'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)

const App = () => {

  const test = 'In 1945, a small sphere of plutonium rested at Los Alamos Laboratory. It was unfinished. Silent. And extremely dense.'

  const { speechProgress } = useControls({
    speechProgress:{
      value:0,
      min:0,
      max:1,
      step:.001
    }
  })

  return (
    <div>
      <Speech text={test} progress={speechProgress} />
    </div>
  )
}

export default App