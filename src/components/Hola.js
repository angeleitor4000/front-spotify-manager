import React from "react";
import "../styles/HolaEscuchandoEstilo.css";
import perfilVacio from "../images/perfilVacio.jpg"

export default function Hola(props) {
    const { currentUser } = props;

    //Las multiples comparaciones sirven para gestionar lo diferentes errores en caso de que el usuario tenga foto o nombre o no
    const getUserImage = (images) => {
        if (!images || images.length === 0) return null;
        return images[1] ? images[1].url : images[0].url; // Fallback al primer índice si el segundo no existe
    };

    return (
        <div className="hola-escuchando-container">
            <h1>¡Hola!</h1>

            <p>{currentUser ? currentUser.display_name : ''}</p>
            {currentUser && getUserImage(currentUser.images) ? (
                <img src={getUserImage(currentUser.images)} alt="Perfil" className="imagen-hola"></img>
            ) : (
                <img src={perfilVacio} alt="Perfil" className="imagen-hola"></img>
            )}
        </div>
    );
}
