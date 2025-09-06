import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import FullscreenMenu from "./components/FullscreenMenu";

const App = () => {
  return (
    <>
      <Navbar />
      <FullscreenMenu />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
