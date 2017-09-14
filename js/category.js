/**
 * Created by aaaaa on 2017/7/23.
 */
$.getJSON('http://127.0.0.1:9090/api/getcategorytitle',function (info) {
    // console.log(info);
    //渲染商品类
    var html = template('classify_tmp',info);
    $('.classify_box').html(html);
    //遍历点击渲染对应类型商品分类
    $('.classify_box>li>.classify_tit').each(function (i) {
        var that = $(this);
        $(that).data('num',0);
        $(that).on('click',function () {
            if($(that).parent().hasClass('show')){
                $(that).parent().removeClass('show');
                $(that).parent().children().eq(1).hide();
            }else{
                $(that).parent().addClass('show');
                if($(that).data('num') == 0){
                    $.ajax({
                        type:'get',
                        dataType:'json',
                        url:'http://127.0.0.1:9090/api/getcategory',
                        data:{
                            titleid:Number($(that).parent().data('id'))
                        },
                        success:function (info) {
                            console.log(info);
                            var classify_tmp = template('ttp2',info);
                            $(that).parent().children().eq(1).html(classify_tmp);
                            $(that).data('num',1);

                        }
                    })


                }else{
                    $(that).parent().children().eq(1).show();
                }
            }
        })
    })

})