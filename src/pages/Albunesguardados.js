import React, { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";
import Targeta from "../components/Targeta";
import noImagePlaylist from '../images/NoImagePlaylist.png'; // Ruta de la imagen de stock


export default function Albunesguardados({ currentUser, actualTrack, albums }){

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
            <h1 className="home-title">¡TUS ALBUNES GUARDADOS!</h1>
            <a href="/home">
                <button>VOLVER</button>
            </a>


            <div className="container">
                <div className="izquierda">
                    <Hola currentUser={currentUser} />
                </div>

                {/* renderiza un lista de targetas segun las playlist del usuario */}
                <div className="cuerpo">
                    {albums && albums.items && albums.items
                        .filter(item =>
                            item.album.tracks.total !== 0
                        )
                        .map((item, index) => {
                            return <Targeta key={index}
                                playlists={item && item.album.images ? (item.album.images[0].url) : { noImagePlaylist }}
                                titulo={item ? item.album.name : 'SIN NOMBRE'}
                                descripcion={item ? item.album.description : ''}
                                botonTexto="VER"
                                direccion={`/veralbum/${item.album.id}`}
                                currentUser={currentUser}
                                contexto="misplaylists"
                                playlistid={item.album.id}
                            />;
                        })}

                </div>

                <div className="derecha">
                    <Escuchando actualTrack={actualTrack} />
                </div>
            </div>

        </div>
    );
}