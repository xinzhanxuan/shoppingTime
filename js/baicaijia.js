/**
 * Created by aaaaa on 2017/7/25.
 */
var titId;// 定义标题ID用来获取对应页面
//滑动IScroll
$(window).on('load',function () {
    new IScroll('.nav',{
        scrollX:true
    });

})
//获取白菜价标题
$.getJSON('http://127.0.0.1:9090/api/getbaicaijiatitle',function (info) {
    var html = template('tmp1',info);
    $('.nav_box').html(html);
    $('.nav_box li').eq(0).addClass('flag');
    titId = $('.nav_box li').eq(0).data('id');
    render();
})
//封装渲染界面方法
function render() {
    $.get({
        url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
        dataType:'json',
        data:{
            titleid:titId
        },
        success:function (info) {
            console.log(info);
            var html = template('tmp2',info);
            $('.product_box').html(html);
        }

    })
}
//注册标题点击事件
$('body').on('click','.n',function () {
    // alert('a');
    $(this).addClass('flag').siblings().removeClass('flag');
    titId = $(this).data('id');
    //渲染标题对应界面
    render();
})

