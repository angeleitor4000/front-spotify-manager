import React, { useState, useEffect } from 'react';
import "../styles/ModalTablaAdd.css"

export default function ModalPlaylistExisting({ currentUser, showModal, setShowModal, playlists, handleAddSelectedTracksToExist }) {
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar si se muestra el mensaje de confirmación

    useEffect(() => {
        let timeout;
        // Si showConfirmation es true, establecemos un timeout para ocultar el mensaje de confirmación después de 3 segundos
        if (showConfirmation) {
            timeout = setTimeout(() => {
                setShowConfirmation(false); // Ocultar el mensaje de confirmación después de 3 segundos
            }, 3000);
        }
        // Limpiar el timeout cuando el componente se desmonta o cuando showConfirmation cambia a false
        return () => clearTimeout(timeout);
    }, [showConfirmation]);

    function togglePlaylistSelection(playlistId) {
        const isSelected = selectedPlaylists.includes(playlistId);
        if (isSelected) {
            setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
        } else {
            setSelectedPlaylists([...selectedPlaylists, playlistId]);
        }
    }

    function handleAddTracksToSelectedPlaylists() {
        setShowConfirmation(true); // Mostrar el mensaje de confirmación
        // Llamar a la función para agregar las canciones a las playlists seleccionadas después de 3 segundos
        setTimeout(() => {
            handleAddSelectedTracksToExist(selectedPlaylists);
            setShowModal(false); // Cerrar el modal después de agregar las canciones
        }, 3000);
    }

    return (
        <>
            {showModal && (
                <div className="modal-exist">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Selecciona las playlists a las que deseas añadir las canciones:</h2>
                        <div className="playlist-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playlists.items
                                        .filter(item => item.owner.display_name === currentUser.display_name)
                                        .map(playlist => (
                                            <tr key={playlist.id}>
                                                <td className='checkbox-container'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPlaylists.includes(playlist.id)}
                                                        onChange={() => togglePlaylistSelection(playlist.id)}
                                                        className="checkbox"
                                                    />
                                                </td>
                                                <td>{playlist.name}</td>

                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="button-container-modal">
                            <button onClick={() => setShowModal(false)} className='buttonRed'>Cancelar</button>
                            <button onClick={handleAddTracksToSelectedPlaylists} className='buttonBlue'>Añadir</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Mostrar el mensaje de confirmación si se han añadido las canciones */}
            {showConfirmation && (
                <div className="modal-exist">
                    <div className="modal-content">
                        <h2>Canciones añadidas con éxito a las playlists seleccionadas</h2>
                    </div>
                </div>
            )}
        </>
    );
}
