import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";

export default function Home({ currentUser, actualTrack }) {
  const [playlists, setPlaylists] = useState([])
  const [cargado, setCargado] = useState(true);

  useEffect(() => {
    if (cargado) {
      setCargado(false);
      refreshLogin();
      const interval = setInterval(getPlaylists, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [cargado]);

  async function refreshLogin() {
    try {
      const response = await fetch("http://localhost:3000/refreshlogin");
      if (response.redirected) {
        //redireccion desde la api, no olvidar
        window.location.href = response.url;
      } else {
        console.log("Credenciales actualizadas exitosamente");
      }
    } catch (error) {
      console.error("Error al actualizar credenciales: ", error);
    }
  }

  async function getPlaylists() {
    try {
      const response = await fetch("http://localhost:3000/getplaylists");
      const data = await response.json();
      setPlaylists(data);
      console.log(playlists)
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }


  return (
    <div className="home-container">
      <h1 className="home-title">¡BIENVENIDO!</h1>

      <div className="container">
        <div className="izquierda">
          <Hola currentUser={currentUser} />
        </div>

        <div className="cuerpo">

          <Targeta image={null} titulo="Mis playlists" descripcion="Mira, edita, crea o elimina playlists!" botonTexto="VER" direccion="/playlistHome"/>
          {/*          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo={actualTrack.item.name} descripcion={"Cancion de: " + actualTrack.item.artists[0].name} botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}*/ }


        </div>

        <div className="derecha">
          <Escuchando actualTrack={actualTrack} />
        </div>
      </div>

      <a href="/">
        <button style={{ marginTop: "50px", marginBottom: "50px" }}>VOLVER</button>
      </a>
    </div>
  );
}
