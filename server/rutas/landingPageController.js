
module.exports = function(express, spotifyApi){
    var landingPageController = express.Router();

    landingPageController.get('/getactualtrack', async (req, res, next) => {

        try {
            res.header('Access-Control-Allow-Origin', '*')
            var result = await spotifyApi.getMyCurrentPlayingTrack();
            //console.log(result.body);
            res.status(200).send(result.body)
          } catch (err) {
            res.status(400).send(err)
          }
    }) // localhost:3000
      
    
    landingPageController.get('/user', async (req, res, next) => {
    
      try {
          res.header('Access-Control-Allow-Origin', '*')
          var result = await spotifyApi.getMe();
          //console.log(result.body);
          res.status(200).send(result.body)
        } catch (err) {
          res.status(400).send(err)
        }
    }) // localhost:3000
    
    return landingPageController;  
}