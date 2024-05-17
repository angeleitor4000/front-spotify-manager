import React, { useState } from 'react';

function ModalPlaylistNew({ showModal, setShowModal, handleAddSelectedTracksToNew, setNewPlaylistName }) {
    const [newPlaylistNameInput, setNewPlaylistNameInput] = useState("");

    const handleInputChange = (event) => {
        setNewPlaylistNameInput(event.target.value);
    };

    const handleCreatePlaylist = () => {
        setNewPlaylistName(newPlaylistNameInput);
        setShowModal(false);
        handleAddSelectedTracksToNew();
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                            <button onClick={handleCreatePlaylist} className='buttonBlue'>Crear Playlist</button>
                            <button onClick={handleCloseModal} className='buttonRed'>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalPlaylistNew;
