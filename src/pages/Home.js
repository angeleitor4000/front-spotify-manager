import "../styles/Home.css";
import { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";

export default function Home({ currentUser, actualTrack }) {
  const [cargado, setCargado] = useState(true);

  useEffect(() => {
    if (cargado) {
      setCargado(false);
      refreshLogin();
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

  return (
    <div className="home-container">
      <h1 className="home-title">¡BIENVENIDO!</h1>

      <div className="container">
        <div className="izquierda">
          <Hola currentUser={currentUser} />
        </div>

        <div className="cuerpo">
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}

          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
          {actualTrack.item && !actualTrack.item.is_local && (
            <Targeta image={actualTrack.item.album.images[0].url} titulo="Prueba" descripcion="Descripcion lorem itsum" botonTexto="VER" currentUser={currentUser} actualTrack={actualTrack} />

          )}
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
