package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.status.Clouds;
import model.status.HotTweet;
import model.status.Location;
import model.status.Mood;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.StatusService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class StatusAction extends ActionSupport implements ServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private StatusService service = new StatusService();
	private ArrayList<Location> re2 = new ArrayList<Location>();
	private ArrayList<HotTweet> re3 = new ArrayList<HotTweet>();
	private ArrayList<Clouds> re4 = new ArrayList<Clouds>();
	private ArrayList<Mood> re5 = new ArrayList<Mood>();

	public ArrayList<Location> getRe2() {
		return re2;
	}

	public ArrayList<HotTweet> getRe3() {
		return re3;
	}

	public ArrayList<Clouds> getRe4() {
		return re4;
	}

	public ArrayList<Mood> getRe5() {
		return re5;
	}

	@Action(value = "/status", results = { @Result(name = "success", type = "json")})
	public String fetchStatus() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");
		
		String company2 = (String) request.getParameter("oname");
		//company2 = new String(company2.getBytes("ISO-8859-1"),"UTF-8");
		
		String sql2 = "SELECT * FROM status_location_z WHERE CompanyName = '"+company2+"'";
		re2 = service.getLocation(sql2);
		String sql3 = "SELECT * FROM status_retweet_copy WHERE CompanyName = '"+company+"' ORDER BY RepostCount DESC LIMIT 10";
		re3 = service.getHotTweet(sql3);
		String sql4 = "SELECT * FROM status_cloud WHERE CompanyName = '"+company+"' ORDER BY Count DESC LIMIT 40";
		re4 = service.getCloud(sql4);
		String sql5 = "SELECT * FROM status_mood_z WHERE CompanyName = '"+company2+"'";
		re5 = service.getMood(sql5);
		
		return "success";
	}
	
	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
