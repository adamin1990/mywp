package com.wallpaper.mainservlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.mysql.jdbc.Connection;
import com.wallpaper.CommUtils.CommonUtils;
import com.wallpaper.bean.category;
import com.wallpaper.bean.person;
import com.wallpaper.bean.picture;
import com.wallpaper.connDB.ConnWallpaperDB;
import com.wallpaper.dao.WallPaperService;

/**
 * 管理员管理后台数据
 */
@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L; 
	public AdminServlet() {
		super();
	} 
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String type = request.getParameter("type");
		String operateType = request.getParameter("operateType");
		String pageNo = request.getParameter("pageNo");
		String pcid = request.getParameter("pcid");
		Connection conn = null;
		
		person admin = (person) request.getSession().getAttribute("admin");
		if(admin == null){
			response.sendRedirect("/index.jsp");
		} 
 else {
	 if (type.equals("category")) {
				String dir = "/pic/category";
				if (operateType.equals(CommonUtils.SECLECT)) {
					List<category> list = WallPaperService.getAllCategory(conn);
					request.getSession().setAttribute("result", list);
					response.sendRedirect("/jsp/admin/category/allcategory.jsp");
				}
				if (operateType.equals(CommonUtils.DELETE)) {
					String no[] = request.getParameterValues("no");
					for (int i = 0; i < no.length; i++) {
						WallPaperService.deleteCat(conn, no[i]);
					}
					List<category> list = WallPaperService.getAllCategory(conn);
					request.getSession().setAttribute("result", list);
					response.sendRedirect("/admin?type=category&operateType=select");
				}
				if (operateType.equals(CommonUtils.INSERT)) {
					category cat = new category();
					List<String> list = CommonUtils.uploadFiles(request, dir);
					cat.setCdescrip(list.get(2));
					cat.setCname(list.get(0));
					cat.setCaddr(request.getScheme() + "://"
							+ request.getHeader("Host") +  dir
							+ "/" + list.get(1));
					WallPaperService.insertCat(conn, cat);
					response.sendRedirect("/admin?type=category&operateType=select");
				}
				if (operateType.equals(CommonUtils.SELECTCATBYID)) {
					String cid = request.getParameter("cid");
					category cat = WallPaperService.selectCatById(conn, cid);
					request.getSession().setAttribute("cat", cat);
					response.sendRedirect("/jsp/admin/category/releaseCat.jsp");
				}
				if (operateType.equals(CommonUtils.UPDATE)) {
					List<String> list = CommonUtils.uploadFiles(request, dir);
					category cat = (category) request.getSession()
							.getAttribute("cat");
					cat.setCdescrip(list.get(2));
					cat.setCname(list.get(0));
					if (!list.get(1).equals(""))
						cat.setCaddr(request.getScheme() + "://"
								+ request.getHeader("Host")+ dir + "/" + list.get(1));
					WallPaperService.updateCat(conn, cat);
					response.sendRedirect("/admin?type=category&operateType=select");
				}
				if (operateType.equals("newinsert")) {
					request.getSession().setAttribute("cat", null);
					response.sendRedirect("/jsp/admin/category/releaseCat.jsp");
				}
			}
			if (type.equals("picture")) {
				String dir = "/pic";
				if (operateType.equals(CommonUtils.SECLECT)) {
					if (pageNo == null)
						pageNo = "1";
					List<picture> list = WallPaperService.getPicByCategory(
							conn, Integer.valueOf(pageNo), pcid);
					category cat = WallPaperService.selectCatById(conn, pcid);
					request.getSession().setAttribute("recat", cat);
					request.getSession().setAttribute("pictures", list);
					request.getSession().setAttribute("pageNo",
							Integer.valueOf(pageNo));
					response.sendRedirect("/jsp/admin/picture/allpicture.jsp");

				}
				if (operateType.equals(CommonUtils.DELETEPIC)) {
					String no[] = request.getParameterValues("no");
					for (int i = 0; i < no.length; i++) {
						WallPaperService.deletePic(conn, no[i]);
					}
					List<picture> list = WallPaperService.getPicByCategory(
							conn, Integer.valueOf(pageNo), pcid);
					request.getSession().setAttribute("pictures", list);
					response.sendRedirect("/admin?type=picture&operateType=select&pageNo="
							+ pageNo + "&pcid=" + pcid);
				}
				if (operateType.equals(CommonUtils.INSERT)) {
					picture pic = new picture();
					List<String> list = CommonUtils.uploadFiles(request, dir);
					pic.setPdescription(list.get(3));
					pic.setPname(list.get(0));
					category cat = WallPaperService.selectCatById(conn,
							list.get(1));
					pic.setPaddr(request.getScheme() + "://"
							+ request.getHeader("Host") +  dir
							+ "/" + cat.getCname() + "/" + list.get(2));
					pic.setCid(list.get(1));
					WallPaperService.insertPic(conn, pic);
					response.sendRedirect("/admin?type=picture&operateType=select&pcid="+cat.getCid());
				}
				if (operateType.equals(CommonUtils.SELECTPIC)) {
					String pid = request.getParameter("pid");
					picture pic = WallPaperService.selectPicById(conn, pid);
					request.getSession().setAttribute("picture", pic);
					response.sendRedirect("/jsp/admin/picture/releasepic.jsp");
				}
				if (operateType.equals(CommonUtils.UPDATE)) {
					List<String> list = CommonUtils.uploadFiles(request, dir);
					picture pic = (picture) request.getSession().getAttribute(
							"picture");
					pic.setPdescription(list.get(3));
					pic.setPname(list.get(0));
					category cat = WallPaperService.selectCatById(conn,
							list.get(1));
					if (!list.get(1).equals(""))
						pic.setPaddr(request.getScheme() + "://"
								+ request.getHeader("Host")+ dir + "/" + cat.getCname() + "/"
								+ list.get(2));
					pic.setCid(list.get(1));
					WallPaperService.updatePic(conn, pic);
					response.sendRedirect("/admin?type=picture&operateType=select&pcid="
							+ cat.getCid());
				}
				if (operateType.equals("newinsert")) {
					request.getSession().setAttribute("picture", null);
					response.sendRedirect("/jsp/admin/picture/releasepic.jsp");
				}
			}
		} 
	} 
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException { 
		this.doGet(request, response);
	} 
}
