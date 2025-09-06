import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { NavbarContext } from "../context/NavContex";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const location = useLocation();
  const { isNavOpen, setIsNavOpen } = useContext(NavbarContext);
  const ctxRef = useRef();
  const menuTlRef = useRef();

  // Animation configuration - centralized for easy tweaking
  const ANIMATION_CONFIG = {
    durations: {
      fast: 0.2,
      medium: 0.4,
      slow: 0.5,
    },
    heights: {
      menuCollapsed: "3.5rem",
      menuExpanded: "8rem",
      agents: "5.5rem",
      projects: "3.5rem",
    },
    ease: "power2.inOut",
    stagger: 0.05,
  };

  useEffect(() => {
    if (location.pathname === "/") return;

    // Clean up previous animations more safely
    ctxRef.current?.kill();
    menuTlRef.current?.kill();

    const ctx = gsap.context(() => {
      // Cache selectors for better performance
      const selectors = {
        projectsDiv: ".projectsDiv",
        agentsDiv: ".agentsDiv",
        menuDiv: ".menuDiv",
        projectsH3: ".projectsDiv h3",
        agentsH3: ".agentsDiv h3",
        menuH3: ".menuDiv h3",
        allH3: [".projectsDiv h3", ".agentsDiv h3", ".menuDiv h3"],
        collapsibleDivs: [".projectsDiv", ".agentsDiv"],
        collapsibleH3s: [".projectsDiv h3", ".agentsDiv h3"],
      };

      // Initial setup - batch DOM operations
      gsap.set([selectors.projectsDiv, selectors.agentsDiv], {
        height: 0,
        overflow: "hidden",
      });
      gsap.set(selectors.allH3, { opacity: 0 });
      gsap.set(selectors.menuDiv, {
        height: ANIMATION_CONFIG.heights.menuCollapsed,
      });

      // Improved load timeline with better timing
      const loadTl = gsap.timeline({
        defaults: {
          ease: ANIMATION_CONFIG.ease,
          force3D: true, // Enable hardware acceleration
        },
      });

      loadTl
        .to(selectors.menuDiv, {
          height: ANIMATION_CONFIG.heights.menuExpanded,
          duration: ANIMATION_CONFIG.durations.medium,
        })
        .to(
          selectors.menuH3,
          {
            opacity: 1,
            duration: ANIMATION_CONFIG.durations.fast,
          },
          "-=0.2"
        )
        .to(
          selectors.agentsDiv,
          {
            height: ANIMATION_CONFIG.heights.agents,
            duration: ANIMATION_CONFIG.durations.medium,
          },
          "-=0.2"
        )
        .to(
          selectors.agentsH3,
          {
            opacity: 1,
            duration: ANIMATION_CONFIG.durations.fast,
          },
          "-=0.2"
        )
        .to(
          selectors.projectsDiv,
          {
            height: ANIMATION_CONFIG.heights.projects,
            duration: ANIMATION_CONFIG.durations.medium,
          },
          "-=0.2"
        )
        .to(
          selectors.projectsH3,
          {
            opacity: 1,
            duration: ANIMATION_CONFIG.durations.fast,
          },
          "-=0.2"
        );

      // Optimized scroll-triggered animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "3% top",
          end: "10% top",
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          // Add markers for debugging (remove in production)
          // markers: true
        },
        defaults: {
          ease: ANIMATION_CONFIG.ease,
          force3D: true,
        },
      });

      scrollTl
        .to(selectors.collapsibleH3s, {
          opacity: 0,
          duration: 0.3,
          stagger: ANIMATION_CONFIG.stagger,
        })
        .to(
          selectors.collapsibleDivs,
          {
            height: 0,
            duration: ANIMATION_CONFIG.durations.slow,
            stagger: 0.1,
          },
          "<0.1"
        )
        .to(
          selectors.menuH3,
          {
            opacity: 0,
            duration: 0.25,
          },
          "<"
        )
        .to(
          selectors.menuDiv,
          {
            height: ANIMATION_CONFIG.heights.menuCollapsed,
            duration: ANIMATION_CONFIG.durations.medium,
          },
          "<0.1"
        );

      // Create menu timeline with better performance
      menuTlRef.current = gsap
        .timeline({
          paused: true,
          defaults: { force3D: true },
        })
        .to(".navItems", {
          opacity: 0,
          y: -10, // Add subtle movement
          duration: 0.3,
          stagger: ANIMATION_CONFIG.stagger,
          ease: "power2.in",
        })
        .fromTo(
          ".closeMenu",
          {
            xPercent: 100,
            autoAlpha: 0,
            scale: 0.8, // Add scale for smoother entry
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: ANIMATION_CONFIG.durations.medium,
            ease: "back.out(1.7)",
          }
        );
    }, selectors); // Pass selectors as scope for better performance

    ctxRef.current = ctx;

    // Cleanup function
    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === "body") {
          trigger.kill();
        }
      });
    };
  }, [location.pathname]);

  // Separate effect for menu state with debouncing
  useEffect(() => {
    const tl = menuTlRef.current;
    if (!tl) return;

    // Add slight delay to prevent rapid toggling issues
    const timeoutId = setTimeout(() => {
      if (isNavOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [isNavOpen]);

  // Optional: Add resize handler for responsive behavior
  useEffect(() => {
    // Simple debounce implementation
    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
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
        <div
          className={`navItems flex text-white text-xl uppercase transition-all duration-1000 ${
            isNavOpen ? "hidden" : "flex"
          }`}
        >
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
          <div
            className="menuDiv w-60 h-32 bg-black flex flex-col justify-between relative group overflow-hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className="hoverDiv flex flex-col justify-between h-full w-full z-20 cursor-pointer">
              <div className="flex flex-col items-end p-5 gap-1 ">
                <hr className="w-28 h-0.5 bg-white border-none transition-colors duration-200 group-hover:bg-black" />
                <hr className="w-20 h-[3px] bg-white border-none transition-colors duration-200 group-hover:bg-black" />
              </div>
              <h3 className="menuText text-white px-3 transition-all duration-200 group-hover:text-black">
                Menu
              </h3>
            </div>

            <div className="animateDiv w-full h-0 bg-[#D3FD50] absolute top-0 left-0 z-10 transition-all duration-200 group-hover:h-full"></div>
          </div>
        </div>
        <div
          className={`closeMenu relative flex items-center justify-center w-24 h-24 overflow-hidden mr-3 mt-3 group transition-all duration-1000 ${
            !isNavOpen ? "hidden" : "flex"
          }`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <hr className="absolute w-56 h-0.5 bg-white border-none rotate-45 group-hover:bg-[#D3FD50]" />
          <hr className="absolute w-56 h-0.5 bg-white border-none -rotate-45 group-hover:bg-[#D3FD50]" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
