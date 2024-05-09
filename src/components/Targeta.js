import '../styles/Targeta.css';

export default function Targeta({ image, titulo, descripcion, botonTexto }) {
    return (
        <div className="targeta-card">
            <div className="targeta-imagen-section">
                <img src={image} alt={titulo} className="targeta-imagen" />
            </div>
            <div className="targeta-contenido-section">
                <div className="targeta-contenido">
                    <h2 className="targeta-titulo">{titulo}</h2>
                    <p className="targeta-descripcion">{descripcion}</p>
                    <a href="/">
                        <button>{botonTexto}</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
