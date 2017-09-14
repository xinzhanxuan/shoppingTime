/**
 * Created by aaaaa on 2017/7/24.
 */
/**
 * Created by Vlardimir on 2017/7/24.
 */

//分页和三级联动的封装

$(function () {
    var categoryid = Number(request("categoryid"));
    var category = decodeURI(request("category"));
    $(".listHead").children("span").text(category);
    var pageid = 1;
    var totalPage = 0;
    changePage(pageid);

    //下一页函数
    $(".pageDown").on("click", function () {
        if (pageid >= totalPage) {
            return false;
        }
        pageid++;
        changePage(pageid);
    })
    //上一页函数
    $(".pageUp").on("click", function () {
        if (pageid <= 1) {
            return false;
        }
        pageid--;
        changePage(pageid);
    })
    //select框函数
    $("select.center-xy").on("change", function (e) {
        //console.log(e);
        pageid = $(this).get(0).selectedIndex + 1;
        changePage(pageid);
    })
    //改变页函数
    function changePage(pageid) {
        $.ajax({
            url: "http://127.0.0.1:9090/api/getproductlist",
            type: "get",
            dataType: "json",
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (data) {
                //console.log(data);
                var listHtml = template("listTpl", data);
                $(".list .listUl").html(listHtml);
                var links = $(".list .listUl li a");
                for (var i = 0; i < data.result.length; i++) {
                    var productId = data.result[i].productId;
                    $(links.eq(i)).attr("href", "bijia.html?categoryid=" + categoryid + "&category=" + category + "&productid=" + productId);
                }

                totalPage = Math.ceil(data.totalCount / data.pagesize);

                var pageArr = [];
                for (var i = 0; i < totalPage; i++) {
                    var pageObj = {};
                    pageObj.pageid = i + 1;
                    pageObj.totalPage = totalPage;
                    pageArr.push(pageObj);
                }
                var pageObj = {};
                pageObj.result = pageArr;
                //console.log(pageObj);
                var pageHtml = template("pageTpl", pageObj);
                $("select.center-xy").html(pageHtml);
                $("select.center-xy").children().eq(pageid - 1).prop("selected", "selected");
            }
        })
    }

    //获取当前页url中参数值的方法
    function request(paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }
})