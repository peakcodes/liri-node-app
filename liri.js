// set dependencies
dorequire("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var inquirer = require('inquirer');

// import keys from env file
var sclient = new Spotify({id: keys.spotify.id,secret: keys.spotify.secret})
var tclient = new Twitter(keys.twitter);

// Prompt user questions for response - Spotify, OMDB, Twitter. Followed up with corresponding function using user selection

var question = inquirer.prompt ([
    {
    type: "list",
    name: "userChoice",
    message: "\nWhat search option would you like to choose?",
    choices: ["Display Prior Tweets", "Search OMDB", "Search Spotify"]
    }
]) .then(function(user){
    var searchWord = user.searchWord;
    var userSelection = user.Choice;
}

console.log(`Title: ${data.tracks.items[0].name}`);
console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
console.log(`Album: ${data.tracks.items[0].album.name}`);
console.log(`Preview link: ${data.tracks.items[0].preview_url}`);
