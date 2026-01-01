import { useState } from "react";
import Speech from "./Speech";
import CoreData from "../data/demon.json";
import Lessons from "./Lessons";

const UI = () => {
  const [ChapterIdx, setChapterIdx] = useState(0);
  const [SegmentIdx, setSegmentIdx] = useState(0);
  const [SpeechDone, setSpeechDone] = useState(false)

  const Chapter = CoreData.chapters[ChapterIdx];
  const Segment = Chapter.segments[SegmentIdx];

  function OnSegmentComplete() {
      const nextSegment = Chapter.segments[SegmentIdx + 1];
      const nextChapter = CoreData.chapters[ChapterIdx + 1];

    if (nextSegment) {
      setSegmentIdx((p) => p + 1);
      return;
    }

    if (nextChapter) {
      setChapterIdx((p) => p + 1);
      setSegmentIdx(0);
    }

    if(!nextChapter && !nextSegment) {
        setSpeechDone(true)
        console.log('Speech Done')
    }
  }
  return (
    <>
      <Lessons setChapterIdx={setChapterIdx} speechDone={SpeechDone} chapterIdx={ChapterIdx} chapters={CoreData.chapters} />
      <Speech
        speechDone={SpeechDone && ChapterIdx == CoreData.chapters.length - 1}
        chapterIdx={ChapterIdx}
        segmentIdx={SegmentIdx}
        chapter={Chapter}
        segment={Segment}
        onComplete={OnSegmentComplete}
      />
    </>
  );
};

export default UI;
