import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Clock from "../Clock";

const FooterText = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      // Initial states
      gsap.set(".footer-link-wrapper", { y: 100, opacity: 0 });
      gsap.set(".footer-clock", { x: -100, opacity: 0 });

      // Timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate clock first
      tl.to(".footer-clock", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Then animate links
      tl.to(
        ".footer-link-wrapper",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "-=0.3"
      ); // overlap a bit with clock animation
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-center gap-10 relative">
        {/* Clock */}
        <div className="footer-clock absolute -left-20 bottom-28 -rotate-90 flex font-[lausanne-500]">
          <Clock />
        </div>

        {/* Links */}
        <div className="footer-link-wrapper overflow-hidden">
          <Link
            to="/projects"
            className="footer-link block text-white text-[6vw] font-[lausanne-500] uppercase border-4 border-white rounded-full px-5 leading-20 pt-3 hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
          >
            Projects
          </Link>
        </div>

        <div className="footer-link-wrapper overflow-hidden">
          <Link
            to="/agents"
            className="footer-link block text-white text-[6vw] font-[lausanne-500] uppercase border-4 border-white rounded-full px-5 leading-20 pt-3 hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
          >
            Agents
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterText;
