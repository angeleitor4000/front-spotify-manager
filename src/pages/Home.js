import React, { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";

export default function Home({ currentUser, actualTrack, playlists, albums }) {

  //La logica de los metodos refresh login se encuentra en todas las pagina para 
  //asegurarse de que hay un usuario autenticado
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

      <a href="/">
        <button>SALIR</button>
      </a>


      <div className="container">
        <div className="izquierda">
          <Hola currentUser={currentUser} />
        </div>

        {/* Renderiza una Targeta diseñada con parametros*/}
        <div className="cuerpo">
          <Targeta
            playlists={playlists ? playlists : 'URL_POR_DEFECTO'}
            titulo="Mis playlists"
            descripcion="Mira, modifica, crea o elimina playlists!"
            botonTexto="VER"
            direccion="/playlistshome"
            currentUser={currentUser}
            contexto="playlists"
          />


          <Targeta
            playlists={albums ? albums : 'URL_POR_DEFECTO'}
            titulo="Mis albunes guardados"
            descripcion="Añade canciones de tus albunes guardadados a tus playlists"
            botonTexto="VER"
            direccion="/albumshome"
            currentUser={currentUser}
            contexto="albums"
          />


        </div>

        <div className="derecha">
          <Escuchando actualTrack={actualTrack} />
        </div>
      </div>

    </div>
  );
}
