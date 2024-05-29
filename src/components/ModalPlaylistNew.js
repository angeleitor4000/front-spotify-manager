import React, { useState, useEffect } from 'react';

function ModalPlaylistNew({ showModal, setShowModal, handleAddSelectedTracksToNew }) {
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar si se muestra el mensaje de confirmación
    const [newPlaylistNameInput, setNewPlaylistNameInput] = useState("");

    useEffect(() => {
        // Si showConfirmation es true, se cierra el modal después de 3 segundos
        let timeout;
        if (showConfirmation) {
            timeout = setTimeout(() => {
                setShowModal(false);
                setShowConfirmation(false); // Ocultar mensaje de confirmación
                setNewPlaylistNameInput(""); // Limpiar el input al cerrar el modal
            }, 3000);
        }
        return () => clearTimeout(timeout); // Limpiar el timeout al desmontar el componente
    }, [showConfirmation, setShowModal]);

    const handleInputChange = (event) => {
        setNewPlaylistNameInput(event.target.value);
    };

    const handleCreatePlaylist = () => {
        setShowConfirmation(true); // Mostrar mensaje de confirmación
        setTimeout(() => {
            handleAddSelectedTracksToNew(newPlaylistNameInput); // Llamar a handleAddSelectedTracksToNew después de 3 segundos
        }, 3000);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowConfirmation(false); // Ocultar mensaje de confirmación
        setNewPlaylistNameInput(""); // Limpiar el input al cerrar el modal
    };

    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Nombre de la nueva playlist</h2>
                        <input
                            type="text"
                            value={newPlaylistNameInput}
                            onChange={handleInputChange}
                        />
                        <div className="button-container-modal">
                            <button onClick={handleCloseModal} className='buttonRed'>Cancelar</button>
                            <button onClick={handleCreatePlaylist} className='buttonBlue'>Crear Playlist</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Mostrar el mensaje de confirmación si se ha creado la playlist */}
            {showConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Canciones añadidas con éxito a: <b>{newPlaylistNameInput}</b></h2>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalPlaylistNew;
