var baseIp = "192.168.1.100";
var url = "http://"+baseIp+":8080/ShopServer/client!";
var picUrl = "http://"+baseIp+":8080/ShopServer/upload/";
var focusobj = null;
var userInfo = null;
var cars = [];
$(function(){
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"goodType",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "gtype": "",
            "sort":"gtypeName",
            "order":"desc",
            "page":1,
            "rows":100
        },
        success: function(data) {
            hideLoader();
            var types = data.info.rows;
            showType(types);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
});
function regester(){
    var userName = $("#rusername").val();
    var passwd = $("#rpasswd").val();
    userName = encodeURIComponent(userName);
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"regester",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "userName": userName,
            "passwd": passwd
        },
        success: function(data) {
            hideLoader();
            //alert("操作成功！");
            //window.location.href="#fpage";
            $.mobile.changePage("#fpage");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
            //alert("操作失败！");
        }
    });
}

function login(){
    var userName = $("#lusername").val();
    var passwd = $("#lpasswd").val();
    userName = encodeURIComponent(userName);
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"login",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "userName": userName,
            "passwd": passwd
        },
        success: function(data) {
            hideLoader();
            if(data.info == "fail"){
                //alert("用户名或密码错误！");
            }else{
                //alert("操作成功！");
                //window.location.href="#mainpage";
                userInfo = data.info;
                $.mobile.changePage("#mainpage");
                goodList();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
            //alert("操作失败！");
        }
    });
}

function goodList(){
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"goodList",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "gtype": "",
            "sort":"createTime",
            "order":"desc",
            "page":1,
            "rows":100,
            "sgoodtype":"",
            "sgoodname":""
        },
        success: function(data) {
            hideLoader();
            var goods = data.info.rows;
            showGoods(goods);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
}

function reflash(){
    var id = $("#gtype").val();
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"goodList",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "gtype": "",
            "sort":"createTime",
            "order":"desc",
            "page":1,
            "rows":100,
            "sgoodtype":id,
            "sgoodname":""
        },
        success: function(data) {
            hideLoader();
            var goods = data.info.rows;
            showGoods(goods);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
}

function showType(types){
    var html = '<option value="">选择商品类别</option>';
    html += '<option value="">全部</option>';
    for(var i=0;i<types.length;i++){
        var type = types[i];
        var id = type.id;
        var tname = type.gtypeName;
        var el = '<option value="'+id+'">'+tname+'</option>';
        html += el;
    }
    $("#gtype").html(html);
}

function showGoods(goods){
    var html = "";
    for(var i=0;i<goods.length;i++){
        var good = goods[i];
        var id = good.id;
        var el = '<li onclick="goodDetail(\''+id+'\')">'+
        '<a href="#">'+
        '<img style="width: 128px;height: 160px;" src="'+picUrl+good.goodImg+'">'+
        '<h2>'+good.goodName+'</h2>'+
        '<p>'+'￥：'+good.goodPrice+" "+good.goodDesc+'</p></a>'+
        '</li>';
        html += el;
    }
    $("#goodlist").html(html);
    $("#goodlist").listview('refresh');
}

function showcar(){
    var goods = localStorage.getItem("car");
    var html = "";
    if(goods){
        goods = JSON.parse(goods);
        for(var i=0;i<goods.length;i++){
            var good = goods[i];
            var id = good.id;
            var el = '<li onclick="goodDetail(\''+id+'\')">'+
                '<a href="#">'+
                '<img style="width: 128px;height: 160px;" src="'+picUrl+good.goodImg+'">'+
                '<h2>'+good.goodName+'</h2>'+
                '<p>'+'￥：'+good.goodPrice+" "+good.goodDesc+'</p></a>'+
                '</li>';
            html += el;
        }
    }
    $("#carlist").html(html);
    $("#carlist").listview('refresh');
}

function goodDetail(id){
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"findById",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "id": id
        },
        success: function(data) {
            hideLoader();
            var good = data.info;
            focusobj = good;
            var tds = $("#detailTable").find("TD");
            $(tds.get(1)).text(good.goodName+"  ￥："+good.goodPrice);
            $(tds.get(2)).text(good.goodDesc);
            var img = $("#detailTable").find("IMG").get(0);
            $(img).attr("src",picUrl+good.goodImg);
            $.mobile.changePage("#goodDetail");

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });

}

function buy(){
    var tds = $("#buytable").find("TD");
    $(tds.get(1)).text(focusobj.goodName+"  ￥："+focusobj.goodPrice);
    $(tds.get(2)).text(focusobj.goodDesc);
    var img = $("#buytable").find("IMG").get(0);
    $(img).attr("src",picUrl+focusobj.goodImg);
    $.mobile.changePage("#buypage");
}
function pingjia(){
    var tds = $("#pingjiatable").find("TD");
    $(tds.get(1)).text(focusobj.goodName+"  ￥："+focusobj.goodPrice);
    $(tds.get(2)).text(focusobj.goodDesc);
    var img = $("#pingjiatable").find("IMG").get(0);
    $(img).attr("src",picUrl+focusobj.goodImg);
    $.mobile.changePage("#pingjiapage");
}

function surePingjia(){

}

function sureBuy(){
    var count = $("#buycount").val();
    var adress = $("#buynote").val();
    var userName = userInfo.userName;
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"sureBuy",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "id": focusobj.id,
            "count":count,
            "userId":userInfo.id,
            "userName":encodeURIComponent(userName),
            "adress":encodeURIComponent(adress)
        },
        success: function(data) {
            hideLoader();
            if(data.info=="success"){
                $.mobile.changePage("#buysucess");
            }else{
                $.mobile.changePage("#buyfail");
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
}

function surePingjia(){
    var note = $("#pingjianote").val();
    var userName = userInfo.userName;
    showLoader("请稍后...");
    $.ajax({
        type: "GET",

        url: url+"surePingjia",
        dataType: "jsonp",
        jsonp: "callback",
        contentType:"text/html; charset=utf-8",
        data: {
            "id": focusobj.id,
            "userId":userInfo.id,
            "userName":encodeURIComponent(userName),
            "note":encodeURIComponent(note)
        },
        success: function(data) {
            hideLoader();
            if(data.info=="success"){
                $.mobile.changePage("#pingjiasucess");
            }else{
                $.mobile.changePage("#pingjiafail");
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            hideLoader();
        }
    });
}

function addCar(){
    var t = localStorage.getItem("car");
    if(t && t != "null"){
        t = JSON.parse(t);
        t.push(focusobj);
    }else {
        t = [];
        t.push(focusobj);
    }
    localStorage.setItem("car",JSON.stringify(t));
    $.mobile.changePage("#carpage");
    showcar();
}

function removeCar(id){
    var nt = [];
    var t = localStorage.getItem("car");
    if(t && t != "null"){
        t = JSON.parse(t);
        for(var i=0;i< t.length;i++){
            if(t[i].id == id){
                continue
            }
            nt.push(t[i]);
        }
        localStorage.setItem("car",JSON.stringify(nt));
    }
}

function clearCar(){
    localStorage.removeItem("car");
    showcar();
}
