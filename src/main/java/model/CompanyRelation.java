package model;

public class CompanyRelation {
	private String NewsUrl;
	private String NewsTitle;
	private String NewsTime;
	private String NewsText;
	private String Company1;
	private String Company2;
	private String Relation;
	
	public String getNewsUrl() {
		return NewsUrl;
	}
	
	public void setNewsUrl(String newsUrl) {
		NewsUrl = newsUrl;
	}

	public String getNewsTitle() {
		return NewsTitle;
	}

	public void setNewsTitle(String newsTitle) {
		NewsTitle = newsTitle;
	}

	public String getNewsTime() {
		return NewsTime;
	}

	public void setNewsTime(String newsTime) {
		NewsTime = newsTime;
	}

	public String getNewsText() {
		return NewsText;
	}

	public void setNewsText(String newsText) {
		NewsText = newsText;
	}

	public String getCompany1() {
		return Company1;
	}

	public void setCompany1(String company1) {
		Company1 = company1;
	}

	public String getCompany2() {
		return Company2;
	}

	public void setCompany2(String company2) {
		Company2 = company2;
	}

	public String getRelation() {
		return Relation;
	}

	public void setRelation(String relation) {
		Relation = relation;
	}

	public CompanyRelation(String newsUrl, String newsTitle, String newsTime,
			String newsText, String company1, String company2, String relation) {
		super();
		NewsUrl = newsUrl;
		NewsTitle = newsTitle;
		NewsTime = newsTime;
		NewsText = newsText;
		Company1 = company1;
		Company2 = company2;
		Relation = relation;
	}
}
