var ipc = require('electron').ipcMain;
var http = require('http');
var WebSocket = require('ws');
const { webContents } = require('electron')

//websocket to local CONIKS client
var wsURL = 'ws://localhost:3001/ws';
var ws = new WebSocket(wsURL);
var browserWindow;

var SetupIpc = function (window) {
    ipc.on('register', function (event, email, key) {
        register(event, email, key)
    });

    ipc.on('generate-key', function (event) {
        var result = generateKey(event);
        event.sender.send('generateKeyReply', result);
    });

    browserWindow = window;
}

var log = function (message) {
    browserWindow.webContents.send('log', message);
}

var makeToast = function (message) {
    // Materialize.toast(message, displayLength, className, completeCallback);
    Materialize.toast(message, 4000);
}

var options = {
    host: 'localhost',
    port: '3001',
    method: 'POST'
};

var httpCallback = function (res) {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    }

    if (error) {
        makeToast(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        event.sender.send('registerReply', rawData);
    });

}

var generateKey = function (event) {
    log('generate new keypair');
    return 'PK1';
}

var register = function (event, email, key) {
    var command = 'register ' + email + ' ' + key;
    log(command);
    ws.send(command);
}

ws.on('open', function () {
    log('Connected to CONIKS client at ' + wsURL);
});

ws.on('message', function (message) {
    log(message);
});

ws.on('error', function (error) {
    log(error.message);
});

module.exports = { SetupIpc }