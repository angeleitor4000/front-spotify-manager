import React, { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";

export default function Home({ currentUser, actualTrack, playlists }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (loading) {
      setLoading(false);
      refreshLogin();
    }
  }, [loading]);

  async function refreshLogin() {
    try {
      const response = await fetch("http://localhost:3000/refreshlogin");
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        console.log("Credenciales actualizadas exitosamente");
      }
    } catch (error) {
      console.error("Error al actualizar credenciales: ", error);
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
          <Targeta
            playlists={playlists ? playlists : 'URL_POR_DEFECTO'}
            titulo="Mis playlists"
            descripcion="Mira, edita, crea o elimina playlists!"
            botonTexto="VER"
            direccion="/playlistshome"
            currentUser={currentUser}
            contexto="playlists"
          />

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
