// Using the require keyword lets us access all of the exports
// in our ess.js file
var bandList = require("./bands.js");

// This will print everything in exports.
for (var key in  bandList){
    console.log("a" + key + bandList[key]);
}

