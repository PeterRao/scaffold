define(function(require, exports, module) {

    var $ = require('../lib/zepto'),
        FastClick = require('../lib/fastclick'),
        url = require('../config/url'),
        Handlebars = require('handlebars');

    var am = {
        init: function () {
            Handlebars.registerHelper('staticPath', function() {
                return url.imgPrefix;
            });
        }
    };
    am.init();

    return am;
});