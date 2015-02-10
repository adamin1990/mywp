<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>管理员登陆</title>
 	<link href="<%=path %>/css/login.css" rel="stylesheet" type="text/css"/>
 	<script type="text/javascript" src="<%=path %>/js/jquery-1.10.2.min.js"></script>
 	<script type="text/javascript">
 		function login(){
 	 		var name = $("#UserName").val();
 	 		var pass = $("#PassWord").val();
			$.ajax({
				type:'POST',
				url:'<%=path %>/login',
				data:"name=" + name +"&password=" + pass ,
				async:false,
				success:function(data){
					if(data == ""){
						$("#text").css("visibility","visible");
					}
					else{ 
						$("#text").css("visibility","hidden");
						location = "<%=path %>/jsp/admin/Mwallpaper.jsp";
					}
						
				}
			});
 		}
 	</script>
</head>
<body>
    <div style="width: 416px;height: 238px;border: solid;border-color: #cdcdcc;border-width: 1px;background-color: #ffffff;
    	left:50%;margin-left:208px;top:50%; margin-top:104px;">
                <dl class="dl_bt">
                	<dd>
                	<strong><font size="4" color="#4169E1">管理员登陆</font></strong>
                	</dd>
                    <dd>
                        <span>账号</span><input id="UserName" type="text" class="lgpt" name="account.accName"/></dd>
                    <dd>
                        <span>密码</span><input id="PassWord" type="password" maxlength="25" size="25" class="lgpt" autocomplete="off" name="account.accPass"/></dd>

                    <dd class="wtext" id="text" style="visibility:hidden"><span style="color:red; width:100px;">用户名或密码有误</span></dd>
                    <dd class="ddbut">
                   		 <input type="button" style="position:absolute;right: 120px;" class="ibut" value="登 录" id="SubmitLogin" onclick="login()"/>
                 	 </dd>
                </dl> 
               </div>
</body></html>