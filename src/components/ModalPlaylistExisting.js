import React, { useState } from 'react';
import "../styles/ModalTablaAdd.css"

export default function ModalPlaylistExisting({ currentUser, showModal, setShowModal, playlists, handleAddSelectedTracksToExist }) {
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    function togglePlaylistSelection(playlistId) {
        const isSelected = selectedPlaylists.includes(playlistId);
        if (isSelected) {
            setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
        } else {
            setSelectedPlaylists([...selectedPlaylists, playlistId]);
        }
    }

    function handleAddTracksToSelectedPlaylists() {
        handleAddSelectedTracksToExist(selectedPlaylists);
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Selecciona las playlists a las que deseas añadir las canciones:</h2>
                        <div className="playlist-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Añadir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playlists.items
                                    .filter(item => item.owner.display_name === currentUser.display_name)
                                    .map(playlist => (
                                        <tr key={playlist.id}>
                                            <td>{playlist.name}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPlaylists.includes(playlist.id)}
                                                    onChange={() => togglePlaylistSelection(playlist.id)}
                                                    className="checkbox"
                                                />
                                            </td>
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
        </>
    );
}
