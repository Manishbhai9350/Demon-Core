import { useEffect, useRef } from "react";

interface SegmentProps {
  type: "audio";
  audio: string;
  start: number;
  end: number;
  text: string;
}

interface AudioPlayerProps {
  segment: SegmentProps;
  onUpdate: (progress: number) => void;
  onComplete: () => void;
}

const AudioPlayer = ({ segment, onUpdate, onComplete }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const completedRef = useRef(false);
  const timeOut = useRef<number>(0)

  console.log(segment)

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    completedRef.current = false;

    // force reload when segment changes
    audio.pause();
    audio.src = segment.audio;
    audio.load();

    const duration = segment.end - segment.start;

    const onLoadedMetadata = () => {
      audio.currentTime = segment.start;

      clearTimeout(timeOut.current)
      timeOut.current = setTimeout(() => {
        audio.play().catch(() => {
          /* user gesture already happened */
        });
      }, 1000);
    };

    const onTimeUpdate = () => {
      const t = audio.currentTime;

      
      if (t >= segment.end) {
        if (completedRef.current) return;
        completedRef.current = true;
        audio.currentTime = segment.end;
        audio.pause();
        onUpdate(1);
        onComplete();
        return;
      }

      const progress = (t - segment.start) / duration * 1.1;
      // console.log(segment.start,segment.end,t,progress)
      onUpdate(Math.max(0, Math.min(1, progress)));
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      clearTimeout(timeOut.current)
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [segment.audio, segment.start, segment.end, onComplete, onUpdate]);

  return <audio ref={audioRef} preload="auto" />;
};

export default AudioPlayer;
