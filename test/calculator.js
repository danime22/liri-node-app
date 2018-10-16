var inputString = process.argv;

var a = (inputString[2]);
var b = (inputString[3]);
var c = (inputString[4]);

var outputNum;

if (a === "add"){
    outputNum = parseFloat(b) + parseFloat(c);
} else if(a === "subtract"){
    outputNum = parseFloat(b) - parseFloat(c);
} else if(a === "multiply"){
    outputNum = parseFloat(b) * parseFloat(c);
} 
 else{
    outputNum = "not a numer";
}

console.log(outputNum);


