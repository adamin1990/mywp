package com.wallpaper.bean;

import java.io.Serializable;

public class category implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public  int cid ;
	public String cname;
	public String cdescrip;
	public String caddr;
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getCdescrip() {
		return cdescrip;
	}
	public void setCdescrip(String cdescrip) {
		this.cdescrip = cdescrip;
	}
	public String getCaddr() {
		return caddr;
	}
	public void setCaddr(String caddr) {
		this.caddr = caddr;
	} 
}
