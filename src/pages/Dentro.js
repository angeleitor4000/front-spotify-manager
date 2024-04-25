import { useState, useEffect } from "react";

export default function Dentro(){

    const imgestilo = {
        heigh: 300,
        width: 300
    };

    const [resultado, setResultado] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [cargado, setCargado] = useState(true);

    
    if(cargado){
        setCargado(false)
        //setTimeout(currentuser(), 2000)
        currentuser()
    }

    async function playlist() {
        try {
            //const response = await fetch("https://back-spotify-manager-angeleitor4000.onrender.com/playlist");
            const response = await fetch("http://localhost:3000/playlist");
            const data = await response.json();
            setResultado(data);

            
            // Verificar si data.item está definido antes de acceder a sus propiedades
            if (data.item) {
                /*
                console.log(data.item);
                console.log(data.item.name);
                console.log(data.item.album.images[0].url);
                console.log(data.item.is_local)
                */



            }

        } catch (error) {
            console.error('Error fetching playlist:', error);
        }

    }


    async function currentuser() {
        try {

            //const response = await fetch("https://back-spotify-manager-angeleitor4000.onrender.com/playlist");
            const response = await fetch("http://localhost:3000/user");
            const data = await response.json();
            setCurrentUser(data);

            // Verificar si data.item está definido antes de acceder a sus propiedades
            if (data) {

                console.log(data);
                //console.log(currentUser.images)
                /*
                console.log(data.item);
                console.log(data.item.name);
                console.log(data.item.album.images[0].url);
                console.log(data.item.is_local)
                */

            }

              
            await timeout(2000)


        } catch (error) {
            console.error('Error fetching user:', error);
        }

    }
    
    useEffect(() => {
        playlist();

        const intervalId = setInterval(() => {
            playlist();
        }, 500);

        // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(intervalId);
    }, []); // El segundo argumento es un array vacío para que el efecto se ejecute solo una vez
    

    function timeout(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return(
        <>
            <h1>Dentro</h1>

            <p>{currentUser ? currentUser.display_name : ''}</p>
            <img src={currentUser &&  ((currentUser.images) ? currentUser.images[1].url : '')} alt="" style={imgestilo}></img>


            <p>{resultado.item && ((!resultado.item.is_local ? (resultado.item.name + " BY: " + resultado.item.artists[0].name) : ''))}</p>
            <img src={resultado.item && (!resultado.item.is_local ? resultado.item.album.images[0].url : '')} alt="" style={imgestilo}></img>


        </>
    );
    
}