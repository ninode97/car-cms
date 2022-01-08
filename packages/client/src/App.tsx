import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();
  useEffect(() => {
    const root = (document as any).querySelector("html");
    root.style.scrollBehavior = "auto";
    (window as any).scroll({ top: 0 });
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
