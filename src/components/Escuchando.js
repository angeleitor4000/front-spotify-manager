export default function Escuchando(props){

    const imgestilo = {
        heigh: 300,
        width: 300
    };

    const { actualTrack } = props; // Extraer actualTrack de las props recibidas
    
    return(
        <div>
            <p>{actualTrack.item && ((!actualTrack.item.is_local ? (actualTrack.item.name + " BY: " + actualTrack.item.artists[0].name) : ''))}</p>
            <img src={actualTrack.item && (!actualTrack.item.is_local ? actualTrack.item.album.images[0].url : '')} alt="" style={imgestilo}></img>

            <p>{actualTrack.item && ((actualTrack.item.is_local && 'Cancion local: No se puede recuperar datos'))}</p>
            <p>{!actualTrack.item && 'Actualmente no estas escuchando nada'}</p>
        </div>
    )
}
