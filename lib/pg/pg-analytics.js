document.addEventListener("deviceready", gainit, false);

// todo: make this a setting in WP
var AnalyticsAccount = "[[AnalyticsAccount]]";

var testDiv;

function gaerrorHandler(e) {
    console.log('ga error');
}

function gasuccesshandler() {
    gaPlugin.trackPage( function() { console.log('trackpage'); }, function() { console.log('error: trackpage'); }, "index.html");
}

function gainit() {
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(gasuccesshandler, gaerrorHandler, AnalyticsAccount, 10);
}
