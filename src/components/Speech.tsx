import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import AudioPlayer from "./AudioPlayer";

type AudioSegment = {
  type: "audio";
  audio: string;
  start: number;
  end: number;
  text: string;
};

type SilenceSegment = {
  type: "silence";
  duration: number;
};

type SegmentProps = AudioSegment | SilenceSegment;


interface speechProps {
  chapterIdx: number;
  setChapterIdx: React.Dispatch<React.SetStateAction<number>>; 
  chapter: string;
  setChapter: React.Dispatch<React.SetStateAction<string>>;
  segment: SegmentProps;
  setSegment: React.Dispatch<React.SetStateAction<SegmentProps>>;
  onComplete: () => null;
}

const Speech = ({ chapter, chapterIdx, segment, setChapter, setChapterIdx, setSegment, onComplete }: speechProps) => {
  const [speechText, setSpeechText] = useState<string[]>(
    segment.text?.split(' ')
  );

  const [Progress, setProgress] = useState(0)


  useEffect(() => {

    if(segment.type == 'audio' && segment.text) {
      setProgress(0)
      setSpeechText(segment.text.split(' '))
    }
    return () => {
      
    }
  }, [segment])
  

  return (
    <div className="speech">
      {speechText &&
        speechText.map((t, i) => {
          return (
            <TextBox
              progIndex={(i) / speechText.length}
              progress={Progress}
              key={i}
              text={t}
            />
          );
        })}
      {
        (segment.type == 'audio') && (
          <AudioPlayer
            segment={segment}
            onUpdate={(progress) => {
              setProgress(progress /* - (1 / speechText.length) * (1 - progress) */);
            }}
            onComplete={onComplete}
            />
          )
        }
    </div>
  );
};

export default Speech;
