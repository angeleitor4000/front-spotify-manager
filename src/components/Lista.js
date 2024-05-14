import "../styles/Lista.css";
import { formatDuration } from "../utils/JavaScriptUtils";
import defaultHola from "../images/NoImagePlaylist.png";

export default function Lista({ tracks }) {
    return (
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
                {tracks.map((track, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
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
                        <td>{track ? (!track.is_local ? track.track.album.name : 'Local'): "Local"}</td>
                        <td>{track ? track.track.artists[0].name : "Local"}</td>
                        <td>{track ? track.added_at : ''}</td>
                        <td>{track ? (formatDuration(track.track.duration_ms)) : ''}</td>
                        <td>
                            <input type="checkbox" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
