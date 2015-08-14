//编译的模板中引用的依赖为 handlebars ，防止rev-all无法替换这里使用别名进行替换
require.config({
    paths: {
        handlebars: '../../../lib/handlebars.runtime'
    }
});

// 这里不用 commonjs 风格原因有以下几点
// 1. 使用 commonjs 后，在使用 uglify 进行压缩，会产生错误，需要排除 require 关键字。
// 2. http://imququ.com/post/amd-simplified-commonjs-wrapping.html
// 后续使用有其他可行的异步模块加载方案，考虑使用 commonjs 风格，其扩展性更好。
define([
        '../../../lib/zepto', 'handlebars', '../../../lib/swipernew', '../../../util/util',
        '../../../lib/lazyload', '../../../util/tpl-helper'],
    function ($, Handlebars, Swiper, util, lazyload, tplHelper, monthTag, monGoodsList) {

        var $day1, $day2, $hour1, $hour2, $minute1, $minute2;

        var urlObj = util.urlParser(location.href);

        var MILL_SECONDS_PER_MINUTE = 1000 * 60,
            MILL_SECONDS_PER_HOUR = MILL_SECONDS_PER_MINUTE * 60,
            MILL_SECONDS_PER_DAY = MILL_SECONDS_PER_HOUR * 24,
            END_TIME = new Date(2015, 8 - 1, 20);

        var _view = {
            init: function () {
                _view.setCountDown();
            },
            setCountDown: function () {
                var diff = new Date(END_TIME - Date.now());
                var days = diff.getUTCDate() - 1;
                var hours = diff.getUTCHours();
                var minutes = diff.getUTCMinutes();
                $day1[0].innerText = Math.floor(days / 10);
                $day2[0].innerText = days % 10;
                $hour1[0].innerText = Math.floor(hours / 10);
                $hour2[0].innerText = hours % 10;
                $minute1[0].innerText = Math.floor(minutes / 10);
                $minute2[0].innerText = minutes % 10;
                setTimeout(function () {
                    _view.setCountDown();
                }, 1000);
            }
        };
        var _data = {
        };
        var _event = {

        };
        function init() {
            $day1 = $('#day1');
            $day2 = $('#day2');
            $hour1 = $('#hour1');
            $hour2 = $('#hour2');
            $minute1 = $('#minute1');
            $minute2 = $('#minute2');

            _view.init();
        }
        $(document).ready(function() {
            init();
        });
    });
