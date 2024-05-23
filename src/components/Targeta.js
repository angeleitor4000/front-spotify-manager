import '../styles/Targeta.css';
import noImagePlaylist from '../images/NoImagePlaylist.png';

export default function Targeta({ playlists, currentUser, titulo, descripcion, botonTexto, direccion, contexto }) {

    //Contexto es un prop importante para gestionar la forma de la targeta segun su proposito

    let images = []

    //Logica para mostrar en icono las portadas de las multiples playlists del usuario
    if(contexto ==="playlists"){
    // Obtener hasta 4 imágenes de las primeras playlists del usuario actual
        images = playlists && playlists.items
        ? playlists.items
            .filter(item => item.owner.display_name === currentUser.display_name) // Filtrar las playlists del usuario actual
            .slice(0, 4)
            .map(item => item.images[0].url ? item.images[0].url : noImagePlaylist)
        : [];
    }

    if(contexto === "misplaylists"){
        if(playlists.length > 0){
            images=[playlists]
        }
    }

    if(contexto === "libre"){
       images = [playlists]
    }

    // Si no hay imágenes, usar la imagen de stock
    const displayImages = images.length > 0 ? images : [noImagePlaylist];

    return (
        <div className={`targeta-card ${images.length > 1 ? 'multiple-images' : ''}`}>
            <div className={`targeta-imagen-section ${images.length === 4 ? 'grid-layout' : ''}`}>
                {displayImages.map((image, index) => (
                    <img key={index} src={image} alt={titulo} className={`targeta-imagen ${images.length > 1 ? 'multi-image' : ''}`} />
                ))}
            </div>
            <div className="targeta-contenido-section">
                <div className="targeta-contenido">
                    <h2 className="targeta-titulo">{titulo}</h2>
                    <p className="targeta-descripcion">{descripcion}</p>
                    <a href={direccion}>
                        <button style={{marginBottom: "15px"}}>{botonTexto}</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
