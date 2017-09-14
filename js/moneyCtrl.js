/**
 * Created by aaaaa on 2017/7/24.
 */
var currentPage = 1;
var pageTotalCopy;//点击下一页用
function render() {

    $.get({
        url:'http://127.0.0.1:9090/api/getmoneyctrl',
        dataType:'json',
        data:{
            pageid:currentPage
        },
        success:function (info) {
            console.log(info);
            var html = template('tmp1',info);
            $('.product_box').html(html);
            //总页数
            var arr = [];//存储页数编码
            var pageTotal = Math.ceil(info.totalCount/info.pagesize);
            pageTotalCopy = pageTotal;
            for(var i=0;i<pageTotal;i++){
            arr.push(i);
            }
            //创建对象，渲染分页
            var obj = {
                pageTotal:pageTotal,
                arrNum:arr
            }
            console.log(obj.pageTotal);
            var html2 = template('tmp2',obj);
             $('#pages').html(html2);
            $('#pages option').eq(currentPage-1).prop('selected',true);
        }
    })
}
render();
(function () {
    $('body').on('change','#pages',function () {
        currentPage = $('#pages option:selected').val();
        render();
    })
})()
//点击上一页下一页
    //上一页
    $('.page').on('click','.prev',function () {
        currentPage--;
        if(currentPage <= 0){
            return false;
        }else{
            render();
        }
    })
    //下一页
    $('.page').on('click','.next',function () {
        currentPage++;
        if(currentPage > pageTotalCopy){
            return false;
        }else{
            render();
        }
    })

