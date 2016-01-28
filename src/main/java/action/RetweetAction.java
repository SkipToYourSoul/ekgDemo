package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.status.Retweet;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.StatusService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class RetweetAction extends ActionSupport implements ServletRequestAware{

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private StatusService service = new StatusService();
	private ArrayList<Retweet> re = new ArrayList<Retweet>();
	
	public ArrayList<Retweet> getRe() {
		return re;
	}
	public void setRe(ArrayList<Retweet> re) {
		this.re = re;
	}

	@Action(value = "/retweet", results = { @Result(name = "success", type = "json")})
	public String fetchRetweet() throws Exception{
		String mid = (String) request.getParameter("mid");
		String sql = "SELECT * FROM status_retweet_detail WHERE Mid = '"+mid+"'";
		re = service.getRetweet(sql);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
