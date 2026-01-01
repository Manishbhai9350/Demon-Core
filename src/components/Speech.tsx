import React, { useEffect, useMemo, useRef, useState } from "react";
import TextBox from "./TextBox";
import AudioPlayer from "./AudioPlayer";
import Title from "./Lessons";
import type { speechProps } from "../Types";

const Speech = ({
  speechDone,
  chapter,
  chapterIdx,
  segment,
  segmentIdx,
  setChapter,
  setChapterIdx,
  setSegment,
  onComplete,
}: speechProps) => {
  const [speechText, setSpeechText] = useState<string[]>(
    segment.text?.split(" ")
  );

  const [Progress, setProgress] = useState(0);
  const timeOut = useRef<number>(0)

  // useEffect(() => {
  //   if (segment.type == "audio") {
  //     setProgress(0);
  //   }
  //   return () => {};
  // }, [segmentIdx,segment.type]);

  useEffect(() => {
    if (segment.type == "audio" && segment.text) {
      setSpeechText(segment.text.split(" "));
    } 

    if(segment.type == 'silence') {
      clearTimeout(timeOut.current)
      timeOut.current = setTimeout(() => {
        onComplete()
      }, segment.duration);
    }

    return () => {};
  }, [segment,onComplete]);

  const OnSpeechComplete = () => {
    setProgress(0)
    setTimeout(() => {
      onComplete()
    }, 1000);
  }

  const showSpeechText = useMemo(() => (speechText && !speechDone),[speechText,speechDone] )

  
  if(segment.type == 'silence') return null;

  return (
    <div className="speech">
      {showSpeechText &&
        speechText.map((t, i) => {
          return (
            <TextBox
              progIndex={i / speechText.length}
              progress={Progress}
              key={i}
              text={t}
            />
          );
        })}
      {segment.type == "audio" && (
        <AudioPlayer
          segment={segment}
          onUpdate={(progress) => {
            setProgress(
              progress /* - (1 / speechText.length) * (1 - progress) */
            );
          }}
          onComplete={OnSpeechComplete}
        />
      )}
    </div>
  );
};

export default Speech;
