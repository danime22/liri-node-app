require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();




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
        console.log("yeah whatever");
}

function concert(band) {
    if (!band) {
      console.log(" No band specify");

    }
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=2facc3a407cc9d2e147b31584f0a54fc", function (error, response, body) {

        if (!error && response.statusCode === 200) {
           
            var bandData = JSON.parse(body);
            
            for(i = 0; i < bandData.length; i++){
                var location = bandData[i].venue.city;
                if(bandData[i].venue.region){
                    location += ", " + bandData[i].venue.region;
                } 
                if(bandData[i].venue.country){
                    location += ", " + bandData[i].venue.country;
                } 

                var dateTime = moment(bandData[i].datetime).format("MM/DD/YY");
                console.log("Venue: " + bandData[i].venue.name);
                console.log("Location: " + location);
                console.log("Date: " + dateTime);
                console.log("");

            }

        }
    });



}

function spotifier(song) {
    if (!song) {
        song = "The Sign";
    }
    var spotifyM = new Spotify(keys.spotify);
    spotifyM.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {
            var response = "No Artist Listed";
            if (data.tracks.items[i].artists) {

                var response = data.tracks.items[i].artists[0].name;// gets the first artist

                // it loops over the second artist to how many artist and append their name with the comma separator
                for (j = 1; j < data.tracks.items[i].artists.length; i++) {
                    response += ", " + data.tracks.items[i].artists[j].name;
                }
            }

            // console.log("letter: " + j);
            // console.log("letter: " + i);

            console.log("Artist: " + response);
            // return response;
            // var artistNames = getArtist(data.tracks.items[i].artists);
            // console.log(data.tracks.items[i].artists)
            // console.log("singer: " + artistNames);//artists
            console.log(" title: " + data.tracks.items[i].name);// song title
            console.log(" preview: " + data.tracks.items[i].preview_url);// preview url
            console.log("From: " + data.tracks.items[i].album.name);
            console.log("");
        }


    });

}

function movie(movieName) {
    if (!movieName) {
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
    var fs = require("fs");

    fs.writeFile("random.txt", "what ever it say", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("movies");
    })
}


// function getArtist(s) {
//     var response = s[0].name;

//     for (i = 1; i < s.length; i++) {
//         response += ", " + s[i].name;
//     }

//     console.log("this: " + response);
//     return response;

// }

