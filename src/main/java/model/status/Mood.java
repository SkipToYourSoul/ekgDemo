package model.status;

public class Mood {
	private String CompanyName;
	private String Mood;
	private double Count;
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getMood() {
		return Mood;
	}
	public void setMood(String mood) {
		Mood = mood;
	}
	public double getCount() {
		return Count;
	}
	public void setCount(double count) {
		Count = count;
	}
	public Mood(String companyName, String mood, double count) {
		super();
		CompanyName = companyName;
		Mood = mood;
		Count = count;
	}
}
