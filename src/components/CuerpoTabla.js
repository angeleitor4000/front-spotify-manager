import React from 'react';

export default function CuerpoTabla({ currentTracks, indexOfFirstTrack, selectedTracks, toggleTrackSelection, formatDuration, defaultHola }) {

    //Subdivision del cuerpo de la tabla por comodidad a la hora de interpretar el codigo.
    //No tiene ninguna funcionalidad adicional
    return (
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
    );
}
