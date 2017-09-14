/**
 * Created by aaaaa on 2017/7/24.
 */
//
var hrefL = location.href;
var index = hrefL.indexOf('?');
var hrefString = hrefL.slice(index+1,hrefL.length);
var hrefArr = hrefString.split('&');
var hrefContentIndex = hrefArr[0].indexOf('=');
var hrefContent = hrefArr[0].slice(hrefContentIndex+1,hrefArr[0].length);
console.log(hrefContent);
var currentPage = 1;
//渲染对应id的商品
function render() {
    $.get({
        url:'http://127.0.0.1:9090/api/getproductlist',
        dataType:'json',
        data:{
            categoryid:hrefContent,
            pageid:currentPage
        },
        success:function (info) {
            console.log(info);
            var html = template('page_tmp',info);
            $('.product_box').html(html);
            var pageNum = Math.ceil(info.totalCount/info.pagesize);
            // console.log(pageNum);
            var arr =[];
            for(var i=0;i<pageNum;i++){
                arr.push(i);
            }
            // console.log(arr);
            //分页
            var obj = {
                pageNum:pageNum,
                arr:arr
            }
            var html2 = template('page',obj);
            $('#pages').html(html2);
            $('#pages option').eq(currentPage-1).prop('selected',true);


        }
    })
}
render();
//渲染商品名称
function renderName() {
    $.get({
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        dataType:'json',
        data:{
            categoryid:hrefContent
        },
        success:function (info) {
            console.log(info.result[0].category);
            $('.proContent').html(info.result[0].category);
        }
    })
}
renderName();
$('body').on('change','#pages',function () {
    var pagecontent = $('#pages option:selected').val();

    currentPage = pagecontent;
    render();
})




// console.log(pageNum);
