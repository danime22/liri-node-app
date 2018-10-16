inString = process.argv;
var inputNum = parseInt(process.argv[2]);


var b = inString[2];
var c = inString[3];


if(parseFloat(b) === parseFloat(c)){
    console.log(true);
} else{
    console.log(false);
}

console.log(b % 7 === 0 && c % 7 === 0);

console.log(process.argv);

