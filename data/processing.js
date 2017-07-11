/*
    We export Ethereum blockchain data into json files after running experiments.
    processing.js will parse the data into CSV format with block number, difficulty and timestamp.
*/

fs = require('fs');

var ReadFile = function (fileName) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return null;
        }

        Parse(data, fileName)
    });
}

var Parse = function (data, fileName) {
    //Pretty format JSON input
    var correctJson = data.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    var jsonArray = JSON.parse(correctJson);

    var header = 'num, diff, time, interval, avg, miner\n';
    fs.writeFileSync(fileName + '.csv', header);
    var prev = 0;
    var prev10 = [];

    for (var i = 0; i < jsonArray.length; i++) {
        var block = jsonArray[i];

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
            + "," + block.miner
            + "\n";
        fs.appendFileSync(fileName + '.csv', line);

    }
}

ReadFile('blocks_info_40-1.json');
ReadFile('blocks_info_40-4.json');
ReadFile('blocks_info_40-10.json');
