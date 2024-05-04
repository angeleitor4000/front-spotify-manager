import React from "react";
import "../styles/HolaEscuchandoEstilo.css";

export default function Escuchando(props) {
    const { actualTrack } = props;

    return (
        <div className="hola-escuchando-container">
            <p>{actualTrack.item && ((!actualTrack.item.is_local ? (actualTrack.item.name + " BY: " + actualTrack.item.artists[0].name) : ''))}</p>
            {actualTrack.item && !actualTrack.item.is_local && (
                <img src={actualTrack.item.album.images[0].url} alt="" className="imagen-escuchando"></img>
            )}
            <p>{actualTrack.item && ((actualTrack.item.is_local && 'Cancion local: No se puede recuperar datos'))}</p>
            <p>{!actualTrack.item && 'Actualmente no estas escuchando nada'}</p>
        </div>
    );
}
