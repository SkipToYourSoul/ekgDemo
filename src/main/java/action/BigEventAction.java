package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.BigEvent;
import model.SubEvent;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.CompanyService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class BigEventAction extends ActionSupport implements ServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private CompanyService service = new CompanyService();
	private ArrayList<BigEvent> re = new ArrayList<BigEvent>();
	private ArrayList<SubEvent> re2 = new ArrayList<SubEvent>();

	public ArrayList<BigEvent> getRe() {
		return re;
	}
	public void setRe(ArrayList<BigEvent> re) {
		this.re = re;
	}

	public ArrayList<SubEvent> getRe2() {
		return re2;
	}
	public void setRe2(ArrayList<SubEvent> re2) {
		this.re2 = re2;
	}
	
	@Action(value = "/bigevent", results = { @Result(name = "success", type = "json")})
	public String fetchBigEvent() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");
		
		String sql = "SELECT id,eventKeyWords,startTime FROM bigevent WHERE timeLineId IN (SELECT id FROM timeline WHERE companyName = '"+company+"' ) ORDER BY startTime DESC";
		re = service.getBigEvent(sql);
		//System.out.println(company);
		
		String sql2 = "SELECT newsTitle,newsUrl,newsMedia,newsTime,newsSummary,bigEventId FROM subevent WHERE bigEventId IN (SELECT id FROM bigevent WHERE timeLineId IN (SELECT id FROM timeline WHERE companyName = '"+company+"' ) ORDER BY startTime DESC) ORDER BY newsTime";
		re2 = service.getSubEvent(sql2);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
