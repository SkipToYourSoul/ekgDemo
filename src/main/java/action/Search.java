package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.CompanyName;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.CompanyService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class Search extends ActionSupport implements ServletRequestAware{
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private CompanyService service = new CompanyService();
	private ArrayList<CompanyName> re = new ArrayList<CompanyName>();
	
	public ArrayList<CompanyName> getRe() {
		return re;
	}
	public void setRe(ArrayList<CompanyName> re) {
		this.re = re;
	}

	@Action(value = "/search", results = { @Result(name = "success", type = "json")})
	public String fetchCompanyName() throws Exception{
		String keyword = request.getParameter("keyword");
		//keyword = new String(keyword.getBytes("ISO-8859-1"),"UTF-8");
		String sql = "SELECT companyname FROM companyinfo WHERE companyname LIKE '%"+keyword+"%'";

		re = service.getCompanyName(sql);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
