require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");




var action = process.argv[2];

switch (action) {
    case "concert-this":
    concert(process.argv[3]);
    break;
    case "spotify-this-song":
    spotifier(process.argv[3]);
    break;
    case "movie-this":
    movie(process.argv[3]);
    break;
    case "do-what-it-says":
    doWhat();
    break;
    default:
    console.log("muther fucker");
}

function concert(band){

}

function spotifier(song) {
    if(!song){
        song = "The Sign";
    }
 var spotifyM = new Spotify(keys.spotify);
    spotifyM.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    
        var artistNames = getArtist(data.tracks.items[0].artists);
    
        console.log(data.tracks.items[0].name);
        console.log(artistNames);
        console.log(data.tracks.items[0].preview_url);
        // console.log("hey: " + JSON.stringify(data));
    });

}

function movie(movieName) {
    if(!movieName){
        movieName = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var movieData = JSON.parse(body);

            console.log("Title: " + movieData.Title);
            console.log("Year came out: " + movieData.Year);
            console.log("IMBD Rating: " + movieData.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
            console.log("Produced in: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
        }
    });

}

function doWhat() {

}


function getArtist(artists){
    var response = artists[0].name;
        for(i=1; i < artists.length; i++){
            response += ", " + artists[i].name;
        }

    return response;
}