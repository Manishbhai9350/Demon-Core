import { useState } from "react";
import './App.css';
import UI from "./components/UI";

const App = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <main onClick={() => !clicked && setClicked(true)}>
      {clicked ? (
        <UI />
      ) : (
        <p>Click To Continue</p>
      )}
    </main>
  );
};


export default App;