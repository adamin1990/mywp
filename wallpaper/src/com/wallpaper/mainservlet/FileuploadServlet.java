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

		// �����ļ�������������������FileItem����
		DiskFileItemFactory difactory = new DiskFileItemFactory();
		// ���û����С������ϴ��ļ����������С����ʹ����ʱĿ¼��Ϊ���档
		difactory.setSizeThreshold(1024 * 1024);
		// ���ô������������ʱĿ¼����Ŀ¼�µ��ļ���Ҫ�ֶ�ɾ����
		String dir = this.getServletContext().getRealPath("/");
		File filedir = new File(dir + "filetemp");
		if (!filedir.exists())
			filedir.mkdir();
		difactory.setRepository(filedir);
		// �����ļ�ʵ�ʱ����Ŀ¼
		String userdir = dir + "files";
		File fudir = new File(userdir);
		if (!fudir.exists())
			fudir.mkdir();
		// ����request�Ľ����������Ὣ���ݷ�װ��FileItem�����С�
		ServletFileUpload sfu = new ServletFileUpload(difactory);
		// ����������request�е����ݲ�����list����
		List list = null;
		try {
			list = sfu.parseRequest(request);
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		// ����list���ϣ�ȡ��ÿһ���������FileItem���󣬲��ֱ��ȡ����
		for (Iterator it = list.iterator(); it.hasNext();) {
			FileItem fi = (FileItem) it.next();
			if (fi.isFormField()) {
				System.out.println(fi.getFieldName());
				System.out.println(fi.getString());
			} else {
				// ���ڿͻ�������������͵��ļ��ǿͻ��˵�ȫ·������������ֻ��Ҫ�ļ�������
				String filename = fi.getName();
				int index = filename.lastIndexOf("\\");
				if (index != -1)
					filename = filename.substring(index + 1);
				// �������д���ļ�
				InputStream in = fi.getInputStream();
				FileOutputStream fos = new FileOutputStream(fudir + "/"
						+ filename);
				byte[] buf = new byte[1024]; 
				int len = -1; 
				while ((len = in.read(buf)) != -1) { 
					fos.write(buf, 0, len); 
				}
				// �ر���
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