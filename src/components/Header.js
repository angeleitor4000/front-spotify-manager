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
        gridTemplateColumns: headerWidth < 400 ? "1fr" : "auto 1fr auto", // Cambia la disposición de los elementos según el ancho de la pantalla
        alignItems: "center", // Para alinear verticalmente en el centro
        padding: "10px 20px", // Añade padding para espaciar el contenido del borde
        width: "95%", // Establece el ancho del contenedor principal al 100% de la página
        borderBottom: "1px solid #515151",
    };

    const imgStyle = {
        height: 65,
        width: 65,
        marginRight: 20, // Ajusta el margen derecho del logo
        marginLeft: 60, // Ajusta el margen izquierdo del logo
    };

    const titleStyle = {
        position: "absolute",
        left: headerWidth >= 400 ? "50%" : "10px", // Ajusta la posición del título según el ancho de la pantalla
        top: "50%",
        transform: headerWidth >= 400 ? "translate(-50%, -50%)" : "translate(0, -50%)", // Centra el título horizontal y verticalmente si hay espacio suficiente
        textAlign: headerWidth >= 400 ? "center" : "left", // Centra el texto si hay espacio suficiente
        whiteSpace: "nowrap", // Evita que el título se divida en varias líneas
        overflow: "hidden", // Evita que el título se desborde si es demasiado largo
        textOverflow: "ellipsis", // Muestra puntos suspensivos si el título es demasiado largo
    };

    const spaceStyle = {
        marginRight: "15%", // Ajusta el margen derecho del espacio
        marginLeft: "auto", // Deja un margen al espacio desde el borde derecho
    };

    /*
    const lineStyle = {
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: "black",
        transform: "translateX(-50%)", // Centra la línea horizontalmente
    };
    */
    return (
        <div style={headerStyle}>
            {headerWidth >= 400 ? (
                <>
                    <a href='/'><img src={logo} alt="logo" style={imgStyle} /></a>
                    <div style={titleStyle}>
                        <a href='/'><h1>SPOTIFY MANAGER</h1></a>
                    </div>
                    {/* Este espacio vacío ayudará a empujar el título al centro */}
                    <div style={spaceStyle}></div>
                </>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <img src={logo} alt="logo" style={{ height: 50, width: 50 }} />
                    <div style={{ marginTop: 10 }}>
                        <h1>SPOTIFY MANAGER</h1>
                    </div>
                </div>
            )}
            {/* Línea vertical
            <div style={lineStyle}></div>*/}

        </div>
    );
}
