package model;

public class BigEvent {
	private int id;
	private String EventKeyWord;
	private String StartTime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEventKeyWord() {
		return EventKeyWord;
	}
	public void setEventKeyWord(String eventKeyWord) {
		EventKeyWord = eventKeyWord;
	}
	public String getStartTime() {
		return StartTime;
	}
	public void setStartTime(String startTime) {
		StartTime = startTime;
	}
	public BigEvent(int id, String eventKeyWord, String startTime) {
		super();
		this.id = id;
		EventKeyWord = eventKeyWord;
		StartTime = startTime;
	}
}
