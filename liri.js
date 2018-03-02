// set dependencies
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var inquirer = require('inquirer');
var OMDB = "trilogy";

// import keys from env file
var sclient = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})
var tclient = new Twitter(keys.twitter);

// Prompt user questions for response - Spotify, OMDB, Twitter. Followed up with corresponding function using user selection

var question = inquirer.prompt([{
        type: "list",
        name: "userChoice",
        message: "Where would you like to focus your search?",
        choices: ["Twitter for Prior Tweets", "Movies via OMBD", "Song via Spotify", "Do What It Says"]
    },
    {
        type: "input",
        name: "userSearch",
        message: "What would you like to search for?",
    }
]).then(function (user) {
    var userSelection = user.userChoice;
    var userSearch = user.userSearch;
    console.log(user);
    // Create swith options for potential searches
    switch (userSelection) {
        case "Twitter for Prior Tweets":
            getTweets(userSearch);
            break;
        case "Search Movies via OMBD":
            getMovie(userSearch);
            break;
        case "Song via Spotify":
            getSong(userSearch);
            break;
        case "Do What It Says":
            DWIS(userSearch);
            break;
    }
});

// functions for responses to search options (userChoice)

function getTweets(handle) {
    var Twitter = require('twitter');

    var client = new Twitter(keys.twitter);

    var params = {
        q: handle,
        count:20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        console.log(tweets);
        if (!error) {
            console.log(tweets);
        }
    });
    console.log(handle);
}
// set up spotify search pull
function getSong(song) {

    var spotify = new Spotify(keys.spotify);

    spotify
        .search({
            type: 'track',
            query: song
        })
        .then(function (data) {
            console.log(`Title: ${data.tracks.items[0].name}`);
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log(`Preview link: ${data.tracks.items[0].preview_url}`);
        })
        .catch(function (err) {
            console.log(err);
        });


    console.log(song);
}
// OMBD Movie call function
// function getMovie(movie){
//     if (!movie){
//         movie = "Banking on Bitcoin";
//     };
//     // make the API call with search term
//     request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
// add console logs to call movie data

// DWIS data function
function DWIS(random) {
    fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
        console.log("Try again loser");
    }
    else{
        var dataArray = data.split(",");
        getSong(dataArray[1]);
    }
    });
     // log data to txt file
//    var dataLogs = ()
}
   
