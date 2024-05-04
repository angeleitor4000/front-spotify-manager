import React from "react";
import "../styles/HolaEscuchandoEstilo.css";

export default function Hola(props) {
    const { currentUser } = props;

    return (
        <div className="hola-escuchando-container">
            <p>{currentUser ? currentUser.display_name : ''}</p>
            {currentUser && currentUser.images && (
                <img src={currentUser.images[1].url} alt="" className="imagen-hola"></img>
            )}
        </div>
    );
}
