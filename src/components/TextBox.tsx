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
  const textPara = useRef<HTMLDivElement | null>(null);
  const hider = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (progress >= progIndex && hidden) {
      setHidden(false);
      gsap.killTweensOf([hider.current,container.current])
      tl.to(container.current, {
        opacity: 1,
      });
      tl.to(hider.current, {
        opacity: 0,
      });
      tl.to(textPara.current, {
        opacity: 1,
      },'<');
    } else if (progress < progIndex && !hidden) {
      setHidden(true);
      gsap.killTweensOf([hider.current,container.current])
      tl.to(hider.current, {
        opacity: 1,
      });
      tl.to(container.current, {
        opacity: 0,
      });
      tl.to(textPara.current, {
        opacity: 0
      },'<');
    }
  }, [progress]);

  return (
    <>
      <div ref={container} className="text-box">
        <p ref={textPara} >
            {text}
        </p>
        <div ref={hider} className="hider"></div>
      </div>
      &nbsp;
    </>
  );
};

export default TextBox;
