/*
    We extract real data from Ethereum canonical blockchain header.     
*/

var Web3 = require('web3');
var fs = require('fs');
var async = require('async');

//var resultFileName = 'test';

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function extractData(id, callback) {
    var block = web3.eth.getBlock(id);    
    callback(block);
}

function runQueue(resultFileName) {
    var queue = async.queue(extractData, 10); // Run 10 concurrent extract    
    queue.drain = function () {
        console.log('job finished');
    }

    var header = 'num, diff, time\n';
    fs.writeFileSync(resultFileName + '.csv', header);

    var currentBlockNum = 2000000;
    for (var i = 0; i < currentBlockNum; i++) {
        queue.push(i, function (block) {            
            var line = block.number
                + "," + block.difficulty
                + "," + block.timestamp
                + "\n";
            fs.appendFileSync(resultFileName + '.csv', line);
        });
    }
}

runQueue('test');