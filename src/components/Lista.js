import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/Lista.css";
import { formatDuration } from "../utils/JavaScriptUtils";
import defaultHola from "../images/NoImagePlaylist.png";
import ModalPlaylistNew from './ModalPlaylistNew';
import ModalPlaylistExisting from './ModalPlaylistExisting';
import CuerpoTabla from './CuerpoTabla';

export default function Lista({ tracks, playlists, currentUser }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tracksPerPage, setTracksPerPage] = useState(10);
    const [selectedTracks, setSelectedTracks] = useState(new Set());
    const [showNewModal, setShowNewModal] = useState(false);
    const [showExistingModal, setShowExistingModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Nuevo estado para el modal de confirmación
    const { playlistid } = useParams();

    // Eliminar warning en la consola
    console.log(newPlaylistName)

    useEffect(() => {
        setSelectedTracks(new Set());
    }, [tracks]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); 
    };

    const filteredTracks = tracks.filter(track => {
        const trackName = track?.track?.name?.toLowerCase() || '';
        const artistName = track?.track?.artists[0]?.name?.toLowerCase() || '';
        const albumName = track?.track?.album?.name?.toLowerCase() || '';
        const concatenatedString = `${trackName} ${artistName} ${albumName}`;
        const searchWords = searchQuery.split(" ");
        return searchWords.every(word => concatenatedString.includes(word));
    });

    const totalTracks = filteredTracks.length;

    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = filteredTracks.slice(indexOfFirstTrack, indexOfLastTrack);

    function handleChangePagesSize(event) {
        const newSize = parseInt(event.target.value);
        if (!isNaN(newSize)) {
            setTracksPerPage(newSize);
            setCurrentPage(1);
        }
    }

    function toggleTrackSelection(uri) {
        const updatedSelectedTracks = new Set(selectedTracks);
        if (updatedSelectedTracks.has(uri)) {
            updatedSelectedTracks.delete(uri);
        } else {
            updatedSelectedTracks.add(uri);
        }
        setSelectedTracks(updatedSelectedTracks);
    }

    function handleSelectAll() {
        if (selectedTracks.size === filteredTracks.length) {
            setSelectedTracks(new Set());
        } else {
            const allTrackURIs = filteredTracks.map(track => track.track.uri);
            const updatedSelectedTracks = new Set(selectedTracks);
            allTrackURIs.forEach(uri => updatedSelectedTracks.add(uri));
            setSelectedTracks(updatedSelectedTracks);
        }
    }

    async function handleRemoveSelectedTracks() {
        // Oculta el modal de confirmación
        setShowConfirmationModal(false);

        try {
            const response = await fetch(`http://localhost:3000/eliminarcancionesplaylist/${playlistid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: Array.from(selectedTracks) })
            });
            if (response.ok) {
                console.log("Canciones eliminadas con éxito.");
                window.location.reload();
            } else {
                console.error('Error al eliminar canciones:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar canciones:', error);
        }
    }


    async function handleAddSelectedTracksToNew(newPlaylistName) {
        try {
            const response = await fetch(`http://localhost:3000/addtrackstonewplaylists/${newPlaylistName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: Array.from(selectedTracks) })
            });
            if (response.ok) {
                console.log("Canciones añadidas con éxito.");
                window.location.reload();
            } else {
                console.error('Error al añadir canciones:', response.statusText);
            }
        } catch (error) {
            console.error('Error al añadir canciones:', error);
        }
    }

    async function handleAddSelectedTracksToExist(selectedPlaylistsIds) {
        try {
            const response = await fetch(`http://localhost:3000/addtrackstoexistplaylists`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: Array.from(selectedTracks), selectedPlaylists: selectedPlaylistsIds })
            });
            if (response.ok) {
                console.log("Canciones añadidas con éxito.");
                window.location.reload();
            } else {
                console.error('Error al añadir canciones:', response.statusText);
            }
        } catch (error) {
            console.error('Error al añadir canciones:', error);
        }
    }

    return (
        <div>

            <div className="page-controls">
                <label htmlFor='elementosxpagina'>Selecciona pistas por página: </label>
                <input type='text' id='elementosxpagina' placeholder={tracksPerPage} onChange={handleChangePagesSize} />
                <p>Página: {currentPage} de {Math.ceil(totalTracks / tracksPerPage)}</p>
                <input type='text' id='buscadorcanciones' placeholder={"Buscar cancion..."} onChange={handleSearchInputChange} className='buscador' />
            </div>

            <div className="button-container">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>Primera Página</button>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentTracks.length < tracksPerPage}>Siguiente</button>
                <button onClick={() => setCurrentPage(Math.ceil(totalTracks / tracksPerPage))} disabled={currentTracks.length < tracksPerPage}>Última Página</button>
            </div>

            <div className='button-container'>
                {/* Abre el modal de confirmación al hacer clic */}
                <button onClick={() => setShowConfirmationModal(true)} disabled={selectedTracks.size === 0} className={'buttonRed'}>Eliminar Seleccionados</button>
                <button onClick={() => setShowNewModal(true)} disabled={selectedTracks.size === 0} className={'buttonBlue'}>Añadir a nueva playlist</button>
                <button onClick={() => setShowExistingModal(true)} disabled={selectedTracks.size === 0} className={'buttonBlue'}>Añadir a playlists existentes</button>
                <button onClick={handleSelectAll} disabled={currentTracks.length === 0} className={'buttonGreen'}>Seleccionar Todo</button>
            </div>

            <table className="lista-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Titulo</th>
                        <th>Album</th>
                        <th>Artista</th>
                        <th>Añadido el</th>
                        <th>Duracion</th>
                        <th>Seleccionar</th>
                    </tr>
                </thead>
                <CuerpoTabla
                    currentTracks={currentTracks}
                    indexOfFirstTrack={indexOfFirstTrack}
                    selectedTracks={selectedTracks}
                    toggleTrackSelection={toggleTrackSelection}
                    formatDuration={formatDuration}
                    defaultHola={defaultHola}
                />
            </table>
            <ModalPlaylistNew
                showModal={showNewModal}
                setShowModal={setShowNewModal}
                handleAddSelectedTracksToNew={handleAddSelectedTracksToNew}
                setNewPlaylistName={setNewPlaylistName}
            />
            <ModalPlaylistExisting
                showModal={showExistingModal}
                setShowModal={setShowExistingModal}
                playlists={playlists}
                handleAddSelectedTracksToExist={handleAddSelectedTracksToExist}
                currentUser={currentUser}
            />

            {showConfirmationModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Estás seguro de que quieres eliminar las canciones seleccionadas?</h2>
                        <div className="button-container-modal">
                            <button onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                            <button onClick={handleRemoveSelectedTracks} className='buttonRed'>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
