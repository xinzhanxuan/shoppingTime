//渲染导航数据
$.getJSON('http://127.0.0.1:9090/api/getindexmenu',function (info) {
   console.log(info);
   var index_tmp = template('index_tmp',info);
   $('.nav_box').html(index_tmp);
   //点击更多
   // console.log($('#7'));
   $('#7').addClass('show');
   $('#7').addClass('more_btn')
   $('body').on('click','.more_btn',function () {
      if($(this).hasClass('show')){
         $('.nav_box li').each(function (index) {
            if(index > 7){
               $('.nav_box li').eq(index).hide();
               $('#7').removeClass('show');
            }
         })
      }else{
         $('.nav_box li').each(function (index) {
            if(index > 7){
               $('.nav_box li').eq(index).show();
               $('#7').addClass('show')
            }
         })
      }
   })
})

//渲染折扣商品

$.getJSON('http://127.0.0.1:9090/api/getmoneyctrl',function (info) {
   console.log(info);
   var product_tmp = template('product_tmp',info);
   $('.product_box').html(product_tmp);
})

