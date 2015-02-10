package com.wallpaper.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.wallpaper.bean.person;
import com.wallpaper.connDB.ConnWallpaperDB;

public class adminDao { 
	/**
	 * 根据用户名查找用户
	 * @param name 用户名
	 * @return
	 */
	public static person findAdminByName (Connection conn,String name ){
		PreparedStatement ps;
		conn = new ConnWallpaperDB().getWPConnention();
		person admin = new person();
		try {
			ps = (PreparedStatement) conn.prepareStatement("select * from person where person.name = ? and person.type = 1 and person.flg = 1");
			ps.setString(1, name);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				admin.setId(rs.getInt(1));
				admin.setName(rs.getString(2));
				admin.setPassword(rs.getString(3));
				admin.setFlg(rs.getString(4));
				admin.setType(rs.getString(5));
			}
			ps.close();
			conn.close();
			return admin;
		} catch (SQLException e) {
			System.out.println(e.getMessage().toString());
		} 
		return admin;
	}

}
