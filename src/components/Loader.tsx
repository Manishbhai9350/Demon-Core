import { useEffect, useRef } from "react";
import gsap from "gsap";

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Loader = ({ progress = 0 }) => {
  const ringRef = useRef(null);

  useEffect(() => {
    if (!ringRef.current) return;

    gsap.to(ringRef.current, {
      strokeDashoffset: CIRCUMFERENCE * (1 - progress),
      duration: 0.4,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r={RADIUS}
        fill="none"
        stroke="black"
        strokeOpacity="0.25"
        strokeWidth="8"
      />

      {/* Foreground progress ring */}
      <circle
        ref={ringRef}
        cx="60"
        cy="60"
        r={RADIUS}
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        transform="rotate(-90 60 60)"
      />
    </svg>
  );
};

export default Loader;
