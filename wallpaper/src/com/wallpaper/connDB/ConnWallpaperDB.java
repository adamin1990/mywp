package com.wallpaper.connDB;

import java.sql.DriverManager;
import java.sql.Statement;

import com.mysql.jdbc.Connection;

public class ConnWallpaperDB { 
	
	static Connection conn ; 
	/* 获取数据库连接的函数 */
	public Connection getWPConnention() {
		Connection con = null; 
		try {
			Class.forName("com.mysql.jdbc.Driver");// 加载Mysql数据驱动 
			con =  (Connection) DriverManager.getConnection( "jdbc:mysql://localhost:3306/wallpaper?useUnicode=true&characterEncoding=UTF8", "root", "root");// 创建数据连接 
		} catch (Exception e) {
			System.out.println("数据库连接失败" + e.getMessage());
		}
		return con; // 返回所建立的数据库连接 
	}
}
