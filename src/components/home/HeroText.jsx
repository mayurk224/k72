import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Video from "./Video";

gsap.registerPlugin(SplitText);

const HeroText = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      const lines = gsap.utils.toArray(".hero-line");

      lines.forEach((line, index) => {
        // Split only <span> text, ignore video div
        const splitText = new SplitText(line.querySelectorAll("span"), {
          type: "chars",
        });

        // Set initial state for chars
        gsap.set(splitText.chars, { yPercent: -100, opacity: 0 });

        // Animate text chars
        gsap.to(splitText.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            amount: 0.4,
            from: "start",
          },
          delay: index * 0.3 + 0.5,
        });

        // Fade in video container if it exists in this line
        const video = line.querySelector(".video-container");
        if (video) {
          gsap.set(video, { opacity: 0, scale: 0.9 });
          gsap.to(video, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.3 + 0.5, // sync with line timing
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="flex flex-col text-center uppercase text-white text-[8vw] font-[lausanne-300] leading-[8vw] overflow-hidden">
        {/* First line with video */}
        <div className="hero-line flex items-center justify-center overflow-hidden">
          <span>The</span>
          <div className="video-container h-24 w-72 rounded-full overflow-hidden mx-4">
            <Video />
          </div>
          <span>spark</span>
        </div>

        {/* Other lines */}
        <div className="hero-line overflow-hidden">
          <span>who generates</span>
        </div>
        <div className="hero-line overflow-hidden">
          <span>their creativity</span>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
