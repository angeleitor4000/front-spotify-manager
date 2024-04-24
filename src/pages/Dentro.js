import { useState, useEffect } from "react";

export default function Dentro(){

    const [resultado, setResultado] = useState([]);

    async function playlist() {
        try {
            const response = await fetch("https://back-spotify-manager-angeleitor4000.onrender.com/playlist");
            const data = await response.json();
            setResultado(data);

            /*
            // Verificar si data.item está definido antes de acceder a sus propiedades
            if (data.item) {
                console.log(data.item.name);
                console.log(data.item.album.images[0].url);
            }
            */
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }

    }

    useEffect(() => {
        // Llamada inicial a playlist()
        playlist();

        // Configurar el intervalo para llamar a playlist() cada 2 segundos
        const intervalId = setInterval(() => {
            playlist();
        }, 500);

        // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(intervalId);
    }, []); // El segundo argumento es un array vacío para que el efecto se ejecute solo una vez
    

    //<button onClick={playlist}>actualtrack</button>

    return(
        <>
            <h1>Dentro</h1>

            <p>{resultado.item ? (resultado.item.name + " BY: " + resultado.item.album.artists[0].name) : ''}</p>
            <img src={resultado.item ? resultado.item.album.images[0].url : ''}></img>

        </>
    );
    
}