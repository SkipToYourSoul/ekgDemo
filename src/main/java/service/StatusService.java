package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import db.Db;
import model.status.Clouds;
import model.status.HotTweet;
import model.status.Location;
import model.status.Mood;
import model.status.Retweet;
import model.status.Tfidf;
import model.status.TimeSeries;
import model.status.ZCore;

public class StatusService {
	public ArrayList<TimeSeries> getTimeSeries (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<TimeSeries> re = new ArrayList<TimeSeries>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new TimeSeries(rs.getString(1),rs.getString(2),rs.getInt(3),rs.getInt(4),rs.getInt(5)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<Location> getLocation (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<Location> re = new ArrayList<Location>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new Location(rs.getString(1),rs.getString(2),rs.getDouble(3)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<HotTweet> getHotTweet (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<HotTweet> re = new ArrayList<HotTweet>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new HotTweet(rs.getString(1),rs.getInt(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getString(8),rs.getString(9)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<Clouds> getCloud (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<Clouds> re = new ArrayList<Clouds>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new Clouds(rs.getString(1),rs.getString(2),rs.getInt(3)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<Mood> getMood (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<Mood> re = new ArrayList<Mood>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new Mood(rs.getString(1),rs.getString(2),rs.getDouble(3)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<Retweet> getRetweet (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<Retweet> re = new ArrayList<Retweet>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new Retweet(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<Tfidf> getTfidf (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<Tfidf> re = new ArrayList<Tfidf>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new Tfidf(rs.getString(1),rs.getString(2),rs.getString(3)));
            }
            Db.close(rs);  
            Db.close(ps);  
            Db.close(conn);
		}catch (Exception e){
			e.printStackTrace();
		}	
		return re;
	}
	
	public ArrayList<ZCore>	getZcore (String sql) throws Exception{
		Connection conn=Db.createConnection();
		ArrayList<ZCore> re = new ArrayList<ZCore>();
		try{
			PreparedStatement ps=Db.prepare(conn, sql);  
            ResultSet rs= ps.executeQuery();
            while(rs.next()){
            	re.add(new ZCore(rs.getString(1),rs.getString(2),rs.getString(3)));
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
