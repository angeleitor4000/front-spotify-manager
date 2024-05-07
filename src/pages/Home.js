import "../styles/Home.css";
import { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";

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
        console.log("Credentials refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing credentials: ", error);
    }
  }

  return (
    <div>
      <h1>Dentro</h1>
      <a href="/">
        <button>VOLVER</button>
      </a>

      <div className="container">
        <div className="izquierda">
          <Hola currentUser={currentUser} />
        </div>
        <div className="cuerpo">{/* Contenido del cuerpo */}</div>
        <div className="derecha">
          <Escuchando actualTrack={actualTrack} />
        </div>
      </div>
    </div>
  );
}
