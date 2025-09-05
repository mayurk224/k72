import React from "react";
import Video from "./Video";

const HeroText = () => {
  return (
    <div>
      <div className="flex flex-col text-center uppercase text-white text-[8vw] font-[lausanne-300] leading-[8vw]">
        <div className="flex items-center justify-center">
          The{" "}
          <div className="h-24 w-72 rounded-full overflow-hidden">
            {" "}
            <Video />{" "}
          </div>{" "}
          spark{" "}
        </div>
        <div>who generates</div>
        <div>there creativity</div>
      </div>
    </div>
  );
};

export default HeroText;
