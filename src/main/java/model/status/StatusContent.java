package model.status;

public class StatusContent {
	private String CompanyName;
	private String IsRetweet;
	private String Mid;
	private String Time;
	private String Text;
	private String Location;
	private long RepostCount;
	private String Uid;
	private String Uname;
	private String IsV;
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getIsRetweet() {
		return IsRetweet;
	}
	public void setIsRetweet(String isRetweet) {
		IsRetweet = isRetweet;
	}
	public String getMid() {
		return Mid;
	}
	public void setMid(String mid) {
		Mid = mid;
	}
	public String getTime() {
		return Time;
	}
	public void setTime(String time) {
		Time = time;
	}
	public String getText() {
		return Text;
	}
	public void setText(String text) {
		Text = text;
	}
	public String getLocation() {
		return Location;
	}
	public void setLocation(String location) {
		Location = location;
	}
	public long getRepostCount() {
		return RepostCount;
	}
	public void setRepostCount(long repostCount) {
		RepostCount = repostCount;
	}
	public String getUid() {
		return Uid;
	}
	public void setUid(String uid) {
		Uid = uid;
	}
	public String getUname() {
		return Uname;
	}
	public void setUname(String uname) {
		Uname = uname;
	}
	public String getIsV() {
		return IsV;
	}
	public void setIsV(String isV) {
		IsV = isV;
	}
	public StatusContent(String companyName, String isRetweet, String mid,
			String time, String text, String location, long repostCount,
			String uid, String uname, String isV) {
		super();
		CompanyName = companyName;
		IsRetweet = isRetweet;
		Mid = mid;
		Time = time;
		Text = text;
		Location = location;
		RepostCount = repostCount;
		Uid = uid;
		Uname = uname;
		IsV = isV;
	}
}
