import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavbarContext } from "../context/NavContex";
import Clock from "./Clock";

const FullscreenMenu = () => {
  const [hoverDirection, setHoverDirection] = useState("top");
  const { isNavOpen, setIsNavOpen } = useContext(NavbarContext);

  const fullNavLinkRef = useRef(null);
  const fullScreenRef = useRef(null);
  const tlRef = useRef(null);

  const handleMouseEnter = (e) => {
    const { top, bottom } = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;

    if (mouseY - top < bottom - mouseY) {
      setHoverDirection("top");
    } else {
      setHoverDirection("bottom");
    }
  };

  useGSAP(() => {
    // Kill any existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (isNavOpen) {
      // Open animation
      gsap.set(fullScreenRef.current, { display: "block" });

      tlRef.current = gsap.timeline();

      tlRef.current
        .fromTo(
          ".stair2",
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 0.6,
            ease: "power2.out",
            stagger: {
              amount: 0.25,
            },
          }
        )
        .fromTo(
          ".item",
          {
            rotateX: 90,
            opacity: 0,
            transformPerspective: 1000,
          },
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
            stagger: {
              amount: 0.25,
            },
          }
          // "-=0.3"
        )
        .fromTo(
          ".NavContainer",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.4"
        );
    } else if (fullScreenRef.current) {
      // Close animation
      tlRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(fullScreenRef.current, { display: "none" });
        },
      });

      tlRef.current
        .to(".NavContainer", {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          ".item",
          {
            rotateX: 90,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: {
              amount: -0.15,
            },
          },
          "-=0.2"
        )
        .to(
          ".stair2",
          {
            height: 0,
            duration: 0.6,
            ease: "power2.in",
            stagger: {
              amount: -0.25,
            },
          },
          "-=0.3"
        );
    }

    // Cleanup function
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isNavOpen]);

  // Initial hidden state
  useGSAP(
    () => {
      if (!isNavOpen) {
        gsap.set(fullScreenRef.current, { display: "none" });
        gsap.set(".stair2", { height: 0 });
        gsap.set(".item", { rotateX: 90, opacity: 0 });
        gsap.set(".NavContainer", { opacity: 0 });
      }
    },
    { dependencies: [], revertOnUpdate: false }
  );

  return (
    <div
      ref={fullScreenRef}
      className="h-screen w-full fullScreenNav absolute top-0 z-30 overflow-hidden"
    >
      <div className="h-screen w-full fixed">
        <div className="flex h-full w-full">
          <div className="stair2 h-full w-1/5 bg-black" />
          <div className="stair2 h-full w-1/5 bg-black" />
          <div className="stair2 h-full w-1/5 bg-black" />
          <div className="stair2 h-full w-1/5 bg-black" />
          <div className="stair2 h-full w-1/5 bg-black" />
        </div>
      </div>

      <div
        ref={fullNavLinkRef}
        className="flex flex-col justify-between h-screen w-full relative NavContainer"
      >
        <div className="container font-[lausanne-500] text-[8vw] uppercase text-white text-center mt-[18vh] leading-[7vw] cursor-default">
          <div
            className="item origin-top border-y-1 relative"
            style={{ transformOrigin: "top center" }}
            onMouseEnter={handleMouseEnter}
          >
            <h1 className="pt-4">Work</h1>

            {/* hoverContainer */}
            <div
              className={`hoverContainer flex absolute text-black bg-[#D3FD50] transition-all duration-300 ease-in-out 
              ${
                hoverDirection === "top"
                  ? "top-0 origin-top"
                  : "bottom-0 origin-bottom"
              }
              `}
            >
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">See Everything</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">See Everything</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">See Everything</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">See Everything</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
          </div>

          <div
            className="item origin-top border-b-1 relative"
            style={{ transformOrigin: "top center" }}
            onMouseEnter={handleMouseEnter}
          >
            <h1 className="pt-4">Agents</h1>

            {/* hoverContainer */}
            <div
              className={`hoverContainer flex absolute text-black bg-[#D3FD50] transition-all duration-300 ease-in-out 
              ${
                hoverDirection === "top"
                  ? "top-0 origin-top"
                  : "bottom-0 origin-bottom"
              }
              `}
            >
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Know us</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Know us</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Know us</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Know us</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
          </div>

          <div
            className="item origin-top border-b-1 relative"
            style={{ transformOrigin: "top center" }}
            onMouseEnter={handleMouseEnter}
          >
            <h1 className="pt-4">Contact</h1>

            {/* hoverContainer */}
            <div
              className={`hoverContainer flex absolute text-black bg-[#D3FD50] transition-all duration-300 ease-in-out 
              ${
                hoverDirection === "top"
                  ? "top-0 origin-top"
                  : "bottom-0 origin-bottom"
              }
              `}
            >
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Send us a fax</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Send us a fax</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Send us a fax</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Send us a fax</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
          </div>

          <div
            className="item origin-top border-b-1 relative"
            style={{ transformOrigin: "top center" }}
            onMouseEnter={handleMouseEnter}
          >
            <h1 className="pt-4">Blog</h1>

            {/* hoverContainer */}
            <div
              className={`hoverContainer flex absolute text-black bg-[#D3FD50] transition-all duration-300 ease-in-out 
              ${
                hoverDirection === "top"
                  ? "top-0 origin-top"
                  : "bottom-0 origin-bottom"
              }
              `}
            >
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Read Articles</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Read Articles</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="moveX hoverItem flex gap-5 overflow-y-hidden">
                <h1 className="whitespace-nowrap">Read Articles</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
                <h1 className="whitespace-nowrap">Read Articles</h1>
                <img
                  src="https://images.pexels.com/photos/33577319/pexels-photo-33577319.jpeg"
                  alt=""
                  className="h-24 w-60 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer p-1 flex items-center justify-between w-full">
          <div className="font-[lausanne-300] w-full">
            <Clock />
          </div>
          <div className="flex w-full items-center justify-center gap-5">
            <Link
              to=""
              className="text-white text-sm font-[lausanne-500] uppercase hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
            >
              Privacy Policy
            </Link>
            <hr className="w-[2px] h-5 bg-white" />
            <Link
              to=""
              className="text-white text-sm font-[lausanne-500] uppercase hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="social flex gap-3 w-full items-center justify-end">
            <Link
              to=""
              className="text-white text-2xl font-[lausanne-500] uppercase hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200 border-2 rounded-full p-2 h-12 w-12 text-center flex items-center justify-center leading-5"
            >
              IG
            </Link>
            <Link
              to=""
              className="text-white text-2xl font-[lausanne-500] uppercase hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200 border-2 rounded-full p-2 h-12 w-12 text-center flex items-center justify-center leading-5"
            >
              LI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMenu;
