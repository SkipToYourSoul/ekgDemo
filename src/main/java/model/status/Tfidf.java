package model.status;

public class Tfidf {
	private String companyName;
	private String time;
	private String tfidf;
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getTfidf() {
		return tfidf;
	}
	public void setTfidf(String tfidf) {
		this.tfidf = tfidf;
	}
	public Tfidf(String companyName, String time, String tfidf) {
		super();
		this.companyName = companyName;
		this.time = time;
		this.tfidf = tfidf;
	}
}
