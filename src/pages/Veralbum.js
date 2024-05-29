import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import cargando from "../images/cargando.gif"
import Table from "../components/Lista"


export default function Veralbum({ currentUser, actualTrack, albums }) {

    //La logica de los metodos refresh login se encuentra en todas las pagina para 
    //asegurarse de que hay un usuario autenticado
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([])
    const { albumid } = useParams();

    //Recibe las canciones de la playlist pasada por la url mediante la targeta
    const getAlbumTracks = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/getalbumtracks/${albumid}`);
            const data = await response.json();
            setTracks(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [albumid]);

    useEffect(() => {
        getAlbumTracks();

        if (loading) {
            setLoading(false);
            refreshLogin();
        }
    }, [loading, getAlbumTracks]);

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
                {albums && albums.items && albums.items
                    .filter(item => item.album.id === albumid)
                    .map((item, index) => {
                        return item.album.name
                    })}
            </h1>

            <a href="/albumshome">
                <button>VOLVER</button>
            </a>



            <div className="container">
                <div className="izquierda">
                    <Hola currentUser={currentUser} />
                </div>

                {/* Si la playlist tiene canciones, renderiza una lista con estas. */}
                <div className="cuerpo">
                    {/*

                     */}

                    {tracks.length <= 0 ? (<img src={cargando} alt="cargando" />
                    ) : (
                        <div className="table-container">
                            <Table tracks={tracks} currentUser={currentUser} contexto={"albums"} albumname={albums && albums.items && albums.items
                                .filter(item => item.album.id === albumid)
                                .map((item, index) => {
                                    return item.album.name
                                })} 
                                albumImg={albums && albums.items && albums.items
                                    .filter(item => item.album.id === albumid)
                                    .map((item, index) => {
                                        return item.album.images[0].url
                                    })}
                                    />
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