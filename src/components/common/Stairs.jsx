import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Stairs = (props) => {
  const locate = useLocation().pathname;

  const stairParentRef = useRef(null);
  const pageRef = useRef(null);

  useGSAP(
    function () {
      const tl = gsap.timeline();
      tl.to(stairParentRef.current, {
        display: "block",
      });
      tl.from(".stair", {
        height: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          amount: -0.25,
        },
      });
      tl.to(".stair", {
        y: "100%",
        duration: 0.6,
        ease: "power2.in",
        stagger: {
          amount: -0.25,
        },
      });
      tl.to(stairParentRef.current, {
        display: "none",
      });
      tl.to(".stair", {
        y: "0%",
      });

      gsap.from(pageRef.current, {
        opacity: 0,
        delay: 1.2,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [locate]
  );

  return (
    <div className="relative overflow-hidden">
      {/* Loader (stairs) */}
      <div
        ref={stairParentRef}
        className="loader fixed inset-0 z-50 flex h-screen w-screen"
      >
        <div className="flex h-full w-full">
          <div className="stair h-full w-1/5 bg-black" />
          <div className="stair h-full w-1/5 bg-black" />
          <div className="stair h-full w-1/5 bg-black" />
          <div className="stair h-full w-1/5 bg-black" />
          <div className="stair h-full w-1/5 bg-black" />
        </div>
      </div>

      {/* Page content */}
      <div ref={pageRef} className="relative z-10">
        {props.children}
      </div>
    </div>
  );
};

export default Stairs;
