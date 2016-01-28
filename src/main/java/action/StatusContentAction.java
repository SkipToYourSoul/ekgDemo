package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.status.HotTweet;
import model.status.Tfidf;
import model.status.ZCore;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.StatusService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class StatusContentAction extends ActionSupport implements ServletRequestAware{
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private StatusService service = new StatusService();
	private ArrayList<HotTweet> re = new ArrayList<HotTweet>();
	private ArrayList<ZCore> re1 = new ArrayList<ZCore>();
	private ArrayList<Tfidf> re2 = new ArrayList<Tfidf>();
	private ArrayList<ZCore> re3 = new ArrayList<ZCore>();

	public ArrayList<ZCore> getRe1() {
		return re1;
	}
	
	public ArrayList<ZCore> getRe3() {
		return re3;
	}

	public ArrayList<HotTweet> getRe() {
		return re;
	}

	public ArrayList<Tfidf> getRe2() {
		return re2;
	}

	@Action(value = "/statusContent", results = { @Result(name = "success", type = "json")})
	public String fetchStatusContent() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");
		
		String company2 = (String) request.getParameter("oname");
		//company2 = new String(company2.getBytes("ISO-8859-1"),"UTF-8");
		
		String startTime = (String) request.getParameter("startTime");
		//startTime = new String(startTime.getBytes("ISO-8859-1"),"UTF-8");
		String endTime = (String) request.getParameter("endTime");
		//endTime = new String(endTime.getBytes("ISO-8859-1"),"UTF-8");
		
		String sql = "SELECT * FROM status_retweet_hot WHERE CompanyName = '"+company+"' AND Time <= '"+endTime+"' AND Time >= '"+startTime+"' ORDER BY RepostCount DESC LIMIT 10";
		re = service.getHotTweet(sql);
		
		String sql3 = "SELECT * FROM status_tfidf WHERE CompanyName = '"+company+"' AND Time <= '"+endTime+"' AND Time >= '"+startTime+"'";
		re2 = service.getTfidf(sql3);
		
		String sql2 = "SELECT * FROM status_zlocation WHERE CompanyName = '"+company+"' AND Time <= '"+endTime+"' AND Time >= '"+startTime+"'";
		re1 = service.getZcore(sql2);
		
		String sql4 = "SELECT * FROM status_zmood WHERE CompanyName = '"+company+"' AND Time <= '"+endTime+"' AND Time >= '"+startTime+"'";
		re3 = service.getZcore(sql4);
		
		return "success";
	}
	
	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
