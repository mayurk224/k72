import { Globe } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FooterText = () => {
  const [indiaTime, setIndiaTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiaTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-center gap-10 relative">
        <div className="absolute -left-20 bottom-28 -rotate-90 flex">
          <Globe
            className="h-7 w-7 text-white animate-spin"
            style={{ animationDuration: "5s" }}
          />
          <h2 className="uppercase pl-3 text-white text-2xl font-[lausanne-500]">
            India
          </h2>
          <h2 className="pl-3 text-white text-2xl font-[lausanne-500]">
            {indiaTime}
          </h2>
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
