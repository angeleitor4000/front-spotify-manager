module.exports = function (express, spotifyApi, bodyParser) {
  var playlistsController = express.Router();

  playlistsController.get('/getplaylists', async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      var result = await spotifyApi.getUserPlaylists();
      res.status(200).send(result.body);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  playlistsController.get('/getplaylisttracks/:playlistid', async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      let allTracks = [];
      let offset = 0;
      const limit = 50;

      let result = await spotifyApi.getPlaylistTracks(req.params.playlistid, { limit, offset });
      allTracks = allTracks.concat(result.body.items);

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

  playlistsController.delete("/eliminarcancionesplaylist/:playlistid", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      const { tracks } = req.body;
      const formattedTracks = tracks.map(uri => ({ uri }));

      if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({ error: "Se esperaba un array de canciones para eliminar." });
      }

      const result = await spotifyApi.removeTracksFromPlaylist(req.params.playlistid, formattedTracks);
      res.status(200).json(result.body);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  playlistsController.put("/addtrackstoexistplaylists", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');
  
      const { tracks, selectedPlaylists } = req.body;
      const formattedTracks = tracks.map(uri => ({ uri }));
  
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


  playlistsController.put("/addtrackstonewplaylists/:nombreplaylist", async (req, res, next) => {
    try {
      res.header('Access-Control-Allow-Origin', '*');

      const { tracks } = req.body;
      const nombrePlaylist = req.params.nombreplaylist;
      const formattedTracks = tracks.map(uri => ({ uri }));

      if (!Array.isArray(tracks) || tracks.length === 0) {
        return res.status(400).json({ error: "Se esperaba un array de canciones para añadir." });
      }

      const result = await spotifyApi.createPlaylist(nombrePlaylist, {description: ""});
      const newPlaylistId = result.body.id;
      await spotifyApi.addTracksToPlaylist(newPlaylistId, tracks);

      res.status(200).json({ message: "Playlist creada y canciones añadidas con éxito." });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  return playlistsController;
}
