import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/Lista.css";
import { formatDuration } from "../utils/JavaScriptUtils";
import defaultHola from "../images/NoImagePlaylist.png";
import ModalPlaylistNew from './ModalPlaylistNew';
import ModalPlaylistExisting from './ModalPlaylistExisting';

export default function Lista({ tracks, playlists, currentUser }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tracksPerPage, setTracksPerPage] = useState(10);
    const [selectedTracks, setSelectedTracks] = useState(new Set());
    const [showNewModal, setShowNewModal] = useState(false);
    const [showExistingModal, setShowExistingModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { playlistid } = useParams();

    // Eliminar warning
    console.log(newPlaylistName)

    useEffect(() => {
        setSelectedTracks(new Set());
    }, [tracks]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to first page on new search
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
                <input type='text' id='buscadorcanciones' placeholder={"Buscar cancion..."} onChange={handleSearchInputChange} className='buscador'/>
            </div>

            <div className="button-container">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>Primera Página</button>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentTracks.length < tracksPerPage}>Siguiente</button>
                <button onClick={() => setCurrentPage(Math.ceil(totalTracks / tracksPerPage))} disabled={currentTracks.length < tracksPerPage}>Última Página</button>
            </div>

            <div className='button-container'>
                <button onClick={handleRemoveSelectedTracks} disabled={selectedTracks.size === 0} className={'buttonRed'}>Eliminar Seleccionados</button>
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
                <tbody>
                    {currentTracks.map((track, index) => (
                        <tr key={index}>
                            <td>{index + indexOfFirstTrack + 1}</td>
                            <td>
                                <img
                                    src={
                                        track && track.track.album.images.length > 0
                                            ? track.track.album.images[0].url
                                            : defaultHola
                                    }
                                    alt={
                                        track && track.track.name ? track.track.name : 'SIN NOMBRE'
                                    }
                                    style={{ height: "50px" }}
                                />
                            </td>
                            <td>{track ? track.track.name : 'SIN NOMBRE'}</td>
                            <td>{track ? (!track.is_local ? track.track.album.name : 'Local') : "Local"}</td>
                            <td>{track ? track.track.artists[0].name : "Local"}</td>
                            <td>{track ? new Date(track.added_at).toLocaleDateString() : ''}</td>
                            <td>{track ? (formatDuration(track.track.duration_ms)) : ''}</td>
                            <td className="checkbox-td">
                                <input
                                    type="checkbox"
                                    checked={selectedTracks.has(track.track.uri)}
                                    onChange={() => toggleTrackSelection(track.track.uri)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
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
        </div>
    );
}

