package model.status;

public class ZCore {
	private String Time;
	private String CompanyName;
	private String Zcore;
	public String getTime() {
		return Time;
	}
	public void setTime(String time) {
		Time = time;
	}
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getZcore() {
		return Zcore;
	}
	public void setZcore(String zcore) {
		Zcore = zcore;
	}
	public ZCore(String time, String companyName, String zcore) {
		super();
		Time = time;
		CompanyName = companyName;
		Zcore = zcore;
	}
}
