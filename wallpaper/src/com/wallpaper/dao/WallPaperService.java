package com.wallpaper.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.wallpaper.CommUtils.CommonUtils;
import com.wallpaper.bean.category;
import com.wallpaper.bean.picture;
import com.wallpaper.connDB.ConnWallpaperDB;

public class WallPaperService {
	/**
	 * �����������ȡͼƬ
	 * @param conn ����
	 * @param pageNo �ڼ�ҳ
	 * @param pageSize ÿҳ��С
	 * @param cname  ��������
	 * @return list
	 */ 
	public static List<picture> getPicByCategory(Connection conn, int pageNo, String cid) {
		PreparedStatement ps; 
		conn = new ConnWallpaperDB().getWPConnention();
		if(cid.equals("0")||cid==null){
			cid="%";
		} 
		ArrayList<picture> pics = new ArrayList<picture>();
		try {
			ps = (PreparedStatement) conn
					.prepareStatement(" select * from picture  where picture.cid like '"+cid+"'  order by picture.pid desc  limit ?,?");
			int startindex = (pageNo - 1) * CommonUtils.pageSize;
			ps.setInt(1, startindex);
			ps.setInt(2, CommonUtils.pageSize);
			ResultSet rs = ps.executeQuery();
			while(rs.next()){
				picture pic = new picture();
				pic.setPid(rs.getInt(1));
				pic.setPname(rs.getString(2));
				pic.setPaddr(rs.getString(3));
				pic.setCid(rs.getString(4));
				pics.add(pic);  
			}
			ps.close(); 
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return pics;
	}  
	/**
	 * ��ȡ���е�����
	 * @param conn
	 * @return
	 */
	public static List<category> getAllCategory(Connection conn){ 
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		ArrayList<category> cats = new ArrayList<category>(); 
		try { 
			st = conn.createStatement();
			ResultSet rs = st.executeQuery("select * from category");
			while( rs.next()){
				category cat = new category();
				cat.setCid(rs.getInt(1));
				cat.setCname(rs.getString(2));
				cat.setCaddr(rs.getString(3));
				cat.setCdescrip(rs.getString(4));
				cats.add(cat); 
			}
			st.close(); 
			conn.close();
		} catch (Exception e) {
			System.out.println(e.getMessage().toString());
		} 
		return cats;
	} 
	/**
	 * ����ͼƬ
	 * @param conn ����
	 * @param pic  ͼƬʵ�� 
	 * @return  ��ȷ����Ϊtrue ������Ϊfalse
	 */
	public static boolean insertPic(Connection conn ,picture pic){
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement();
			boolean i = st
					.execute(" insert into picture(pname,paddr,cid,pdescription)values('"
							+ pic.getPname()
							+ "','"
							+ pic.getPaddr()
							+ "','"
							+ pic.getCid()
							+ "','"
							+ pic.getPdescription()
							+ "');");
			st.close();
			conn.close();
			return i; 
		} catch (Exception e) {
		}
		return false; 
	}
	/**
	 * ɾ��ͼƬ
	 * @param conn
	 * @param pid ͼƬpid
	 * @return ��ȷɾ��Ϊtrue ������Ϊfalse
	 */
	public static boolean deletePic(Connection conn ,String pid){
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement(); 
			boolean i = st.execute(" delete from picture where picture.pid = '"+pid+"';");
			st.close();
			conn.close();
			return i;
		}catch (Exception e) {
		} 
		return false;
	}
	/**
	 * ����ͼƬ
	 * @param conn
	 * @param pic ͼƬ
	 * @return  �޸ĵ�����
	 */
	public static int updatePic(Connection conn ,picture pic){
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement();
			int i = st.executeUpdate("update picture  set picture.pname = '"+pic.getPname()+"',picture.pdescription = '"+pic.getPdescription()+"',picture.paddr = '"+pic.getPaddr()+"',picture.cid ='"+pic.getCid()+"' where picture.pid ="+pic.getPid());
			st.close();
			conn.close();
			return i; 
		} catch (Exception e) {
		}
		return 0; 
	}
	/**
	 * ��������
	 * @param conn ����	
	 * @param cat ����
	 * @return  �Ƿ�ɹ�  true�ɹ� false ʧ��
	 */
	public static boolean insertCat(Connection conn ,category cat){
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement();
			boolean i = st
					.execute(" insert into category(cname,caddr,cdescrip)values('"
							+ cat.getCname()
							+ "','"
							+ cat.getCaddr()
							+ "','" 
							+ cat.getCdescrip()
							+ "');");
			st.close();
			conn.close();
			return i; 
		} catch (Exception e) {

		}
		return false; 
	}
	/**
	 * ɾ�����
	 * @param conn
	 * @param pid ���cid
	 * @return ��ȷɾ��Ϊtrue ������Ϊfalse
	 */
	public static boolean deleteCat(Connection conn ,String cid){
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement(); 
			boolean i = st.execute(" delete from category where category.cid ='"+cid+"';");
			st.close();
			conn.close();
			return i ;
		} catch (Exception e) {
		}
		return false;
	}
	/**
	 * �������
	 * @param conn
	 * @param cat ���
	 * @return  �޸ĵ�����
	 */
	public static int updateCat(Connection conn ,category cat){       
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		PreparedStatement ps;
		try {
			ps = (PreparedStatement) conn
					.prepareStatement("update category  set category.cname = ?,category.cdescrip = ?,category.caddr = ? where category.cid = "+cat.getCid());
			ps.setString(1, cat.getCname());
			ps.setString(2, cat.getCdescrip());
			ps.setString(3, cat.getCaddr()); 
			int i = ps.executeUpdate();
			ps.close();
			conn.close();
			return i; 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0; 
	}
	/**
	 * ��������id����ͼƬ����
	 * @param conn
	 * @param cid ����id
	 * @return   ͼƬ����
	 */
	public static category selectCatById(Connection conn ,String cid){
		category cat =null;
		Statement st;
		conn = new ConnWallpaperDB().getWPConnention();
		try {
			st = conn.createStatement(); 
			ResultSet rs = st.executeQuery("select * from category where category.cid ="+cid); 
			while( rs.next()){
				cat = new category();
				cat.setCname(rs.getString(2));
				cat.setCid(rs.getInt(1)); 
				cat.setCaddr(rs.getString(3));
				cat.setCdescrip(rs.getString(4)); 
			} 
			st.close();
			conn.close();
			return cat;  
		}catch (Exception e) {
			System.out.println(e.getMessage().toString());
		}
		return cat;
	} 
	/**
	 * ����id����ͼƬ
	 * @param conn ����	
	 * @param pid  ͼƬid
	 * @return   ͼƬ
	 */
	public static picture selectPicById(Connection conn ,String pid){
		picture cat = new picture();
		conn = new ConnWallpaperDB().getWPConnention();
		Statement st;
		try {
			st = conn.createStatement(); 
			ResultSet rs = st.executeQuery("select * from picture where picture.pid = " +pid); 
			while( rs.next()){
				cat.setPname(rs.getString(2));
				cat.setPid(rs.getInt(1)); 
				cat.setPaddr(rs.getString(3));
				cat.setCid(rs.getString(4));
				cat.setPdescription(rs.getString(5)); 
			} 
			st.close();
			conn.close();
			return cat;  
		}catch (Exception e) {
			System.out.println(e.getMessage().toString());
		}
		return cat;
	}
	

}
