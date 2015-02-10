package com.wallpaper.bean;

import java.io.Serializable;

public class picture implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public  int pid ;
	public String pname;
	public  String paddr;
	public  String cid;
	public String pdescription;
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPaddr() {
		return paddr;
	}
	public void setPaddr(String paddr) {
		this.paddr = paddr;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getPdescription() {
		return pdescription;
	}
	public void setPdescription(String pdescription) {
		this.pdescription = pdescription;
	} 
} 
 