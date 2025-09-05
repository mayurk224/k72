import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    // 🚨 If path is `/`, skip animation entirely
    if (location.pathname === "/") return;

    const ctx = gsap.context(() => {
      // Initial load animation: collapsed → expanded
      const loadTimeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });
      loadTimeline
        .set([".projectsDiv", ".agentsDiv"], { height: 0, overflow: "hidden" })
        .set([".projectsDiv h3", ".agentsDiv h3", ".menuDiv h3"], {
          opacity: 0,
        })
        .set(".menuDiv", { height: "3.5rem" })
        .to(".menuDiv", { height: "8rem", duration: 0.4 })
        .to(".menuDiv h3", { opacity: 1, duration: 0.2 }, "-=0.3")
        .to(".agentsDiv", { height: "5.5rem", duration: 0.4 }, "-=0.3")
        .to(".agentsDiv h3", { opacity: 1, duration: 0.2 }, "-=0.3")
        .to(".projectsDiv", { height: "3.5rem", duration: 0.4 }, "-=0.3")
        .to(".projectsDiv h3", { opacity: 1, duration: 0.2 }, "-=0.3");

      // Scroll-triggered collapse animation
      const navTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top+=3% top",
          end: "top+=10% top",
          scrub: 1,
          preventOverlaps: true,
          refreshPriority: -1,
          // markers: true,
        },
        defaults: { ease: "power2.inOut" },
      });

      navTimeline
        .to([".projectsDiv h3", ".agentsDiv h3"], {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        })
        .to(
          [".projectsDiv", ".agentsDiv"],
          {
            height: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "<0.1"
        )
        .to(
          ".menuDiv h3",
          {
            opacity: 0,
            duration: 0.25,
          },
          "<"
        )
        .to(
          ".menuDiv",
          {
            height: "3.5rem",
            duration: 0.4,
          },
          "<0.1"
        );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="navContainer flex justify-between font-[lausanne-500]">
        <div className="logoDiv p-2">
          <a href="" className="relative z-30">
            <img
              src="k72.png"
              alt="Logo"
              className="h-14 w-32 object-cover invert"
            />
          </a>
        </div>
        <div className="navItems flex text-white text-xl uppercase">
          <div className="projectsDiv w-[19rem] h-14 bg-black flex items-end relative group overflow-hidden">
            <h3 className="menuText pl-2 z-20 group-hover:text-black transition-all duration-200 ">
              Projects
            </h3>
            {/* Animate background */}
            <div className="animateDiv w-full h-0 bg-[#D3FD50] absolute top-0 left-0 z-10 transition-all duration-200 group-hover:h-full"></div>
          </div>
          <div className="agentsDiv w-[28.5rem] h-22 bg-black flex items-end group relative overflow-hidden">
            <h3 className="menuText pl-2 z-20 group-hover:text-black transition-all duration-200 ">
              Agents
            </h3>

            {/* Animate background */}
            <div className="animateDiv w-full h-0 bg-[#D3FD50] absolute top-0 left-0 z-10 transition-all duration-200 group-hover:h-full"></div>
          </div>
          <div className="menuDiv w-60 h-32 bg-black flex flex-col justify-between relative group overflow-hidden">
            {/* Hoverable area */}
            <div className="hoverDiv flex flex-col justify-between h-full w-full z-20 cursor-pointer">
              <div className="flex flex-col items-end p-5 gap-1 ">
                <hr className="w-28 h-0.5 bg-white border-none transition-colors duration-200 group-hover:bg-black" />
                <hr className="w-20 h-[3px] bg-white border-none transition-colors duration-200 group-hover:bg-black" />
              </div>
              <h3 className="menuText text-white px-3 transition-all duration-200 group-hover:text-black">
                Menu
              </h3>
            </div>

            {/* Animate background */}
            <div className="animateDiv w-full h-0 bg-[#D3FD50] absolute top-0 left-0 z-10 transition-all duration-200 group-hover:h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
