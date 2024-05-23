import React from "react";
import "../styles/HolaEscuchandoEstilo.css";
import noaudio from "../images/noaudio.png"

export default function Escuchando(props) {
    const { actualTrack } = props;

    //Las multiples comparaciones sirven para gestionar lo diferentes errores en caso de que no se este escuchando una cancion
    return (
        <div className="hola-escuchando-container">
            {actualTrack.item && <h1>Estas escuchando:</h1>}
            {actualTrack.item && ((!actualTrack.item.is_local ? (
                <p>"{actualTrack.item.name}" <i>&nbsp;de:&nbsp;&nbsp;</i> {actualTrack.item.artists[0].name}</p>
            ) : (
                <p>''</p>
            )))}
            
            {actualTrack.item && !actualTrack.item.is_local && (
                <img src={actualTrack.item.album.images[0].url} alt="" className="imagen-escuchando"/>
            )}
            {actualTrack.item && ((actualTrack.item.is_local && <p>Cancion local: No se puede recuperar datos</p>))}
            {!actualTrack.item && <p>Actualmente no estas escuchando nada</p>}
            {!actualTrack.item && <img src={noaudio} alt="" className="imagen-escuchando"/>}
        </div>
    );
}
