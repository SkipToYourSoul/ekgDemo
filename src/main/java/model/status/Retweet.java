package model.status;

public class Retweet {
	private String Mid;
	private String Root;
	private String RetweetTo;
	private String RetweetFrom;
	private String Time;
	
	public String getMid() {
		return Mid;
	}
	public void setMid(String mid) {
		Mid = mid;
	}
	public String getRoot() {
		return Root;
	}
	public void setRoot(String root) {
		Root = root;
	}
	public String getRetweetTo() {
		return RetweetTo;
	}
	public void setRetweetTo(String retweetTo) {
		RetweetTo = retweetTo;
	}
	public String getRetweetFrom() {
		return RetweetFrom;
	}
	public void setRetweetFrom(String retweetFrom) {
		RetweetFrom = retweetFrom;
	}
	public String getTime() {
		return Time;
	}
	public void setTime(String time) {
		Time = time;
	}
	public Retweet(String mid, String root, String retweetTo,
			String retweetFrom, String time) {
		super();
		Mid = mid;
		Root = root;
		RetweetTo = retweetTo;
		RetweetFrom = retweetFrom;
		Time = time;
	}
}
