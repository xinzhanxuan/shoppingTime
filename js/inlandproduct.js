/**
 * Created by aaaaa on 2017/7/25.
 */
/**
 * Created by aaaaa on 2017/7/24.
 */
function getId(href) {
    var index = href.indexOf('?');
    var hrefString = href.slice(index + 1, href.length);
    var hrefArr = hrefString.split('&');
    var obj = {};
    for (var i = 0; i < hrefArr.length; i++) {
        // var key = hrefArr[i].split('=')[0];
        var value = hrefArr[i].split('=')[1];
        obj['id'+(i+1)] = value;
    }
    // console.log(obj);
    return obj;
}
var obj = getId(location.href);

$.get({
    url:"http://127.0.0.1:9090/api/getdiscountproduct",
    dataType:'json',
    data:{
        productid:obj.id1
    },
    success:function (info) {
        console.log(info);
        var html = template('tmp1',info);
        $('.discount').html(html);
    }
})