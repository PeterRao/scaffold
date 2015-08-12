//编译的模板中引用的依赖为 handlebars ，防止rev-all无法替换这里使用别名进行替换
require.config({
    paths: {
        handlebars: '../../lib/handlebars.runtime'
    }
});

// 这里不用 commonjs 风格原因有以下几点
// 1. 使用 commonjs 后，在使用 uglify 进行压缩，会产生错误，需要排除 require 关键字。
// 2. http://imququ.com/post/amd-simplified-commonjs-wrapping.html
// 后续使用有其他可行的异步模块加载方案，考虑使用 commonjs 风格，其扩展性更好。
define([
    '../../lib/zepto', 'handlebars', '../../lib/swipernew', '../../util/util',
    '../../lib/lazyload', '../../util/tpl-helper', '../../templates/mobile/monthTag',
    '../../templates/mobile/monthGoodsList'],
    function ($, Handlebars, Swiper, util, lazyload, tplHelper, monthTag, monGoodsList) {

    var $monthMask, $goodsList, $goodsListT, $monthTags, $monthInfo;

    var urlObj = util.urlParser(location.href);

    var _view = {
        init: function () {
            tplHelper.discount();
            tplHelper.imgSize('img', 400, 400, 'imgs[0]');
            tplHelper.imgSize('tagImg', 200, 200, 'image_path');
            var params1 = { positionId: 206 };
            _data.getStockWall(params1, function(data) {
                console.log(data);
            });
            var params2 = { positionId: 207 };
            _data.getStockWall(params2, function(data) {
                console.log(data);
            });
        }
    };
    var _data = {
        getStockWall: function (params, cb) {
            $.ajax({
                type: 'GET',
                url: '/u/OpPosition/info',
                dataType: 'json',
                data: params,
                success: function(data) {
                    cb(data);
                }
            });
        }
    };
    var event = {

    };
    function init() {
        $monthMask = $('#j-month-mask');
        $goodsList = $('#j-goods-list');
        $goodsListT = $('#j-goods-list-t');
        $monthTags = $('#j-month-tags');
        $monthInfo = $('#j-month-info');

        _view.init();
    }
    $(document).ready(function() {
        init();
    });
});
