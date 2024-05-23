import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import cargando from "../images/cargando.gif"
import Table from "../components/Lista"

export default function Verplaylist({ currentUser, actualTrack, playlists }) {

    //La logica de los metodos refresh login se encuentra en todas las pagina para 
    //asegurarse de que hay un usuario autenticado
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([])
    const { playlistid } = useParams();

    //Recibe las canciones de la playlist pasada por la url mediante la targeta
    const getPlaylistTracks = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/getplaylisttracks/${playlistid}`);
            const data = await response.json();
            setTracks(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [playlistid]);

    useEffect(() => {
        getPlaylistTracks();

        if (loading) {
            setLoading(false);
            refreshLogin();
        }
    }, [loading, getPlaylistTracks]);

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


            <h1 className="home-title">
                Canciones en: &nbsp;
                {playlists && playlists.items && playlists.items
                    .filter(item => item.id === playlistid)
                    .map((playlist, index) => {
                        return playlist.name
                    })}
            </h1>

            <a href="/playlistshome">
                <button>VOLVER</button>
            </a>



            <div className="container">
                <div className="izquierda">
                    <Hola currentUser={currentUser} />
                </div>

                {/* Si la playlist tiene canciones, renderiza una lista con estas. */}
                <div className="cuerpo">
                    {tracks.length <= 0 ? (<img src={cargando} alt="cargando" />
                    ) : (
                        <div className="table-container">
                            <Table tracks={tracks} playlists={playlists} currentUser={currentUser} />
                        </div>
                    )}


                </div>

                <div className="derecha">
                    <Escuchando actualTrack={actualTrack} />
                </div>
            </div>


        </div>
    );
}
