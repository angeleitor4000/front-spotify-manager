import "../styles/Home.css";
import { useState, useEffect } from "react";
import Escuchando from "../components/Escuchando";
import Hola from "../components/Hola";


export default function Dentro() {

    const [actualTrack, setActualTrack] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [cargado, setCargado] = useState(true);

    if (cargado) {
        setCargado(false)
        refreshlogin()
        currentuser()
    }

    async function refreshlogin() {
        try {
            window.location.href = "http://localhost:3000/refreshlogin"
            console.log("yee")
        } catch (error) {
            console.error('Error refreshing credentials: ', error);
        }
    }

    async function getActualTrack() {
        try {
            const response = await fetch("http://localhost:3000/getactualtrack");
            const data = await response.json();
            setActualTrack(data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    }

    async function currentuser() {
        try {
            const response = await fetch("http://localhost:3000/user");
            const data = await response.json();
            setCurrentUser(data);
            await timeout(2000);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    useEffect(() => {
        getActualTrack();
        const intervalId = setInterval(() => {
            getActualTrack();
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <div>
            <h1>Dentro</h1>
            <a href="/"><button>VOLVER</button></a>

            <div className="container">

                <div className="izquierda">
                    <Hola currentUser={currentUser} />
                </div>
                <div className="cuerpo">
                    {/* Contenido del cuerpo */}
                </div>
                <div className="derecha">
                    <Escuchando actualTrack={actualTrack} />
                </div>
            </div>
        </div>
    );
}
