import { useControls } from "leva";
import "./App.css";
import Speech from "./components/Speech.tsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";

gsap.registerPlugin(useGSAP);

const App = () => {
  const t1 =
    "In 1945, a small sphere of plutonium rested at Los Alamos Laboratory. It was unfinished. Silent. And extremely dense.";
  const t2 =
    "It was intended for a third atomic weapon. The war ended before it was ever used.";

  const paras = [t1, t2];

  const [text, setText] = useState<string>(paras[1]);

  const { speechProgress, para } = useControls({
    speechProgress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    }
  });

  return (
    <div>
      <Speech text={text} progress={speechProgress} />
    </div>
  );
};

export default App;
