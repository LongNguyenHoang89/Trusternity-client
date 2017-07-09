var ipc = require('electron').ipcRenderer;
var Clusterize = require('clusterize.js');

$(document).ready(function () {
    //Load tabs
    $('#main-infotab').load('template/infotab.html');
    $('#main-registrationtab').load('template/registrationtab.html', regtabCabllback);
    $('#main-logtab').load('template/logtab.html', logtabCallback);

    // Initialize collapse button
    $(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();  
    //console.log("webContents")

});

var regtabCabllback = function () {
    //Register events
    $('#regtab-btn-register').click(registerClick);
    $('#regtab-btn-generate-key').click(generateKeyClick); 
}

var logtabCallback = function () {
    setupInfoTable();
}

var setupInfoTable = function () {
    // JavaScript   
    var clusterize = new Clusterize({
        scrollId: 'scrollArea',
        contentId: 'contentArea'
    });

    ipc.on('log', (event, arg) => {
        var row = '<tr><td>' + arg + '</td></tr>'
        clusterize.prepend([row]);
        clusterize.refresh();
    })
}

var generateKeyClick = function () {
    ipc.once('generateKeyReply', function (event, response) {
        console.log('generate key done');
        $('#regtab-input-key').val(response);
    })
    ipc.send('generate-key');
}

var registerClick = function () {
    ipc.once('registerReply', function (event, response) {
        console.log('register done')
    })
    var email = $('#regtab-input-email');
    var key = $('#regtab-input-key');
    ipc.send('register', email.val(), key.val());
}
