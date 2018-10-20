require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");




var action = process.argv[2];
var arg = process.argv[3];

handleCommand(action, arg);

function handleCommand(action, arg) {

    fs.appendFile("log.txt", action + " " + arg + "\n", function (err) {
        if (err) {
            console.log(err);
        }
    });

    switch (action) {
        case "concert-this":
            concert(arg);
            break;
        case "spotify-this-song":
            spotifier(arg);
            break;
        case "movie-this":
            movie(arg);
            break;
        case "do-what-it-says":
            doWhat();
            break;
        default:
            console.log("Invalid Command");
    }
}

function concert(band) {
    if (!band) {
        console.log(" No band specify");

    }
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=2facc3a407cc9d2e147b31584f0a54fc", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var logger = fs.createWriteStream("log.txt", { flags: "a" });

            var bandData = JSON.parse(body);

            for (i = 0; i < bandData.length; i++) {
                var location = bandData[i].venue.city;
                if (bandData[i].venue.region) {
                    location += ", " + bandData[i].venue.region;
                }
                if (bandData[i].venue.country) {
                    location += ", " + bandData[i].venue.country;
                }

                var dateTime = moment(bandData[i].datetime).format("MM/DD/YY");
                var a = "Venue: " + bandData[i].venue.name + "\n" +
                        "Location: " + location + "\n" + 
                        "Date: " + dateTime + "\n\n";

                console.log(a);
                logger.write(a);

            }

            logger.end();

        }
    });



}

function spotifier(song) {
    if (!song) {
        song = "The Sign Ace of Base";
    }
    var spotifyM = new Spotify(keys.spotify);
    spotifyM.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var d = fs.createWriteStream("d.json", { flags: "a" });
        d.write(JSON.stringify(data));
        d.end();

        var logger = fs.createWriteStream("log.txt", { flags: "a" });
        var artistNames;
        for (i = 0; i < data.tracks.items.length; i++) {
            artistNames = "No Artist Listed";
            if (data.tracks && data.tracks.items[i] && data.tracks.items[i].artists) {
                var artistNames = data.tracks.items[i].artists[0].name;// gets the first artist
                // it loops over the second artist to how many artist and append their name with the comma separator
                for (j = 1; j < data.tracks.items[i].artists.length; j++) {
                    if (data.tracks.items[i]) {
                        artistNames += ", " + data.tracks.items[i].artists[j].name;
                    }
                }
            }

            var a = "Artist: " + artistNames + "\n" +
                "Title: " + data.tracks.items[i].name + "\n" +// song title
                "Preview: " + (data.tracks.items[i].preview_url || "Not Available") + "\n" +// preview url
                "From: " + data.tracks.items[i].album.name + "\n\n";

            console.log(a);
            logger.write(a);
        }

        logger.end();
    });

}

function movie(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var logger = fs.createWriteStream("log.txt", { flags: "a" });

            var movieData = JSON.parse(body);

            var a = "Title: " + movieData.Title + "\n" +
                    "Year came out: " + movieData.Year + "\n" +
                    "IMBD Rating: " + movieData.Ratings[0].Value + "\n" +
                    "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\n" +
                    "Produced in: " + movieData.Country + "\n" +
                    "Language: " + movieData.Language + "\n" +
                    "Plot: " + movieData.Plot + "\n" +
                    "Actors: " + movieData.Actors + "\n\n";

            console.log(a);
            logger.write(a);
            logger.end();



        }
    });

}

function doWhat() {



    fs.readFile("random.txt", "utf8", function (err, data) {

        var part = data.split(" ");
        var action = part[0];
        var sly = part.slice(1).join(" ");

        handleCommand(action, sly);

        if (err) {
            return console.log(err);
        }
        console.log(sly);
    })
}



