package com.wallpaper.connDB;

import java.sql.DriverManager;
import java.sql.Statement;

import com.mysql.jdbc.Connection;

public class ConnWallpaperDB { 
	
	static Connection conn ; 
	/* ��ȡ���ݿ����ӵĺ��� */
	public Connection getWPConnention() {
		Connection con = null; 
		try {
			Class.forName("com.mysql.jdbc.Driver");// ����Mysql�������� 
			con =  (Connection) DriverManager.getConnection( "jdbc:mysql://localhost:3306/wallpaper?useUnicode=true&characterEncoding=UTF8", "root", "root");// ������������ 
		} catch (Exception e) {
			System.out.println("���ݿ�����ʧ��" + e.getMessage());
		}
		return con; // ���������������ݿ����� 
	}
}
