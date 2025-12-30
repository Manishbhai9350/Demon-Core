import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

interface TextBoxProps {
  text: string;
  progress: number;
  progIndex: number;
}

const TextBox = ({ text, progress, progIndex }: TextBoxProps) => {
  const [hidden, setHidden] = useState(true);
  const container = useRef<HTMLDivElement | null>(null);
  const hider = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline()
    if (progress >= progIndex && hidden) {
      setHidden(false);
      tl.to(container.current, {
        opacity: 1,
      });
      tl.to(hider.current, {
        opacity: 0,
      });
    } else if (progress < progIndex && !hidden) {
      setHidden(true);
      tl.to(hider.current, {
        opacity: 1,
      });
      tl.to(container.current, {
        opacity: 0,
      });
    }
  }, [progress]);

  return (
    <div ref={container} className="text-box">
      {text}
      <div ref={hider} className="hider"></div>
    </div>
  );
};

export default TextBox;
