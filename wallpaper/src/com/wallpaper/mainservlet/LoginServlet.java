package com.wallpaper.mainservlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.Connection;
import com.wallpaper.bean.person;
import com.wallpaper.connDB.ConnWallpaperDB;
import com.wallpaper.dao.adminDao;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public LoginServlet() {
        super();
    } 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		Connection conn =null; 
		person admin = adminDao.findAdminByName(conn, name);
		if (admin.getPassword()== null) { 
			response.getWriter().write("");
		} else {
			if (!admin.getPassword().equals(password)) {
				response.getWriter().write("");
			} else {
				request.getSession().setAttribute("admin", admin);
				response.getWriter().write("success");
			}
		} 
	} 
}
