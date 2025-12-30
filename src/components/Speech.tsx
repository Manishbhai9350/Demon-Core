import { useEffect, useState } from "react";
import TextBox from "./TextBox";
import AudioPlayer from "./AudioPlayer";

interface speechProps {
  progress: number;
  paras: string[];
  para: number;
}

const Speech = ({ para, paras, progress }: speechProps) => {
  const [speechText, setSpeechText] = useState<string[]>(paras[para].split(" "));

  const audio = AudioPlayer({
    src:'/public/audio1.mp3',
    from:0,
    to:31,
    onUpdate(progress) {
      console.log(progress)
    },
  })

  useEffect(() => {
    
    setSpeechText(
      paras[para].split(" ")
    )

    return () => {
      
    }
  }, [para])
  

  return (
    <div className="speech">
      {speechText && speechText.map((t, i) => {
        return (
          <TextBox
            progIndex={(i + 1) / speechText.length}
            progress={progress}
            key={i}
            text={t}
          />
        );
      })}
    </div>
  );
};

export default Speech;
