
export type AudioSegment = {
  type: "audio";
  audio: string;
  start: number;
  end: number;
  text: string;
};

export type SilenceSegment = {
  type: "silence";
  duration: number;
};

export type SegmentProps = AudioSegment | SilenceSegment;

export interface chapterProps {
  id:string;
  title:string;
  totalDuration:number;
  audio:string;
  segments:SegmentProps[];
}

export interface speechProps {
  speechDone:boolean;
  chapterIdx: number;
  setChapterIdx: React.Dispatch<React.SetStateAction<number>>;
  chapter: chapterProps;
  setChapter: React.Dispatch<React.SetStateAction<chapterProps>>;
  segment: SegmentProps;
  segmentIdx: number;
  setSegment: React.Dispatch<React.SetStateAction<SegmentProps>>;
  onComplete: () => null;
}


export interface TextBoxProps {
  text: string;
  progress: number;
  progIndex: number;
}

export interface LessonProps {
  speechDone:boolean;
  chapters: chapterProps[];
  chapterIdx: number;
  setChapterIdx: React.Dispatch<React.SetStateAction<number>>;
}