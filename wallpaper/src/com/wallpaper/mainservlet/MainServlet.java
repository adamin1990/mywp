package com.wallpaper.mainservlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.mysql.jdbc.Connection;
import com.wallpaper.CommUtils.CommonUtils;
import com.wallpaper.bean.category;
import com.wallpaper.bean.picture;
import com.wallpaper.connDB.ConnWallpaperDB;
import com.wallpaper.dao.WallPaperService;

public class MainServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	Connection conn = null; 
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json;charset=utf-8");// 指明了向客户端发送的内容格式和采用的字符编码．
		String pageNo = req.getParameter("pageNo");
		String phonetype = req.getParameter("phonetype");
		String cid = req.getParameter("cid");
		JSONArray ja = new JSONArray();
		JSONObject jo = new JSONObject();
		try {
			conn = new ConnWallpaperDB().getWPConnention();
			if (phonetype.equals(CommonUtils.GETALLCATEGROY)) {
				List<category> cats = WallPaperService.getAllCategory(conn);
				for (category cat : cats) {
					jo.put("cid", cat.getCid());
					jo.put("cname", cat.getCname());
					jo.put("cdescrip", cat.getCdescrip());
					jo.put("caddr", cat.getCaddr());
					ja.add(jo); 
				}
			}
			if (phonetype.equals(CommonUtils.GETPICBYCAT)) {
				List<picture> pics = WallPaperService.getPicByCategory(conn, Integer.valueOf(pageNo),cid);
				for(picture pic : pics){
					jo.put("pid", pic.getPid());
					jo.put("paddr", pic.getPaddr());
					jo.put("pname", pic.getPname());
					jo.put("cid", pic.getCid());
					ja.add(jo); 
				}
			}
			conn.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} 
		resp.getWriter().write(ja.toString()); 
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.doPost(req, resp);
	} 
}
