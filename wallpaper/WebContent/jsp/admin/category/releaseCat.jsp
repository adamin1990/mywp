<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String path = request.getContextPath() ;%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>发布或更新操作</title>
<style type="text/css">
.main2{height: 700px;width: 758px; position: absolute;border-width: 0px;background: #ffffff;left:50%;margin-left: -369px;}
</style>
</head>
<body>
	<div class="main2">
	 <c:if test="${sessionScope.cat==null}">
		<strong>发布新的图片类型</strong>
			<form action="<%=path %>/admin?type=category&operateType=insert" method="post" enctype="multipart/form-data" name="form" accept-charset="UTF-8" >
		</c:if>
		<c:if test="${sessionScope.cat!=null}">
		<strong>更新图片类型</strong>
			<form action="<%=path %>/admin?type=category&operateType=update" method="post" enctype="multipart/form-data" name="form" accept-charset="UTF-8">
		</c:if>  
		<table> 
				<tr>
					<td>图片类型名称：</td>
					<td><input type="text" value="<c:out value="${sessionScope.cat.cname}"></c:out>" name="cname"  /></td>
				<tr>
				<tr>
					<td>图片：</td>
					<td><input type="file" name="caddr"/><c:out value="${sessionScope.cat.caddr}"></c:out></td>
				<tr>
				<tr>
					<td>图片描述：</td>
					<td><textarea rows="4" cols="50" name="cdescrip" ><c:out value="${sessionScope.cat.cdescrip}"></c:out></textarea></td>
				<tr>
		</table>
		<input type="submit" value="提交" name="提交"/>
		</form>
	</div> 
</body>
</html>