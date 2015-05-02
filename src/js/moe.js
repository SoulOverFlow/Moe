define(function (require, module, exports) {
    "use strict";

    var debug = require('./model/debug');
    debug(5);

    var home = require('./page/home');

    function initTheme () {
        debug.log('this is demo.');
        home.init();
    }

    return {
        init: initTheme
    }
});