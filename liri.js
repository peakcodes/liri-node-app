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
        message: "What search option would you like to choose?",
        choices: ["Display Prior Tweets", "Search Movies via OMBD", "Search Spotify for a Song", "Do What is Says"]
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
    switch (userSelection) {
        case "Display Prior Tweets":
            getTweets(userSearch);
            break;
        case "Search Movies via OMBD":
            getMovie(userSearch);
            break;
        case "Search Spotify for a Song":
            getSong(userSearch);
            break;
        case "Do What is Says":
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
        console.log("gt");
        if (!error) {
            console.log(tweets);
        }
    });
    console.log(handle);
}

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

function getMovie(movie) {
    console.log(movie);

}

function DWIS(random) {
    fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
        console.log("Try again loser");
        console.log(data);
    }
    else{
        var dataArray = data.split(",");
        getSong(dataArray[1]);
    }
    });
    console.log(random);
}





// Create swith options for potential searches

// call function to run upon execution of search determination

// set up OMBD movie api and set up search terms

// set up Spotify song search api and set up search terms

// set up twitter tweet pull

//console.log to ensure successful connection to api's

// suggested spotify api call languagej
// console.log(`Title: ${data.tracks.items[0].name}`);
// console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
// console.log(`Album: ${data.tracks.items[0].album.name}`);
// console.log(`Preview link: ${data.tracks.items[0].preview_url}`);