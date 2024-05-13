import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Targeta from "../components/Targeta";
import cargando from "../images/cargando.gif"

export default function Verplaylist({ currentUser, actualTrack }) {
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([])
    const { playlistid } = useParams();

    useEffect(() => {
        getPlaylistTracks()
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


    async function getPlaylistTracks() {
        try {
            const response = await fetch(`http://localhost:3000/getplaylisttracks/${playlistid}`);
            const data = await response.json();
            setTracks(data);
            //console.log(data[30].track.album.images[0].url)
        } catch (error) {
            console.error("Error fetching user:", error);
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
                    {/*<p>Aqui va la lista de la playlist: {playlistid}</p>*/}

                    {tracks && tracks
                        .filter(track => !track.is_local)
                        .map((track, index) => {
                            return <Targeta key={index}
                                playlists = {track ? track.track.album.images[0].url : "URL_POR_DEFECTO"}
                                titulo={track ? track.track.name : 'SIN NOMBRE'}
                                descripcion=""
                                botonTexto="VER"
                                currentUser={currentUser}
                                contexto= "libre"
                            />;
                        })}

                    {tracks.length <= 0 && <img src={cargando} />}
                </div>

                <div className="derecha">
                    <Escuchando actualTrack={actualTrack} />
                </div>
            </div>

            <a href="/playlistshome">
                <button style={{ marginTop: "50px", marginBottom: "50px" }}>VOLVER</button>
            </a>

        </div>
    );
}
