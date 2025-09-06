import React, { useRef } from "react";
import Video from "../components/home/Video";
import HeroText from "../components/home/HeroText";
import FooterText from "../components/home/FooterText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      x: 50, // slide up
      opacity: 0, // fade in
      duration: 1, // speed
      ease: "power3.out",
      delay: 0.8, // wait until HeroText starts animating
    });
  }, []);

  return (
    <div className="">
      <div className="h-screen w-screen fixed">
        <Video />
      </div>

      <div className="h-screen w-screen relative flex flex-col justify-between overflow-hidden px-5 py-5">
        <HeroText />
        <div className="flex justify-end">
          <h4
            ref={textRef}
            className="text-white cursor-default font-[lausanne-300] leading-[1.5vw] text-end w-96"
          >
            K72 is an agency that thinks about every action to nourish the
            brand. Tomorrow, in 5 months and in 5 years. We look for the
            friction that creates the spark to generate emotion. To ensure an
            honest relationship, we are without filter, we say what needs to be
            said, we do what needs to be done.
          </h4>
        </div>
        <FooterText />
      </div>
    </div>
  );
};

export default Home;
