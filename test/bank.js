// get what argument [2]
//load in variable and compare to see what operationm they doing
// if user deposit then append coma and the bnumber in argv 3;
// if user withdraw then append  coma, negative sign  and the number in argv3;
// if user type total read the file then split(",") then loop all the values and  add;
// if lotto subtract 1;
//generate a random number between 1 to 100;
//if the random number === 100, then deposit 1000 in account;


var fs = require("fs");

var action = process.argv[2];

switch (action) {
    case "deposit":
        depoAmount(process.argv[3]);

        break;
    case "withdraw":
        withdrawAmount(process.argv[3]);

        break;
    case "total":
        totalAmount();

        break;
     case "lotto":
     lottoAmount();
     break;

    default:
        console.log("unsupported action");
}

function depoAmount(amount) {
    if (!isNaN(amount)) {
        fs.appendFile("bank.txt", ", " + amount, function (err) {
            if (err) {
                console.log(err);
            }

        });
    }

}

function withdrawAmount(amount) {
    if (!isNaN(amount)) {
        fs.appendFile("bank.txt", ", -" + amount, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

function totalAmount() {
    fs.readFile("bank.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        var sum = 0;
        for (i = 0; i < dataArr.length; i++) {
            sum += parseFloat(dataArr[i]);
        }
        console.log(sum);
    })
}

function lottoAmount(){
    withdrawAmount("1");
    var  a = Math.floor(Math.random()*100)+1;
    if(a > 50 ){
        depoAmount("1000");
    }
}