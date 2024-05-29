import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import PruebaRuta from "./pages/PruebaRuta";
import Misplaylists from "./pages/Misplaylists";
import Verplaylist from "./pages/Verplaylist";
import Albunesguardados from "./pages/Albunesguardados";
import Veralbum from "./pages/Veralbum";
import "./styles/App.css";
import "./styles/Global.css";

function App() {

  //Estados elevados ya que se usan en multiples componentes hijos
  const [currentUser, setCurrentUser] = useState([]);
  const [actualTrack, setActualTrack] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);

  //Ejecuta los metodos al renderizar la pagina.
  useEffect(() => {
    getCurrentUser();
    getPlaylists()
    getAlbums()
    const interval = setInterval(getActualTrack, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //Obtiene usario logeado
  async function getCurrentUser() {
    try {
      const response = await fetch("http://localhost:3000/user");
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  //Cancion escuchando actualmente
  async function getActualTrack() {
    try {
      const response = await fetch("http://localhost:3000/getactualtrack");
      const data = await response.json();
      setActualTrack(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }

  //Obtiene las playlists del usuario.
  async function getPlaylists() {
    try {
      const response = await fetch("http://localhost:3000/getplaylists");
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  //Obtiene los albunes guaradados del usuario.
  async function getAlbums() {
    try {
      const response = await fetch("http://localhost:3000/getalbums");
      const data = await response.json();
      setAlbums(data)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }


  //Devuelve una pagina segun la ruta.
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="/home"
          element={<Home currentUser={currentUser} actualTrack={actualTrack} playlists={playlists} albums={albums}/>}
        />
        <Route path="/playlistshome" element={<Misplaylists currentUser={currentUser} actualTrack={actualTrack} playlists={playlists}/>} />
        <Route path="/verplaylist/:playlistid" element={<Verplaylist currentUser={currentUser} actualTrack={actualTrack} playlists={playlists}/>} />
        <Route path="/albumshome" element={<Albunesguardados currentUser={currentUser} actualTrack={actualTrack} albums={albums}/>} />
        <Route path="/veralbum/:albumid" element={<Veralbum currentUser={currentUser} actualTrack={actualTrack} albums={albums}/>} />
        <Route path="/pruebar" element={<PruebaRuta />} />
        <Route path="/*" element={<Home currentUser={currentUser} actualTrack={actualTrack} playlists={playlists}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
