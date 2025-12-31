import { useEffect, useRef } from "react";

interface segmentProps {
  type: "audio";
  audio: string;
  start: number;
  end: number;
  text: string;
}

interface AudioPlayerProps {
  segment:segmentProps;
  onUpdate: (progress: number) => void;
  onComplete: () => void;
}

const AudioPlayer = ({ onUpdate, onComplete, segment }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const Completed = useRef<boolean>(false)

  
  useEffect(() => {
    
    if(!audioRef.current) return;
    
    Completed.current = false

    
    audioRef.current.currentTime = segment.start;
    audioRef.current.play();
    console.log(segment)
    console.log(audioRef.current.currentTime)

    const duration = segment.end - segment.start;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;

      const t = audioRef.current.currentTime;

      // stop at `to`
      if (t >= segment.end) {
        if(Completed.current) return;
        Completed.current = true;
        audioRef.current.currentTime = segment.end;
        audioRef.current.pause();
        onUpdate(1);
        onComplete()
        return;
      }

      // progress 0 → 1
      const progress = (t - segment.start) / duration;
      onUpdate(Math.max(0, Math.min(1, progress)));
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if(!audioRef.current) return;
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current = null;
    };

  }, [segment, onComplete, onUpdate]);

  return <audio ref={audioRef} src={segment.audio}  />;
};

export default AudioPlayer;
