const express = require('express');
const cors = require('cors');
require('dotenv').config()

// Definir politicas y permisos que va a pedir al usuario
const SpotifyWebApi = require("spotify-web-api-node");
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private, playlist-read-private', 'user-read-currently-playing', 'playlist-read-collaborative', 'user-library-read']

//Solucion error cors
var app = express()
app.use(cors());
app.use(express.json());


//Crear objeto que contiene los metodos de llamada a la API
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID, // privadas con env en .env
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

//Controladores adicionales en /rutas para mayor claridad y distribucion de codigo.
var landingPageController = require('./rutas/landingPageController')(express, spotifyApi);
var playlistsController = require('./rutas/playlistsController')(express, spotifyApi);
var albumController = require('./rutas/albumController')(express, spotifyApi);
app.use(landingPageController);
app.use(playlistsController);
app.use(albumController);

//Metodo para comprobar que la api se ejecuta correctamente, no tiene utilidad en el proyecto
app.get('/funciona', (req, res, next) => {
  res.status(200).send({message: "FUNCIONA"});
})


//Metodo que se asegura que un usuario no autentificado acceda al interior de la página mediante url y redirige a la landing page
app.get('/refreshlogin', async (req, res, next) => {
  try {
    res.header('Access-Control-Allow-Origin', '*')
    if ((typeof spotifyApi.getAccessToken() === 'undefined') || (typeof spotifyApi.getRefreshToken() === 'undefined')) {
      console.log("Tokens undefined, redirecting...");
      res.redirect('http://localhost:8000');
    } else {
      console.log("Tokens defined, continuing...");
      return res.status(200).send({ message: "Tokens defined" });
    }
  } catch (err) {
    console.error("Error checking tokens:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


//Metodo raiz. Equivale a llamar a /login
app.get('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.redirect('http://localhost:3000/login/');
}) 
  

//Metodo que crea la url de autentificacion que redirigira a la página oficial de spotify
//y permitira que el usuario se autentifique con los permisos anteriormente definidos
// - nota - 
//El error:  [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//es un error que no provoca ningun fallo en la aplicacion y sucede debido al sistema de
//redirecciones de autentificacion entre spotify y la api.
//No supone ningun problema para la app
app.get('/login', (req,res) => {
    res.header('Access-Control-Allow-Origin', '*')
    var html = spotifyApi.createAuthorizeURL(scopes)

    res.redirect(html +"&show_dialog=true");
    res.send(html +"&show_dialog=true")  
})


//Metodo que recoge el token de autentificacion del usuario desde Spotify una vez el usuario lo ha perimitido.
//Redirige a la página principal del usuaruo dentro de la app en el front
app.get('/callback', async (req,res) => {
    const { code } = req.query;
    try {
      res.header('Access-Control-Allow-Origin', '*')
      var data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.redirect('http://localhost:8000/home/');

    } catch(err) {
      res.redirect('/#/error/invalid token');
    }
});


//Ejecutar api en localhost:3000
var port = 3000;
app.listen(port, function () {
   console.log(`My Spotify project running!`);
});

