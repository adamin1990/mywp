<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% String path = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="<%=path %>/js/jquery-1.10.2.min.js"></script>
<style type="text/css">
.main2{height: 700px;width: 758px; position: absolute;border-width: 0px;background: #ffffff;left:50%;margin-left: -369px;}
.selected{ background: #4876FF}
</style>
</head>
<body>
	<div class="main2">
	<input type="hidden" id="path" value=<%=path %>/>
	<form action="<%=path %>/admin?type=category&operateType=select" method="post"  name="formName" id="from"> 
		<table>
				<tr>
					<td align="left" width="100px;" height="30px;"> 
					<input type="button" value="删除" name="删除" onclick="do_action()"/>
					</td>
					<td align="left" width="250px;" height="30px;"> <input type="button" value="修改" name="修改" onclick="modify()"/><input type="button" value="发布" name="发布" onclick="release()" /></td>
					<td align="left" width="150px;" height="30px;"></td>
				</tr>
				<tr style="background-color:#4876FF">
				<td align="left" width="100px;" height="30px;"><input type="checkbox" name="alls" onClick="selectAll('formName','no')" title="全选/取消全选">图片种类</td>
				<td align="left" width="250px;" height="30px;">种类图片地址</td>
				<td align="left" width="150px;" height="30px;">种类描述</td>  
			</tr> 
			
			<c:forEach var="listitem" items="${sessionScope.result}" >
				<tr onclick="selected(this)" id="<c:out value="${listitem.cid}"/>"  ondblclick="modify()">
					<td align="left" width="100px;" height="30px;"><input type="checkbox" name="no" value='<c:out value="${listitem.cid}"/>' title="选择/不选择"> <c:out value="${listitem.cname}"/></td>
					<td align="left" width="250px;" height="30px;"><c:out value="${listitem.caddr}"/></td>
					<td align="left" width="150px;" height="30px;"><c:out value="${listitem.cdescrip}"/></td> 
				</tr> 
			</c:forEach>
		</table>  
	</form>  
		<script type="text/javascript">
			var selectedId ;
			function selected(obj){  
				if(selectedId!=null){  
					var bb = document.getElementById(selectedId);
					bb.setAttribute("class", "");
					obj.setAttribute("class", "selected"); 
					selectedId = obj.getAttribute("id"); 
					}
				else{
					obj.setAttribute("class", "selected"); 
					selectedId = obj.getAttribute("id");
					obj.setAttribute("class", "selected"); 
					selectedId = obj.getAttribute("id");
					} 
				} 
			function removet(){   
				formName =document.forms[0];
				formName.action="<%=path %>/admin?type=category&operateType=deletecat"; 
				formName.submit(); 
				}
			function release(){
				window.location.href="<%=path%>/admin?type=category&operateType=newinsert";
				}
			function modify(){ 
				if(selectedId==null)
				{
					alert("请选择要修改的种类");
					return false;
					} 
				window.location.href="<%=path%>/admin?type=category&operateType=selectcatbyid&cid="+selectedId;
				} 
			/* 是否全选标记 */
			var checkedAll = false;

			/* 全选/取消全选
			* formName 所在form的name值
			* checkboxName checkbox的name值
			* 注意：所有checkbox的name值都必须一样，这样才能达到全选的效果
			*/
			function selectAll(formName,checkboxName){
				var form = document.all.item(formName);
				var elements = form.elements[checkboxName];
				for (var i=0;i<elements.length;i++){ 
					var e = elements[i];
					if(checkedAll){
						e.checked = false;
						form.alls.checked = false;
					} else {
						e.checked = true;
						form.alls.checked = true;
					}
				}
				if(checkedAll){
					checkedAll = false;
				} else {
					checkedAll = true;
				}
			} 
			/* 检查是否有checkbox被选中
			* formName 所在form的name值
			* checkboxName checkbox的name值
			* 注意：所有checkbox的name值都必须一样，这样才能达到全选的效果
			*/
			function checkAll(formName,checkboxName){
			var hasCheck = false;
			var form = document.all.item(formName);
			var elements = form.elements[checkboxName];
			for (var i=0;i<elements.length;i++){
			var e = elements[i];
			if(e.checked){
			hasCheck = true;
			}
			}
			return hasCheck;
			} 
			/* 执行操作 */
			function do_action(){
			if (!checkAll("formName","no")){
			alert("没有checkbox被选中，提示用户至少选择一个！");
			} else {
				removet(); 
			}
			} 
		</script> 
	</div>
</body>
</html>