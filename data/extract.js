/*
    We extract real data from Ethereum canonical blockchain header.     
*/

var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var num = 100;
web3.eth.getBlock(num, callback);

function callback(error, block){
    if (error != undefined){
        console.log("something happens")
    }
    else {
        var result = block.number
        console.log(result);
    }
}