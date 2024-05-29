
//Controlador dedicado a las peticiones relacionadas con la gestion de playlists (Muy relevante)
// (GET, PUT, DELETE tracks)
//Futura implementacion: delete playlist (No es muy relevante ya que no es una funcion extra a spotify oficial)
module.exports = function (express, spotifyApi, bodyParser) {
  var playlistsController = express.Router();

  //Metodo que obtiene las playlists del usuario
  //Posteriormente en el front se gestionara para mostrar solo las guardas por el usuario
  playlistsController.get('/getplaylists', async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      // Array para almacenar los datos en múltiples iteraciones
      let allPlaylists = [];
      // Posición inicial para la llamada
      let offset = 0;
      // Límite máximo.
      const limit = 50;

      // Llamada inicial para las primeras 50 playlists
      let result = await spotifyApi.getUserPlaylists('', { limit, offset });
      allPlaylists = allPlaylists.concat(result.body.items);

      // En caso de que existan más registros después de las primeras 50,
      // se llama constantemente y se almacena en el array hasta el final
      while (result.body.next) {
        offset += limit;
        result = await spotifyApi.getUserPlaylists('', { limit, offset });
        allPlaylists = allPlaylists.concat(result.body.items);
      }

      // Crear un objeto que simule la estructura de result.body original
      let responseBody = {
        href: result.body.href,
        items: allPlaylists,
        limit: result.body.limit,
        next: result.body.next,
        offset: 0,
        previous: null,
        total: allPlaylists.length
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
  playlistsController.get('/getplaylisttracks/:playlistid', async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      //Array para almacenar los datos en multiples iteraciones
      let allTracks = [];
      //posicion inicial para la llamada
      let offset = 0;
      //limite maximo. Se puede reducir si asi se desea pero no aumentar de 50
      const limit = 50;

      //Llama inicial para las 50 primeras
      let result = await spotifyApi.getPlaylistTracks(req.params.playlistid, { limit, offset });
      allTracks = allTracks.concat(result.body.items);

      //En caso de que existan mas registros desues de 50, se llama constantemente y se almacena en el array
      //hasta el final
      while (result.body.next) {
        offset += limit;
        result = await spotifyApi.getPlaylistTracks(req.params.playlistid, { limit, offset });
        allTracks = allTracks.concat(result.body.items);
      }

      res.status(200).send(allTracks);
    } catch (err) {
      res.status(400).send(err);
    }
  });


  //recibe el id de una playlists como argumento URL y un JSON con las uris de las canciones a eliminar en el body
  playlistsController.delete("/eliminarcancionesplaylist/:playlistid", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      const { tracks } = req.body
      //formatea las uris recibidas correctamente para que se adapten al metodo de la libreria de la api
      const formattedTracks = tracks.map(uri => ({ uri }));

      //En caso de que por error llegue vacio. No deberia de pasar ya que esta gestionado en el front
      if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({ error: "Se esperaba un array de canciones para eliminar." });
      }

      const result = await spotifyApi.removeTracksFromPlaylist(req.params.playlistid, formattedTracks);
      res.status(200).json(result.body);
    } catch (err) {
      res.status(400).send(err);
    }
  });


  //Metodo que recibe un array de uris + un array de las playlists seleccionadas en el body como json para añadirlas a una playlist existente
  playlistsController.put("/addtrackstoexistplaylists", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      const { tracks, selectedPlaylists } = req.body;

      //En caso de que llegue vacio. No deberia de pasar
      if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({ error: "Se esperaba un array de canciones para añadir." });
      }

      for (const playlistId of selectedPlaylists) {
        await spotifyApi.addTracksToPlaylist(playlistId, tracks);
      }

      res.status(200).json({ message: "Canciones añadidas con éxito a las playlists seleccionadas." });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //Similar al anterior. Recibe el json de las uris por el body y el nombre de la nueva playlist por la url
  playlistsController.put("/addtrackstonewplaylists/:nombreplaylist", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      const { tracks } = req.body;
      const nombrePlaylist = req.params.nombreplaylist;

      //En caso de que llegue vacio
      if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({ error: "Se esperaba un array de canciones para añadir." });
      }

      //Crea una playlist vacia con el nombre de la playlist
      const result = await spotifyApi.createPlaylist(nombrePlaylist, { description: "" });
      //Recoge el id de la nueva playlist
      const newPlaylistId = result.body.id;
      //Añade las canciones a la nueva playlist por el id
      await spotifyApi.addTracksToPlaylist(newPlaylistId, tracks);

      res.status(200).json({ message: "Playlist creada y canciones añadidas con éxito." });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  return playlistsController;
}
