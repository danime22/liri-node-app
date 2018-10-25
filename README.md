# LIRI NODE APP

This is a simple command line application for node that can retrieve song, movie, and concert information. It is executed as followed:
> node liri.js *command argument*

It supports the following commands:
* spotify-this-song - using the spotify api, looks up the song specified in "argument" and displays the first 20 results.
* concert-this - using the bandsintown api, lists upcoming scheduled concerts for the artist specified in "argument"
* movie-this - using the IMDB api, looks up the movie specified in "argument".
* do-what-it-says - executed with no arguments, it executes the command contained within a file called random.txt

**Example usage:**
> *node liri.js movie-this "The Matrix"*

A demonstration of the application can be found [here](https://drive.google.com/file/d/1mv_wJTv5UJZBITAt6eAB_eDBdmWV7PX_/view?usp=sharing).
