import React, { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";

export default function Misplaylists({ currentUser, actualTrack, playlists }) {
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
            <h1 className="home-title">¡TUS PLAYLISTS!</h1>

            <div className="container">
                <div className="izquierda">
                    <Hola currentUser={currentUser} />
                </div>

                <div className="cuerpo">
                    {playlists && playlists.items && playlists.items
                        .filter(item => item.owner.display_name === currentUser.display_name)
                        .map((playlist, index) => {
                            return <Targeta key={index}
                            playlists={playlist ? playlist.images[0].url : 'URL_POR_DEFECTO'}
                            titulo={playlist ? playlist.name : 'SIN NOMBRE'}
                            descripcion={playlist ? playlist.description : ''}
                            botonTexto="VER"
                            direccion={`/verplaylist/${playlist.id}`}
                            currentUser={currentUser}
                            contexto="misplaylists"
                            playlistid={playlist.id}
                          />;
                        })}

                </div>

                <div className="derecha">
                    <Escuchando actualTrack={actualTrack} />
                </div>
            </div>

            <a href="/home">
                <button style={{ marginTop: "50px", marginBottom: "50px" }}>VOLVER</button>
            </a>

        </div>
    );
}
