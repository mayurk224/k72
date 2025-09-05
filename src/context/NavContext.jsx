import React, { createContext, useState } from "react";

export const NavbarContext = createContext();

const NavContext = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      <NavbarContext.Provider value={{ isNavOpen, setIsNavOpen }}>
        {children}
      </NavbarContext.Provider>
    </div>
  );
};

export default NavContext;
