package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.status.TimeSeries;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.StatusService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class TimeseriesAction extends ActionSupport implements ServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private StatusService service = new StatusService();
	private ArrayList<TimeSeries> re = new ArrayList<TimeSeries>();
	
	public ArrayList<TimeSeries> getRe() {
		return re;
	}
	
	@Action(value = "/timeseries", results = { @Result(name = "success", type = "json")})
	public String fetchStatus() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");
		
		String sql1 = "SELECT * FROM status_timeseries WHERE CompanyName = '"+company+"'";
		re = service.getTimeSeries(sql1);
		
		return "success";
	}
	
	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
