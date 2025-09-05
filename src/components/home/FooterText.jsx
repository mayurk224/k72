import { Globe } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Clock from "../common/Clock";

const FooterText = () => {
  

  return (
    <div className="">
      <div className="flex items-center justify-center gap-10 relative">
        <div className="absolute -left-20 bottom-28 -rotate-90 flex font-[lausanne-500]">
          <Clock/>
        </div>
        <Link
          to="/projects"
          className="text-white text-[6vw] font-[lausanne-500] uppercase border-4 border-white rounded-full px-5 leading-20 pt-3 hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
        >
          Projects
        </Link>
        <Link
          to="/agents"
          className="text-white text-[6vw] font-[lausanne-500] uppercase border-4 border-white rounded-full px-5 leading-20 pt-3 hover:text-[#D3FD50] hover:border-[#D3FD50] transition-all duration-200"
        >
          Agents
        </Link>
      </div>
    </div>
  );
};

export default FooterText;
