import React, { useState, useEffect } from 'react';
import "../styles/Lista.css";
import { formatDuration } from "../utils/JavaScriptUtils";
import defaultHola from "../images/NoImagePlaylist.png";

export default function Lista({ tracks }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [tracksPerPage, setTracksPerPage] = useState(10);
    const [selectedTracks, setSelectedTracks] = useState([]);

    const totalTracks = tracks.length;

    // Actualizar el estado de las pistas seleccionadas cuando cambian las pistas
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

    function toggleTrackSelection(trackIndex) {
        const selectedIndex = selectedTracks.indexOf(trackIndex);
        if (selectedIndex === -1) {
            setSelectedTracks([...selectedTracks, trackIndex]);
        } else {
            setSelectedTracks(selectedTracks.filter(index => index !== trackIndex));
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
                                    style={
                                        { height: "50px", }
                                    }
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
                                    checked={selectedTracks.includes(index + indexOfFirstTrack)}
                                    onChange={() => toggleTrackSelection(index + indexOfFirstTrack)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
