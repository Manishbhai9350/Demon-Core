import { useState } from "react";
import TextBox from "./TextBox";

interface speechProps {
  text: string;
  progress: number;
}

const Speech = ({ text, progress }: speechProps) => {
  const [speechText, setSpeechText] = useState<string[]>(text.split(" "));

  return (
    <div className="speech">
      {speechText.map((t, i) => {
        return (
          <>
            <TextBox
              progIndex={(i + 1) / speechText.length}
              progress={progress}
              key={`i-${t}`}
              text={t}
            />
            &nbsp;
          </>
        );
      })}
    </div>
  );
};

export default Speech;
