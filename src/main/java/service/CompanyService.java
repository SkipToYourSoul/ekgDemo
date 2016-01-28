package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import db.Db;
import model.BigEvent;
import model.CompanyInfo;
import model.CompanyName;
import model.CompanyRelation;
import model.SubEvent;

public class CompanyService {
	
	public ArrayList<BigEvent> getBigEvent (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<BigEvent> re = new ArrayList<BigEvent>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new BigEvent(rs.getInt(1),rs.getString(2),rs.getString(3)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}
		return re;
	}
	
	public ArrayList<SubEvent> getSubEvent(String sql)throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<SubEvent> re = new ArrayList<SubEvent>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new SubEvent(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getInt(6)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}
		return re;
	}
	
	public ArrayList<CompanyInfo> getCompanyInfo(String sql)throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<CompanyInfo> re = new ArrayList<CompanyInfo>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new CompanyInfo(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9),rs.getString(10),
            			rs.getString(11),rs.getString(12),rs.getString(13),rs.getString(14),rs.getString(15),rs.getString(16),rs.getString(17),rs.getString(18),rs.getString(19),rs.getString(20),
            			rs.getString(21),rs.getString(22),rs.getString(23),rs.getString(24)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}
		return re;
	}
	
	public ArrayList<CompanyName> getCompanyName(String sql)throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<CompanyName> re = new ArrayList<CompanyName>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new CompanyName(rs.getString(1)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}
		return re;
	}
	
	public ArrayList<CompanyRelation> getCompanyRelation(String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<CompanyRelation> re = new ArrayList<CompanyRelation>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new CompanyRelation(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}
		return re;
	}
}
