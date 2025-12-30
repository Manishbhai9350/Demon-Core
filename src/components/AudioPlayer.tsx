import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string;
  from: number;
  to: number;
  onUpdate: (progress: number) => void;
}

const AudioPlayer = ({ src, from, to, onUpdate }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.currentTime = from;
    audio.play();

    const duration = to - from;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;

      const t = audio.currentTime;

      // stop at `to`
      if (t >= to) {
        audio.pause();
        audio.currentTime = to;
        onUpdate(1);
        return;
      }

      // progress 0 → 1
      const progress = (t - from) / duration;
      onUpdate(Math.max(0, Math.min(1, progress)));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current = null;
    };
  }, [src, from, to, onUpdate]);

  return audioRef; // no UI, logic-only component
};

export default AudioPlayer;
