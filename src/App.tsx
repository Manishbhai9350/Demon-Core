import { useEffect, useRef, useState } from "react";
import './App.css';
import UI from "./components/UI";
import Scene from "./Three/Scene";
import LoadingOverlay from "./components/LoadingOverlay";
import { useProgress } from "@react-three/drei";

const App = () => {


  const [clicked, setClicked] = useState(false);
  const clickedRef = useRef(false);

  const {loaded,total} = useProgress()

  useEffect(() => {
  
    clickedRef.current = clicked;
  
    return () => {
    
    }
  }, [clicked])
  

  return (
    <main>
      <Scene />
      {clicked && <UI />}
      <LoadingOverlay progress={Math.ceil(loaded/total)} clicked={clicked} setClicked={setClicked} />
    </main>
  );
};


export default App;