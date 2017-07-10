/*
    We extract real data from Ethereum canonical blockchain header.     
*/

var Web3 = require('web3');
var fs = require('fs');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function web3Callback(error, block){
    if (error != undefined){
        console.log("something happens")
    }
    else {
        var result = block.number
        console.log(result);
    }
}

function extractData(fileName){    
    var header = 'num, diff, time, interval, avg\n';
    fs.writeFileSync(fileName + '.csv', header);
    var prev = 0;
    var prev10 = [];

    var currentBlockNum = 2000000;
    //var currentBlockNum = 10;

    for (var i = 0; i < currentBlockNum; i++) {        
        var block = web3.eth.getBlock(i);
        // for each block, we calculate a different between 2 timestamps
        var timeDifferent = block.timestamp - prev;
        prev = block.timestamp;

        // now we skip the first 3 blocks, they are stablizing anyway
        if (i < 3) continue;

        // for each block, we calculate an average time different of 10 blocks
        // from the selected one to 9 previous others
        if (prev10.length == 10) {
            prev10.shift(); //remove the first element from queue
        }
        prev10.push(timeDifferent); //push this one
        var avg = prev10.reduce(function (sum, value) {
            return sum + value;
        }, 0) / prev10.length;

        var line = block.number
            + "," + block.difficulty
            + "," + block.timestamp
            + "," + timeDifferent
            + "," + avg
            + "\n";
        fs.appendFileSync(fileName + '.csv', line);
    }
}

extractData('test');