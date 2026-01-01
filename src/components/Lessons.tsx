import { MdMusicNote, MdMusicOff } from "react-icons/md";
import type { LessonProps } from "../Types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";

const Lessons = ({
  chapters,
  chapterIdx,
  setChapterIdx,
  speechDone,
}: LessonProps) => {


  const [Music, setMusic] = useState(true)
  const [Media, setMedia] = useState(true)

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

  useEffect(() => {
    
    const audio = document.querySelector('audio.speech-audio-media')
    // const audio = document.querySelector('audio')

    if(!audio) return;

    audio.muted = !Music

    if(!Media) {
      audio.play()
    } else {
      audio.pause()
    }

    return () => {
      
    }
  }, [Music,Media])
  

  function OnTitleClick(idx: number) {
    if (speechDone) {
      setChapterIdx(idx);
    }
  }

  return (
    <>
      <div className="lessons">
      <div className="media-buttons">
        <div onClick={() => setMedia(p => !p)} className="button playback-button">
          <div style={{opacity:Media ? 1 : 0,fontSize:'1.2rem'}} className="media play">
            <FaPlay />
          </div>
          <div style={{opacity:!Media ? 1 : 0}} className="media pause">
            <IoPause />
          </div>
        </div>
        <div onClick={() => setMusic(p => !p)} className="button sound-button">
          <div style={{opacity:Music ? 1 : 0}} className="music music-on">
            <MdMusicNote />
          </div>
          <div style={{opacity:!Music ? 1 : 0}} className="music music-off">
            <MdMusicOff />
          </div>
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
