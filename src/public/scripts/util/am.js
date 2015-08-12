define(['../lib/zepto', '../lib/fastclick', '../config/url', '../util/tpl-helper'],
    function($, FastClick, url, Handlebars, tplHelper) {

    var am = {
        init: function () {
            // 使用 fastclick 来解决 click 的延迟问题
            FastClick.attach(document.body);

            // 替换
            tplHelper.staticPath();
        }
    };
    am.init();

    return am;
});