import { useEffect, useRef } from "react";
import type { LessonProps } from "../Types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Lessons = ({
  chapters,
  chapterIdx,
  setChapterIdx,
  speechDone,
}: LessonProps) => {
  useGSAP(() => {
    const titles = document.querySelectorAll(".chapter .title");
    const lines = document.querySelectorAll(".chapter .progress .line");

    titles.forEach((title, i) => {
      if (i <= chapterIdx || speechDone) {
        gsap.to(title, {
          color: "#ffffff",
        });
        gsap.to(lines[i], {
          opacity: 1,
        });
        gsap.to(title, {
          cursor: "pointer",
        });
      } else {
        gsap.to(title, {
          color: "#777",
        });
        gsap.to(lines[i], {
          opacity: 0,
        });
        gsap.to(title, {
          cursor: "initial",
        });
      }
    });
  }, [chapterIdx]);

  function OnTitleClick(idx: number) {
    if (speechDone) {
      setChapterIdx(idx);
    }
  }

  return (
    <>
      <div className="lessons">
      <div className="media-buttons">
        <div className="button playback-button">
          
        </div>
        <div className="button sound-button">

        </div>
      </div>
        {chapters.map((chapter, i) => {
          return (
            <div key={i} className="chapter">
              <div onClick={() => OnTitleClick(i)} className="title">
                {chapter.title}
              </div>
              <div className="progress">
                <div className="line"></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
