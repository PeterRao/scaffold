define(function(require, exports, module) {
    function search(str) {
        if(!str) {
            return {};
        }

        var ret = {};
        str = str.slice(1).split('&');
        for(var i = 0, arr; i < str.length; i++) {
            arr = search[i].split('=');
            ret[arr[0]] = arr[1];
        }
        return ret;
    }

    var util = {
        urlParser: function (url) {
            var a = document.createElement('a');
            a.href = url;
            return {
                protocol: a.protocol,
                host: a.host,
                hostname: a.hostname,
                pathname: a.pathname,
                search: search(a.search),
                hash: a.hash
            };
        }
    };
    return util;
});