
module.exports = function (express, spotifyApi) {

    var albumController = express.Router();

    albumController.get('/getalbums', async (req, res, next) => {
        try {
            res.header('Access-Control-Allow-Origin', '*');

            // Array para almacenar los datos en múltiples iteraciones
            let allAlbums = [];
            // Posición inicial para la llamada
            let offset = 0;
            // Límite máximo
            const limit = 20;

            // Llamada inicial para los primeros 20 álbumes
            let result = await spotifyApi.getMySavedAlbums({ limit, offset });
            allAlbums = allAlbums.concat(result.body.items);

            // En caso de que existan más registros después de los primeros 20,
            // se llama constantemente y se almacena en el array hasta el final
            while (result.body.next) {
                offset += limit;
                result = await spotifyApi.getMySavedAlbums({ limit, offset });
                allAlbums = allAlbums.concat(result.body.items);
            }

            // Crear un objeto que simule la estructura de result.body original
            let responseBody = {
                href: result.body.href,
                items: allAlbums,
                limit: result.body.limit,
                next: result.body.next,
                offset: 0,
                previous: null,
                total: allAlbums.length
            };

            res.status(200).send(responseBody);
        } catch (err) {
            res.status(400).send(err);
        }
    });


    //Metodo que recibe el id de una playlist (por el front) y devuelve sus canciones.
    //Dado que la llamada a la api de spotify tiene un limite de 50 elementos por llamada,
    //existe el argumento "offset", el cual facilita multiples llamadas a elementos continuos
    //para recoger datos de playlists mas largas.
    albumController.get('/getalbumtracks/:albumid', async (req, res, next) => {
        try {
            res.header('Access-Control-Allow-Origin', '*');

            //Array para almacenar los datos en multiples iteraciones
            let allTracks = [];
            //posicion inicial para la llamada
            let offset = 0;
            //limite maximo. Se puede reducir si asi se desea pero no aumentar de 50
            const limit = 50;

            //Llama inicial para las 50 primeras
            let result = await spotifyApi.getAlbumTracks(req.params.albumid, { limit, offset });
            allTracks = allTracks.concat(result.body.items);

            //En caso de que existan mas registros desues de 50, se llama constantemente y se almacena en el array
            //hasta el final
            while (result.body.next) {
                offset += limit;
                result = await spotifyApi.getAlbumTracks(req.params.albumid, { limit, offset });
                allTracks = allTracks.concat(result.body.items);
            }

            res.status(200).send(allTracks);
        } catch (err) {
            res.status(400).send(err);
        }
    });


    return albumController;
}