//META{"name":"serverTheme"}*//
function serverTheme(){};

/* Variables */
serverTheme.themePath = process.env.APPDATA + "\\BetterDiscord\\themes\\";
serverTheme.intervalTimer1 = null;

/* Internal Functions */
serverTheme.prototype.doesFileExist = function(filePath) {
    try {
        require('fs').accessSync(filePath);
        return true;
    } catch(e) {
        return false;
    }
};
serverTheme.prototype.getFileContent = function(filePath,callback) {
    if(serverTheme.prototype.doesFileExist(filePath)) {
        var readStream = require('fs').createReadStream(filePath);
        var buffer = [];

        readStream.on('readable', function(){
            while ((chunk = readStream.read()) != null) {
                buffer.push(chunk.toString().replace(/[\r\n]/gim,''));
            }
        });
        readStream.on('end', function(){
            callback(buffer.join(''));
            return 0;
        });
    } else {
        callback('');
        return 0;
    }
};
serverTheme.prototype.injectCSS = function(buffer) {
    BdApi.clearCSS("serverTheme-css");
    BdApi.injectCSS("serverTheme-css", buffer);
}
serverTheme.prototype.loadServerCSS = function(serverHash) {
    serverTheme.prototype.getFileContent(serverTheme.themePath + serverHash+'.servertheme.css',serverTheme.prototype.injectCSS);
};
serverTheme.prototype.getHashFromURL = function(url) {
    return url.split('/')[2];
};
serverTheme.prototype.getCurrentServerHash = function() {
    return serverTheme.prototype.getHashFromURL($('.guild.selected a').attr('href'));
}

/* Information */
serverTheme.prototype.getName = function(){
    return 'Server Specific Themes';
};
serverTheme.prototype.getDescription = function(){
    return 'Ability to use specific themes on individual servers.';
};
serverTheme.prototype.getVersion = function(){
    return '0.8';
};
serverTheme.prototype.getAuthor = function(){
    return '<a href="https://github.com/IRDeNial" target="_BLANK">DeNial</a>';
};

/* API Hooks */
serverTheme.prototype.load = function(){};
serverTheme.prototype.unload = function(){};
serverTheme.prototype.stop = function(){
    BdApi.clearCSS("serverTheme-css");
};
serverTheme.prototype.onSwitch = function(){
    serverTheme.prototype.loadServerCSS(serverTheme.prototype.getCurrentServerHash());
};
serverTheme.prototype.start = function(){
    serverTheme.prototype.loadServerCSS(serverTheme.prototype.getCurrentServerHash());
   
    /*
    $('.guild-header ul').prepend('<li><a class="server-css">Server CSS</a></li>');

    $('.guild-header ul .server-css').click(function(){
        serverTheme.prototype.openEditor(serverTheme.themePath + serverTheme.prototype.getCurrentServerHash() +'.servertheme.css');
    });
    */
};
