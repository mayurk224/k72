import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const Agents = () => {
  const imageDivRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const imageRef = useRef(null);
  const imageArray = [
    "https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg",
    "https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg",
  ];

  useGSAP(function () {
    if (imageDivRef.current) {
      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: "top 28.5%",
          end: "top -65%",
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          pinType: "transform",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: function (self) {
            imageRef.current.src =
              imageArray[Math.floor(self.progress * (imageArray.length - 1))];
          },
        },
      });
    }
  });

  return (
    <div className="h-full w-full">
      <div className="section1 font-[lausanne-500]">
        <div
          ref={imageDivRef}
          className="absolute top-[-30vh] left-80 h-80 w-60 rounded-3xl overflow-hidden"
        >
          <img
            ref={imageRef}
            className="h-full w-full"
            src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg"
            alt=""
          />
        </div>
        <div className="mt-[60vh] relative">
          <h1 className="text-[16vw] uppercase text-white  leading-[15vw] text-center tracking-wider">
            Soixan7th <br />
            Twelve
          </h1>
          <p className="w-[50vw] text-end text-white ml-auto text-4xl">
            &emsp;&emsp;&emsp; Our curiosity fuels our creativity. We remain
            humble and say no to big egos, even yours. A brand is alive. She has
            values, a personality, a history. If we forget that, we can make
            good numbers in the short term, but we kill it in the long term.
            This is why we are committed to giving perspective, to building
            influential brands.
          </p>
        </div>
      </div>

      <div className="section2 h-screen font-[lausanne-300] text-white flex items-center justify-center text-2xl ">
        <div className="container px-56 flex flex-col gap-36">
          <div className="div1 flex justify-between gap-10">
            <h1 className="w-[40vw]">Expertise</h1>
            <ul className="w-[60vw]">
              <li>Strategy</li>
              <li>Advertisement</li>
              <li>Branding</li>
              <li>Design</li>
              <li>Content</li>
            </ul>
          </div>
          <div className="div2 flex justify-between gap-10">
            <h3 className="w-[40vw]">
              Our projects_ are born in humility, grow in curiosity and live
              thanks to creativity in all its forms.
            </h3>
            <h3 className="w-[30vw]">
              Our creation_ is bubbling in an environment where talent wants to
              explode. Where you feel free to be the best version of yourself.
            </h3>
            <h3 className="w-[30vw]">
              Our culture_ is openness to others. Point. The entire crew helps
              build an agency that we are proud of.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
