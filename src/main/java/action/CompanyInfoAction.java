package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.CompanyInfo;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.CompanyService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class CompanyInfoAction extends ActionSupport implements ServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private CompanyService service = new CompanyService();
	private ArrayList<CompanyInfo> re = new ArrayList<CompanyInfo>();

	public ArrayList<CompanyInfo> getRe() {
		return re;
	}
	public void setRe(ArrayList<CompanyInfo> re) {
		this.re = re;
	}

	@Action(value = "/companyinfo", results = { @Result(name = "success", type = "json")})
	public String fetchCompanyInfo() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");
		
		String sql = "SELECT * FROM companyinfo WHERE companyname='"+company+"'";
		re = service.getCompanyInfo(sql);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
