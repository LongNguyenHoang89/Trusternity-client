/*
    We extract real data from Ethereum canonical blockchain header.     
*/

var Web3 = require('web3');
var fs = require('fs');
var async = require('async');

//var resultFileName = 'test';

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function makeFileHeader(resultFileName){
    var header = 'num, diff, time\n';
    fs.writeFileSync(resultFileName + '.csv', header);
}

function runQueue(resultFileName) {        
    var resultInBatch = "";            

    var start = process.argv[2];
    var end = process.argv[3];
    console.log("Extract data from block " + start + " to " + end);

    for (var i = start; i < end; i++) {
        block = web3.eth.getBlock(i);
        var line = block.number
            + "," + block.difficulty
            + "," + block.timestamp
            + "\n";
        resultInBatch += line;                            
    }

    fs.appendFileSync(resultFileName + '.csv', resultInBatch);
}

//makeFileHeader('test');
runQueue('test');