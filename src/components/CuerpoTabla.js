import React from 'react';

export default function CuerpoTabla({ currentTracks, indexOfFirstTrack, selectedTracks, toggleTrackSelection, formatDuration, defaultHola, contexto, imagenAlbum = "" }) {
    let src = "";
    let alt = "";

    switch (contexto) {
        case 'albums':
            src = imagenAlbum ? imagenAlbum : defaultHola;
            alt = currentTracks && currentTracks.length > 0 && currentTracks[0].name ? currentTracks[0].name : 'SIN NOMBRE';
            break;
        case 'playlists':
            src = currentTracks && currentTracks.length > 0 && currentTracks[0].track.album.images.length > 0
                ? currentTracks[0].track.album.images[0].url || defaultHola
                : defaultHola;
            alt = currentTracks && currentTracks.length > 0 && currentTracks[0].track.album.name ? currentTracks[0].track.album.name : 'SIN NOMBRE';
            break;
        default:
            src = defaultHola;
            alt = 'SIN NOMBRE';
            break;
    }

    // Subdivisión del cuerpo de la tabla por comodidad a la hora de interpretar el código.
    // No tiene ninguna funcionalidad adicional
    return (
        <tbody>
            {currentTracks.map((track, index) => (
                <tr key={index}>
                    <td>{index + indexOfFirstTrack + 1}</td>
                    <td>
                        <img
                            src={src}
                            alt={alt}
                            style={{ height: "50px" }}
                        />
                    </td>
                    <td>{track ? (contexto === 'albums' ? track.name : track.track.name) : 'SIN NOMBRE'}</td>
                    <td>{track ? (contexto === 'albums' ? 'Local' : (!track.is_local ? track.track.album.name : 'Local')) : "Local"}</td>
                    <td>{track ? (contexto === 'albums' ? track.artists[0].name : track.track.artists[0].name) : "Local"}</td>
                    <td>{track ? new Date(track.added_at).toLocaleDateString() : ''}</td>
                    <td>{track ? (formatDuration(contexto === 'albums' ? track.duration_ms : track.track.duration_ms)) : ''}</td>
                    <td className="checkbox-td">
                        <input
                            type="checkbox"
                            checked={selectedTracks.has(track.track ? track.track.uri : track.uri)}
                            onChange={() => toggleTrackSelection(track.track ? track.track.uri : track.uri)}
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
