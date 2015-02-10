package com.wallpaper.mainservlet;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FileuploadServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)

	throws ServletException, IOException {

		// 创建文件处理工厂，它用于生成FileItem对象。
		DiskFileItemFactory difactory = new DiskFileItemFactory();
		// 设置缓存大小，如果上传文件超过缓存大小，将使用临时目录做为缓存。
		difactory.setSizeThreshold(1024 * 1024);
		// 设置处理工厂缓存的临时目录，此目录下的文件需要手动删除。
		String dir = this.getServletContext().getRealPath("/");
		File filedir = new File(dir + "filetemp");
		if (!filedir.exists())
			filedir.mkdir();
		difactory.setRepository(filedir);
		// 设置文件实际保存的目录
		String userdir = dir + "files";
		File fudir = new File(userdir);
		if (!fudir.exists())
			fudir.mkdir();
		// 创建request的解析器，它会将数据封装到FileItem对象中。
		ServletFileUpload sfu = new ServletFileUpload(difactory);
		// 解析保存在request中的数据并返回list集合
		List list = null;
		try {
			list = sfu.parseRequest(request);
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		// 遍历list集合，取出每一个输入项的FileItem对象，并分别获取数据
		for (Iterator it = list.iterator(); it.hasNext();) {
			FileItem fi = (FileItem) it.next();
			if (fi.isFormField()) {
				System.out.println(fi.getFieldName());
				System.out.println(fi.getString());
			} else {
				// 由于客户端向服务器发送的文件是客户端的全路径，在这我们只需要文件名即可
				String filename = fi.getName();
				int index = filename.lastIndexOf("\\");
				if (index != -1)
					filename = filename.substring(index + 1);
				// 向服务器写出文件
				InputStream in = fi.getInputStream();
				FileOutputStream fos = new FileOutputStream(fudir + "/"
						+ filename);
				byte[] buf = new byte[1024]; 
				int len = -1; 
				while ((len = in.read(buf)) != -1) { 
					fos.write(buf, 0, len); 
				}
				// 关闭流
				if (in != null) {

					try {

						in.close();

					} finally {

						if (fos != null)

							fos.close();

					}

				}

			}

		}

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)

	throws ServletException, IOException {

		doGet(request, response);

	}

}