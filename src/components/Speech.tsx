import React, { useEffect, useRef, useState } from "react";
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
  chapter: object;
  setChapter: React.Dispatch<React.SetStateAction<object>>;
  segment: SegmentProps;
  segmentIdx: number;
  setSegment: React.Dispatch<React.SetStateAction<SegmentProps>>;
  onComplete: () => null;
}

const Speech = ({
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

  useEffect(() => {
    if (segment.type == "audio" && segment.text) {
      setProgress(0);
    }
    return () => {};
  }, [segmentIdx]);

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
  }, [segment]);

  
  if(segment.type == 'silence') return null;

  return (
    <div className="speech">
      <div className="title">
        Chapter - {chapter.title}
      </div>
      {speechText &&
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
          onComplete={onComplete}
        />
      )}
    </div>
  );
};

export default Speech;
