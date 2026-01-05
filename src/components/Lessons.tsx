import { MdMusicNote, MdMusicOff } from "react-icons/md";
import type { LessonProps } from "../Types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";
import { RiRestartLine, RiRewindStartLine } from "react-icons/ri";

const Lessons = ({
  chapters,
  chapterIdx,
  setChapterIdx,
  speechDone,
  restart
}: LessonProps) => {


  const [Music, setMusic] = useState(true)
  const [Media, setMedia] = useState(false)

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
      } else {
        gsap.to(title, {
          color: "#777",
        });
        gsap.to(lines[i], {
          opacity: 0,
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

  return (
    <>
      <div className="lessons">
      <div className="media-buttons">
        <div onClick={() => {
            if(speechDone) {
              restart()
            } else {
              setMedia(p => !p)
            }
          }} className="button playback-button">
          <div style={{opacity:speechDone ? 0 : Media ? 1 : 0,fontSize:'1.2rem'}} className="media play">
            <FaPlay />
          </div>
          <div style={{opacity:speechDone ? 0 : !Media ? 1 : 0}} className="media pause">
            <IoPause />
          </div>
          <div style={{opacity:speechDone ? 1 : 0}} className="media restart">
            <RiRestartLine />
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
              <div className="title">
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
