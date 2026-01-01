import { useState } from "react";
import CoreData from './data/demon.json';
import Speech from "./components/Speech";
import './App.css';

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [ChapterIdx, setChapterIdx] = useState(0);
  const [SegmentIdx, setSegmentIdx] = useState(0);

  const Chapter = CoreData.chapters[ChapterIdx];
  const Segment = Chapter.segments[SegmentIdx];

  function OnSegmentComplete() {
    const nextSegment = Chapter.segments[SegmentIdx + 1];
    const nextChapter = CoreData.chapters[ChapterIdx + 1];

    if (nextSegment) {
      setSegmentIdx(p => p + 1);
      return;
    }

    if (nextChapter) {
      setChapterIdx(p => p + 1);
      setSegmentIdx(0);
    }
  }

  

  return (
    <main onClick={() => !clicked && setClicked(true)}>
      {clicked ? (
        <Speech
          chapterIdx={ChapterIdx}
          segmentIdx={SegmentIdx}
          chapter={Chapter}
          segment={Segment}
          onComplete={OnSegmentComplete}
        />
      ) : (
        <p>Click To Continue</p>
      )}
    </main>
  );
};


export default App;