
//Controlador dedicado a las peticiones en la landing page del front (Poco relevante)
module.exports = function(express, spotifyApi){
    var landingPageController = express.Router();

    //Metodo que recoge la cancion que esta escuchando el usuario,
    //En el front se llama multiple veces para que se actualize correctamente.
    landingPageController.get('/getactualtrack', async (req, res, next) => {

        try {
            res.header('Access-Control-Allow-Origin', '*')
            var result = await spotifyApi.getMyCurrentPlayingTrack();
            res.status(200).send(result.body)
          } catch (err) {
            res.status(400).send(err)
          }
    })
      
    
    //Metodo que recoge informacion sobre el usuario de Spotify.
    //Solo se ejecuta 1 vez
    landingPageController.get('/user', async (req, res, next) => {
    
      try {
          res.header('Access-Control-Allow-Origin', '*')
          var result = await spotifyApi.getMe();
          res.status(200).send(result.body)
        } catch (err) {
          res.status(400).send(err)
        }
    })
    
    return landingPageController;  
}