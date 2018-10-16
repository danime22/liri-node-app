// require loads the dotenv library then calls load which causes
// the .env file in the same directory to be loaded and 
require("dotenv").load();

// print the environement variables set in the file
console.log("My wife is " + process.env.WIFE);
console.log("I love her " + process.env.LOVE);