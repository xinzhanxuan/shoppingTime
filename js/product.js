/**
 * Created by aaaaa on 2017/7/24.
 */
var hrefL = location.href;
var index = hrefL.indexOf('?');
var hrefString = hrefL.slice(index + 1, hrefL.length);
var hrefArr = hrefString.split('&');
var hrefContentIndex = hrefArr[0].indexOf('=');
var hrefContent = hrefArr[0].slice(hrefContentIndex + 1, hrefArr[0].length);

$.get({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getproduct',
    data: {
        productid: hrefContent
    },
    dataType: 'json',
    success: function (info) {
        // console.log(info);
        var html = template('pImg', info);
        $('.product').html(html);
    }
})
//渲染第二级导航
function renderName() {
    $.get({
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        dataType:'json',
        data:{
            categoryid:hrefContent
        },
        success:function (info) {

            // console.log(info.result[0]);
            $('.aa').html(info.result[0].category+' >');
            $('.aa').attr('href','productlist.html?categoryId='+hrefContent)
        }
    })
}
renderName();
// 渲染第三级导航
function renderThird() {
    $.get({
        url:'http://127.0.0.1:9090/api/getproductlist',
        dataType:'json',
        data:{
            categoryid:hrefContent
        },
        success:function (info) {
            console.log(info.result[hrefContent].brandName);
        }
    })
}
renderThird();