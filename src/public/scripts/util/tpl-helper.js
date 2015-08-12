define(['handlebars', '../config/url'], function(Handlebars, url) {
    var helper = {
        discount: function () {
            Handlebars.registerHelper('discount', function() {
                if (!this.priceout || !this.original_price) {
                    return '*';
                }
                return (this.priceout / this.original_price * 10).toFixed(1);
            });
        },
        imgSize: function (name, width, height, property) {
            Handlebars.registerHelper('img', function(){
                return this[property].replace(/(\.png|\.jpg|\.jpeg)/i, '_' + width + 'x' + height + '$1');
            });
        },
        staticPath: function () {
            Handlebars.registerHelper('staticPath', function () {
                return url.imgPrefix;
            });
        }
    };

    return helper;
});