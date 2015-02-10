package com.wallpaper.CommUtils;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.mysql.jdbc.Connection;
import com.wallpaper.bean.category;
import com.wallpaper.connDB.ConnWallpaperDB;
import com.wallpaper.dao.WallPaperService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



public class CommonUtils {
	public static String GETALLCATEGROY = "getallcategory";
	public static String GETPICBYCAT="getpicbycat"; 
	public static String SECLECT = "select";
	public static String UPDATE = "update";
	public static String DELETE = "deletecat";
	public static String DELETEPIC = "deletepic";
	public static String INSERT = "insert";
	public static String SELECTCATBYID="selectcatbyid";
	public static String SELECTPIC="selectpic";
	public static String FILENAMEFROMUPLOAD;
	public static int pageSize = 10;
	
	
	public JSONArray ListToJsonArray(List list){ 
		JSONArray ja = new JSONArray(); 
		for(Object obj : list){ 
			ja.add(obj);
		} 
		return ja;
	}
	
	@SuppressWarnings("deprecation")
	public static List<String> uploadFiles(HttpServletRequest request,String dir){ 
		List<String> listFromUpload = new ArrayList<String>();
		try{
			DiskFileItemFactory factory = new DiskFileItemFactory(); 
//			factory.setSizeThreshold(1024*1024); 
			String dirtemp = request.getServletContext().getRealPath("/");
			File filedir = new File(dirtemp + "filetemp");
			String str = null;
			if (!filedir.exists())
				filedir.mkdir();
			factory.setRepository(filedir);  
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setHeaderEncoding("UTF-8");
			List list=upload.parseRequest(request); 
			
			for(int i=0;i<list.size();i++)    
			{     
			   FileItem item = (FileItem)list.get(i); 
			   if(item.isFormField()){
				   listFromUpload.add(item.getString()); 
			   }else{
				   String filename = item.getName(); 
				   File picdir = null;
				   if(!filename.equals("")){ 
					   if(dir.equals("/pic/category")){
						   picdir = new File(request.getRealPath(dir));
					   }else{
						   Connection conn = new ConnWallpaperDB().getWPConnention();
						   category cat = WallPaperService.selectCatById(conn, listFromUpload.get(1));
						   picdir = new File(request.getRealPath(dir+"/"+cat.getCname()));
					   } 
					   if(!picdir.exists()) picdir.mkdir();
					   String path = picdir.getPath();
					   item.write(new File(path,filename)); 
				   }
				   listFromUpload.add(filename);
			   }
			}
			filedir.delete();
			return listFromUpload;
		}catch(Exception e){ 
			System.out.println(e.getMessage().toString());
		} 
		return null;
	}
	
}
