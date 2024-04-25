import { useState, useEffect } from 'react';
import logo from "../images/slogo.png";

export default function Header() {
    const [headerWidth, setHeaderWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setHeaderWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const headerStyle = {
        position: "relative",
        display: "grid",
        gridTemplateColumns: headerWidth < 400 ? "1fr" : "auto 1fr auto", // Cambia el diseño según el ancho de la pantalla
        alignItems: "center", // Para alinear verticalmente en el centro
        padding: "10px 20px", // Añade padding para espaciar el contenido del borde
        width: "100%", // Establece el ancho del contenedor principal al 100% de la página
    };

    const imgStyle = {
        height: 65,
        width: 65,
        marginRight: "20px", // Agrega un margen a la derecha del logo para separarlo del título
    };

    const titleStyle = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)", // Centra el título horizontal y verticalmente
        textAlign: "center", // Centra el texto
        whiteSpace: "nowrap", // Evita que el título se divida en varias líneas
        overflow: "hidden", // Evita que el título se desborde si es demasiado largo
        textOverflow: "ellipsis", // Muestra puntos suspensivos si el título es demasiado largo
    };

    const spaceStyle = {
        marginRight: "20px", // Margen a la derecha para separar el espacio adicional del título
    };

    const lineStyle = {
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: "black",
        transform: "translateX(-50%)", // Centra la línea horizontalmente
    };

    return (
        <div style={headerStyle}>
            {headerWidth >= 400 && (
                <>
                    <img src={logo} alt="logo" style={imgStyle} />
                    <div style={titleStyle}>
                        <h1>SPOTIFY MANAGER</h1>
                    </div>
                    {/* Este espacio vacío ayudará a empujar el título al centro */}
                    <div style={spaceStyle}></div>
                </>
            )}
            {/* Línea vertical */}
            <div style={lineStyle}></div>
        </div>
    );
}
