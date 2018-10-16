// TODO Grab the request package...
// @link https://www.npmjs.com/package/request
var request = require("request");
// Run the request function...
// The request function takes in a URL then returns three arguments:
// 1. It provides an error if one exists.
// 2. It provides a response (usually that the request was successful)
// 3. It provides the actual body text from the website <---- what actually matters.
request("https://www.dallasopendata.com/resource/s3jz-d6pf.json?$limit=10&$$app_token=kDCDojjY922O36hyR8W6vQ2nl", function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {

        // Then log the body from the site!
        // console.log(body);
        var a = JSON.parse(body);
       console.log(a[0].ag_forms);
    }
});
