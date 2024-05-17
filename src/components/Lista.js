import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/Lista.css";
import { formatDuration } from "../utils/JavaScriptUtils";
import defaultHola from "../images/NoImagePlaylist.png";
import ModalPlaylistNew from './ModalPlaylistNew';

export default function Lista({ tracks, playlists }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tracksPerPage, setTracksPerPage] = useState(10);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { playlistid } = useParams();

    const totalTracks = tracks.length;

    useEffect(() => {
        setSelectedTracks([]);
    }, [tracks]);

    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = tracks.slice(indexOfFirstTrack, indexOfLastTrack);

    function handleChangePagesSize(event) {
        const newSize = parseInt(event.target.value);
        if (!isNaN(newSize)) {
            setTracksPerPage(newSize);
            setCurrentPage(1);
        }
    }

    function toggleTrackSelection(trackIndex, uri) {
        const isSelected = selectedTracks.some(track => track.index === trackIndex);
        if (isSelected) {
            setSelectedTracks(selectedTracks.filter(track => track.index !== trackIndex));
        } else {
            setSelectedTracks([...selectedTracks, { index: trackIndex, uri }]);
        }
    }

    async function handleRemoveSelectedTracks() {
        try {
            const uris = selectedTracks.map(track => track.uri);
            const response = await fetch(`http://localhost:3000/eliminarcancionesplaylist/${playlistid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: uris })
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

    async function handleAddSelectedTracksToNew() {
        try {
            const uris = selectedTracks.map(track => track.uri);
            const response = await fetch(`http://localhost:3000/addtrackstonewplaylists/${newPlaylistName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: uris })
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

    async function handleAddSelectedTracksToExist() {
        try {
            const uris = selectedTracks.map(track => track.uri);
            // Aquí iría la lógica para añadir canciones a una playlist existente
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
            </div>

            <div className="button-container">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>Primera Página</button>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentTracks.length < tracksPerPage}>Siguiente</button>
                <button onClick={() => setCurrentPage(Math.ceil(totalTracks / tracksPerPage))} disabled={currentTracks.length < tracksPerPage}>Última Página</button>
            </div>

            <div className='button-container'>
                <button onClick={handleRemoveSelectedTracks} disabled={selectedTracks.length === 0} className={'buttonRed'}>Eliminar Seleccionados</button>
                <button onClick={() => setShowModal(true)} disabled={selectedTracks.length === 0} className={'buttonBlue'}>Añadir a nueva playlist</button>
                <button onClick={handleAddSelectedTracksToExist} disabled={selectedTracks.length === 0} className={'buttonBlue'}>Añadir a otra playlist</button>
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
                                    checked={selectedTracks.some(track => track.index === index + indexOfFirstTrack)}
                                    onChange={() => toggleTrackSelection(index + indexOfFirstTrack, track.track.uri)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalPlaylistNew
                showModal={showModal}
                setShowModal={setShowModal}
                handleAddSelectedTracksToNew={handleAddSelectedTracksToNew}
                setNewPlaylistName={setNewPlaylistName}
            />



        </div>
    );
}
