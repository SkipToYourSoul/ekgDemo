package model.status;

public class Clouds {
	private String CompanyName;
	private String Trem;
	private int Count;
	
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getTrem() {
		return Trem;
	}
	public void setTrem(String trem) {
		Trem = trem;
	}
	public int getCount() {
		return Count;
	}
	public void setCount(int count) {
		Count = count;
	}
	public Clouds(String companyName, String trem, int count) {
		super();
		CompanyName = companyName;
		Trem = trem;
		Count = count;
	}
}
