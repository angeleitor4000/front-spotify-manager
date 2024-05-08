import React from "react";
import "../styles/HolaEscuchandoEstilo.css";

export default function Escuchando(props) {
    const { actualTrack } = props;

    return (
        <div className="hola-escuchando-container">
            
            {actualTrack.item && ((!actualTrack.item.is_local ? (
                <p>{actualTrack.item.name} BY: {actualTrack.item.artists[0].name}</p>
            ) : (
                <p>''</p>
            )))}
            
            {actualTrack.item && !actualTrack.item.is_local && (
                <img src={actualTrack.item.album.images[0].url} alt="" className="imagen-escuchando"></img>
            )}
            {actualTrack.item && ((actualTrack.item.is_local && <p>Cancion local: No se puede recuperar datos</p>))}
            {!actualTrack.item && <p>Actualmente no estas escuchando nada</p>}
        </div>
    );
}
