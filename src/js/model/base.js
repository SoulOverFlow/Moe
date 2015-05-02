/**
 * 基础Base
 */
define(function () {
    'use strict';

    function Base () {
        this.id = 0;
    }

    Base.prototype = {
        update: function () {
            return ++this.id;
        }
    };

    var instance = new Base;
    return instance;
});