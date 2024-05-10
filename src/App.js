import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import PruebaRuta from "./pages/PruebaRuta";
import ErrorPage from "./pages/ErrorPage";
import "./styles/App.css";
import "./styles/Global.css";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [actualTrack, setActualTrack] = useState([]);

  useEffect(() => {
    getCurrentUser();
    const interval = setInterval(getActualTrack, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function getCurrentUser() {
    try {
      const response = await fetch("http://localhost:3000/user");
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function getActualTrack() {
    try {
      const response = await fetch("http://localhost:3000/getactualtrack");
      const data = await response.json();
      setActualTrack(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="/home"
          element={<Home currentUser={currentUser} actualTrack={actualTrack} />}
        />
        <Route path="/pruebar" element={<PruebaRuta />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
