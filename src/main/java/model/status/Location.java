package model.status;

public class Location {
	private String CompanyName;
	private String Location;
	private double UserCount;
	
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getLocation() {
		return Location;
	}
	public void setLocation(String location) {
		Location = location;
	}
	public double getUserCount() {
		return UserCount;
	}
	public void setUserCount(double userCount) {
		UserCount = userCount;
	}
	public Location(String companyName, String location, double userCount) {
		super();
		CompanyName = companyName;
		Location = location;
		UserCount = userCount;
	}
	
}
