/**
 * Created by aaaaa on 2017/7/25.
 */
$.getJSON('http://127.0.0.1:9090/api/getinlanddiscount', function (info) {
    console.log(info);
    var html = template('tmp1', info);
    $('.inlandBox').html(html);
})