function ajax(opts) {
    var def = {
        type: 'get',
        async: true,
        data: null,
        success: null,
        error: null
    };
    var settings = extend({}, def, opts); //加上空对象 不改变默认的参数
    //1.创建对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                settings.success && settings.success(xhr.responseText); //判断是不是函数,&&找假-找到就不往后执行了
            } else {
                settings.error && settings.error(xhr.status);
            }
        }
    }
    var data = typeof settings.data == 'object' ? formatter(settings.data) : settings.data;
    if (settings.type == 'get') {
        xhr.open('GET', settings.url + '?' + data, settings.async);
        xhr.send();
    } else {
        xhr.open('POST', settings.url, settings.async);
        xhr.setRequestHeader('Content-Type', 'Application/x-www-form-urlencoded,charset=utf-8');
        xhr.send(formatter(settings.data));
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var k in arguments[i]) {
                arguments[0][k] = arguments[i][k];
            }
        }
        return arguments[0];
    }

    function formatter(obj) {
        var arr = [];
        for (var k in obj) {
            arr.push(k + '=' + obj[k])
        }
        return arr.join('&');
    }
}