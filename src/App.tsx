import { Suspense, useState } from "react";
import './App.css';
import UI from "./components/UI";
import Scene from "./Three/Scene";
import LoadingOverlay from "./components/LoadingOverlay";
import { useProgress } from "@react-three/drei";

const App = () => {

  const [clicked, setClicked] = useState(false);
  const { loaded, total } = useProgress();


  return (
    <main>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {clicked && <UI />}

      <LoadingOverlay
        progress={total ? Math.ceil((loaded / total)) : 0}
        clicked={clicked}
        setClicked={setClicked}
      />
    </main>
  );
};

export default App;
