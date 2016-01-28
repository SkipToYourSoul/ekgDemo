package action;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import model.CompanyRelation;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.interceptor.ServletRequestAware;

import service.CompanyService;

import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("json-default")
public class CompanyRelationAction extends ActionSupport implements ServletRequestAware{
	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private CompanyService service = new CompanyService();
	private ArrayList<CompanyRelation> re = new ArrayList<CompanyRelation>();
	
	public ArrayList<CompanyRelation> getRe() {
		return re;
	}

	public void setRe(ArrayList<CompanyRelation> re) {
		this.re = re;
	}
	
	@Action(value = "/companyrelation", results = { @Result(name = "success", type = "json")})
	public String fetchCompanyRelation() throws Exception{
		String company = (String) request.getParameter("company");	
		//company = new String(company.getBytes("ISO-8859-1"),"UTF-8");

		String sql = "SELECT * FROM company_relation WHERE company1 LIKE '%"+company+"%' OR company2 LIKE '%"+company+"%'";
		re = service.getCompanyRelation(sql);
		return "success";
	}

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		request = arg0;
	}
}
