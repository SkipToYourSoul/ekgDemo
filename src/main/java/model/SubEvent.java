package model;

public class SubEvent {
	private String NewsTitle;
	private String NewsUrl;
	private String NewsMedia;
	private String NewsTime;
	private String NewsSummary;
	private int BigEventId;
	public String getNewsTitle() {
		return NewsTitle;
	}
	public void setNewsTitle(String newsTitle) {
		NewsTitle = newsTitle;
	}
	public String getNewsUrl() {
		return NewsUrl;
	}
	public void setNewsUrl(String newsUrl) {
		NewsUrl = newsUrl;
	}
	public String getNewsMedia() {
		return NewsMedia;
	}
	public void setNewsMedia(String newsMedia) {
		NewsMedia = newsMedia;
	}
	public String getNewsTime() {
		return NewsTime;
	}
	public void setNewsTime(String newsTime) {
		NewsTime = newsTime;
	}
	public String getNewsSummary() {
		return NewsSummary;
	}
	public void setNewsSummary(String newsSummary) {
		NewsSummary = newsSummary;
	}
	public int getBigEventId() {
		return BigEventId;
	}
	public void setBigEventId(int bigEventId) {
		BigEventId = bigEventId;
	}
	public SubEvent(String newsTitle, String newsUrl, String newsMedia,
			String newsTime, String newsSummary, int bigEventId) {
		super();
		NewsTitle = newsTitle;
		NewsUrl = newsUrl;
		NewsMedia = newsMedia;
		NewsTime = newsTime;
		NewsSummary = newsSummary;
		BigEventId = bigEventId;
	}
}
