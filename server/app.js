const express = require('express');
const cors = require('cors');
require('dotenv').config()

const SpotifyWebApi = require("spotify-web-api-node");
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private, playlist-read-private', 'user-read-currently-playing', 'playlist-read-collaborative']

var app = express()
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID, // privadas con env
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

var landingPageController = require('./rutas/landingPageController')(express, spotifyApi);
var playlistsController = require('./rutas/playlistsController')(express, spotifyApi);
app.use(landingPageController);
app.use(playlistsController);

app.get('/funciona', (req, res, next) => {
  res.status(200).send({message: "FUNCIONA"});
}) // localhost:3000

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


app.get('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    //res.redirect('https://back-spotify-manager-angeleitor4000.onrender.com/login/')
    res.redirect('http://localhost:3000/login/');
}) // localhost:3000
  

app.get('/login', (req,res) => {
    res.header('Access-Control-Allow-Origin', '*')
    var html = spotifyApi.createAuthorizeURL(scopes)
    const redirectURI="http://localhost:3000/callback/";
    //const redirectURI="https://back-spotify-manager-angeleitor4000.onrender.com/callback/";
    console.log(html)
    res.redirect(html +"&show_dialog=true");
    res.send(html +"&show_dialog=true")  
})

app.get('/callback', async (req,res) => {
    const { code } = req.query;
    //console.log(code)
    try {
      res.header('Access-Control-Allow-Origin', '*')
      var data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
  
      //console.log(access_token);
      //console.log(refresh_token);
      res.redirect('http://localhost:8000/home/');
      //return res.redirect('https://front-spotify-manager-angeleitor4000.onrender.com/dentro/');

    } catch(err) {
      res.redirect('/#/error/invalid token');
    }
});


var port = 3000;

app.listen(port, function () {
   console.log(`My Spotify project running!`);
});

