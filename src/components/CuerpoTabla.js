import React from 'react';

export default function CuerpoTabla({ currentTracks, indexOfFirstTrack, selectedTracks, toggleTrackSelection, formatDuration, defaultHola, contexto, imagenAlbum = "" }) {

    // Subdivisión del cuerpo de la tabla por comodidad a la hora de interpretar el código.
    // No tiene ninguna funcionalidad adicional
    return (
        <tbody>
            {currentTracks.map((track, index) => {
                let src = "";
                let alt = "";

                //La forma de mostrar las imagenes cambiara segun album o playlist
                if (contexto === 'albums') {
                    src = imagenAlbum ? imagenAlbum : defaultHola;
                    alt = track.name ? track.name : 'SIN NOMBRE';
                } else if (contexto === 'playlists') {
                    src = track.track.album.images.length > 0
                        ? track.track.album.images[0].url || defaultHola
                        : defaultHola;
                    alt = track.track.album.name ? track.track.album.name : 'SIN NOMBRE';
                } else {
                    src = defaultHola;
                    alt = 'SIN NOMBRE';
                }

                return (
                    <tr key={index}>
                        <td>{index + indexOfFirstTrack + 1}</td>
                        <td>
                            <img
                                src={src}
                                alt={alt}
                                style={{ height: "50px" }}
                            />
                        </td>
                        <td>{contexto === 'albums' ? track.name : track.track.name}</td>
                        {contexto === 'playlists' && <td>{!track.is_local ? track.track.album.name : 'Local'}</td>}
                        <td>{contexto === 'albums' ? track.artists[0].name : track.track.artists[0].name}</td>
                        {contexto === 'playlists' && <td>{new Date(track.added_at).toLocaleDateString()}</td>}
                        <td>{formatDuration(contexto === 'albums' ? track.duration_ms : track.track.duration_ms)}</td>
                        <td className="checkbox-td">
                            <input
                                type="checkbox"
                                checked={selectedTracks.has(contexto === 'albums' ? track.uri : track.track.uri)}
                                onChange={() => toggleTrackSelection(contexto === 'albums' ? track.uri : track.track.uri)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}
