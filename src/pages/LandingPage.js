import React from 'react';

export default function LandingPage() {
    const landingPageStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "45vh",
        backgroundColor: "rgb(26, 26, 26)",
        padding: "40px 20px",
        textAlign: "center",
        width: "95%",
        margin: "5% 10px 0 0"
    };

    const titleStyle = {
        fontSize: "2rem",
        marginBottom: "30px",
    };

    const paragraphStyle = {
        fontSize: "1.2rem",
        marginBottom: "30px",
    };

    const buttonStyle = {
        padding: "15px 30px",
        fontSize: "1.2rem",
        backgroundColor: "#1DB954",
        borderRadius: "30px",
        border: "none",
        cursor: "pointer",
    };

    return (
        <div style={landingPageStyle}>
            <h2 style={titleStyle}>BIENVENIDO A SPOTIFY MANAGER</h2>
            <p style={paragraphStyle}>Inicia sesión para continuar</p>
            <a href="http://localhost:3000/login" style={{ textDecoration: "none" }}>
                <button style={buttonStyle}>INICIAR SESIÓN</button>
            </a>
        </div>
    );
}
