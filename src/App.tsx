import { useControls } from "leva";
import "./App.css";
import Speech from "./components/Speech.tsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import CoreData from "./data/demon.json";

gsap.registerPlugin(useGSAP);

const App = () => {
  const t1 =
    "In 1945, a small sphere of plutonium rested at Los Alamos Laboratory. It was unfinished. Silent. And extremely dense.";
  const t2 =
    "It was intended for a third atomic weapon. The war ended before it was ever used.";

  const paras = [t1, t2];

  const [clicked, setClicked] = useState(false);

  const [Data, setData] = useState(CoreData);
  const [ChapterIdx, setChapterIdx] = useState(0);
  const [SegmentIdx, setSegmentIdx] = useState(0);
  const [Chapter, setChapter] = useState(Data.chapters[ChapterIdx]);
  const [Segment, setSegment] = useState(
    Data.chapters[ChapterIdx].segments[SegmentIdx]
  );

  function OnSegmentComplete() {
    const nextSegment = Data.chapters[ChapterIdx].segments[SegmentIdx + 1];
    const nextChapter = Data.chapters[ChapterIdx + 1]

    // console.log(nextSegment)
    // console.log(nextChapter)

    if (nextSegment) {
      setTimeout(() => {
        setSegmentIdx((p) => p + 1);
      }, 1000);
      return;
    }

    if(nextChapter) {
      setChapterIdx((p) => p + 1)
      setSegmentIdx(0)
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      setSegment(Data.chapters[ChapterIdx].segments[SegmentIdx]);
    }, 1000);
    return () => {};
  }, [SegmentIdx]);

  useEffect(() => {
    setChapter(Data.chapters[ChapterIdx])
    return () => {};
  }, [ChapterIdx]);

  // const { speechProgress, para } = useControls({
  //   speechProgress: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //   },
  //   para:{
  //     value:0,
  //     options:[0,1]
  //   }
  // });

  return (
    <main
      onClick={() => {
        if (!clicked) setClicked(true);
      }}
    >
      {clicked ? (
        <Speech
          chapterIdx={ChapterIdx}
          setChapterIdx={setChapterIdx}
          chapter={Chapter}
          setChapter={setChapter}
          segment={Segment}
          segmentIdx={SegmentIdx}
          setSegment={setSegment}
          onComplete={OnSegmentComplete}
        />
      ) : (
        <p>Click To Continue</p>
      )}
    </main>
  );
};

export default App;
