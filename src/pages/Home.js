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
        // Redirigir al URL indicado por el servidor
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
          <Targeta/>
        </div>

        <div className="derecha">
          <Escuchando actualTrack={actualTrack} />
        </div>
      </div>

      <a href="/">
        <button>VOLVER</button>
      </a>
    </div>
  );
}
