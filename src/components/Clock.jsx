import { Globe } from "lucide-react";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [indiaTime, setIndiaTime] = useState(
    new Date().toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiaTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-28 w-56">
      <div className="">
        <Globe
          className="h-7 w-7 text-white animate-spin"
          style={{ animationDuration: "5s" }}
        />
      </div>
      <div className="flex items-center">
        <h2 className="uppercase pl-3 text-white text-2xl ">India</h2>
        <h2 className="pl-3 text-white text-2xl">{indiaTime}</h2>
      </div>
    </div>
  );
};

export default Clock;
