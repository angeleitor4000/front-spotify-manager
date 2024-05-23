import React, { useState } from 'react';

function ModalPlaylistNew({ showModal, setShowModal, handleAddSelectedTracksToNew }) {

    //Importante recibir los metodos como props para poder ser utilizados en el modal.

    const [newPlaylistNameInput, setNewPlaylistNameInput] = useState("");

    const handleInputChange = (event) => {
        setNewPlaylistNameInput(event.target.value);
    };

    const handleCreatePlaylist = () => {
        handleAddSelectedTracksToNew(newPlaylistNameInput); // Pasar el nombre de la nueva playlist al método handleAddSelectedTracksToNew
        setShowModal(false);
        setNewPlaylistNameInput(""); // Limpiar el input al cerrar el modal
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
                            <button onClick={handleCloseModal} className='buttonRed'>Cancelar</button>
                            <button onClick={handleCreatePlaylist} className='buttonBlue'>Crear Playlist</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalPlaylistNew;
