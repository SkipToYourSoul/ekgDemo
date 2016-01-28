package model.status;

public class TimeSeries {
	private String CompanyName;
	private String Time;
	private int AllTweet;
	private int RTTweet;
	private int OriTweet;
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getTime() {
		return Time;
	}
	public void setTime(String time) {
		Time = time;
	}
	public int getAllTweet() {
		return AllTweet;
	}
	public void setAllTweet(int allTweet) {
		AllTweet = allTweet;
	}
	public int getRTTweet() {
		return RTTweet;
	}
	public void setRTTweet(int rTTweet) {
		RTTweet = rTTweet;
	}
	public int getOriTweet() {
		return OriTweet;
	}
	public void setOriTweet(int oriTweet) {
		OriTweet = oriTweet;
	}
	public TimeSeries(String companyName, String time, int allTweet,
			int rTTweet, int oriTweet) {
		super();
		CompanyName = companyName;
		Time = time;
		AllTweet = allTweet;
		RTTweet = rTTweet;
		OriTweet = oriTweet;
	}
}
