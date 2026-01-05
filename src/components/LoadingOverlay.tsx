import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingOverlayProps {
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number; // 0 → 1
}

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LoadingOverlay = ({
  clicked,
  setClicked,
  progress,
}: LoadingOverlayProps) => {
  const ringRef = useRef<SVGCircleElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Progress animation
  useEffect(() => {
    if (!ringRef.current) return;

    gsap.killTweensOf(ringRef.current)

    gsap.to(ringRef.current, {
      strokeDashoffset: CIRCUMFERENCE * (1 - progress),
      duration: 0.4,
      ease: "power2.out",
    });
  }, [progress]);

  // Fade out on click
  useEffect(() => {
    if (!clicked || !containerRef.current) return;

     gsap.to(ringRef.current, {
      strokeDashoffset: CIRCUMFERENCE,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        containerRef.current!.style.pointerEvents = "none";
        gsap.set(containerRef.current,{
          display:'none'
        })
      },
    });
  }, [clicked]);

  const isReady = progress >= 1;

  return (
    <div
      ref={containerRef}
      className="loader-container"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        opacity: 1,
      }}
    >
      {/* SVG acts as ENTER button */}
      <button
        onClick={() => isReady && setClicked(true)}
        disabled={!isReady}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: isReady ? "pointer" : "not-allowed",
          opacity: isReady ? 1 : 0.6,
          pointerEvents: isReady ? "auto" : "none",
        }}
        aria-label="Enter experience"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="2"
          />

          {/* Progress ring */}
          <circle
            ref={ringRef}
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform="rotate(-90 60 60)"
          />

          {/* ENTER label */}
          {isReady && (
            <text
              className="noto-serif-md"
              x="60"
              y="66"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              letterSpacing="2"
              style={{ userSelect: "none" }}
            >
              Enter
            </text>
          )}
        </svg>
      </button>
    </div>
  );
};

export default LoadingOverlay;
