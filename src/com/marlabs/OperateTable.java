package com.marlabs;

import java.io.PrintWriter;
import java.sql.*;
public class OperateTable{


    public static void operation(Connection conn,String sql){
          Statement stmt = null;
          try{
 
              stmt = conn.createStatement();
              stmt.executeUpdate(sql);
              System.out.println("oprated table in given database...");
              System.out.println(sql);
             }catch(SQLException se){
               se.printStackTrace();
             }catch(Exception e){
             e.printStackTrace();
             }
   

    }
    public static boolean isVaild(Connection conn,String sql){
        Statement stmt = null;
        try{

            stmt = conn.createStatement();
            ResultSet rs=stmt.executeQuery(sql);
            System.out.println("search table in given database...");
            if(rs.next()){
            	return true;
            }else{
            	return false;
            }
           }catch(SQLException se){
             se.printStackTrace();
           }catch(Exception e){
           e.printStackTrace();
           }
 
     return false;
  }
    public static String getInfo(Connection conn,String sql,String key){
        Statement stmt = null;
        try{

            stmt = conn.createStatement();
            ResultSet rs=stmt.executeQuery(sql);
            System.out.println("search table in given database...");
            if(rs.next()){
            	return rs.getString(key);
            }else{
            	return null;
            }
           }catch(SQLException se){
             se.printStackTrace();
           }catch(Exception e){
           e.printStackTrace();
           }
 
     return null;
  }
    public static String getAll(Connection conn,String sql){
    	Statement stmt = null;
        try{

            stmt = conn.createStatement();
            ResultSet rs=stmt.executeQuery(sql);
            System.out.println("search table in given database...");
            String json="[";
            while(rs.next()){
            	String id = rs.getString("id");
                String date = rs.getString("date");
                String comment = rs.getString("comment");
               json+="{"+"\"username\":"+"\""+id+"\""+",\"date\":"+"\""+date+"\""+",\"comment\":"+"\""+comment+"\""+"}"+",";
            }
            if(json.length()>1){
            	json=json.substring(0,json.length()-1);
            } 
            json+="]";
            return json;
           }catch(SQLException se){
             se.printStackTrace();
           }catch(Exception e){
           e.printStackTrace();
           }
    	
    	return null;
    }
    
    public static String getRating(Connection conn){
    	Statement stmt = null;
        try{
        	String sql="select * from rating ";
            stmt = conn.createStatement();
            ResultSet rs=stmt.executeQuery(sql);
            System.out.println("search table in given database...");
            String json="[";
            while(rs.next()){
            	String total= rs.getString("total");
                String times = rs.getString("times");
               json+="{"+"\"total\":"+"\""+total+"\""+",\"times\":"+"\""+times+"\""+"}"+",";
            }
            if(json.length()>0){
            	json=json.substring(0,json.length()-1);
            } 
            json+="]";
            return json;
           }catch(SQLException se){
             se.printStackTrace();
           }catch(Exception e){
           e.printStackTrace();
           }
    	
    	return null;
    }
    
//    public static void main(String[] args) {
//
//     Connection conn=Connec.getConn();
//      String sql = "CREATE TABLE USER " +
//                   "(id VARCHAR(255) not NULL, " +
//                   " userName VARCHAR(255), " + 
//                   " email VARCHAR(255), " + 
//                   " password VARCHAR(255), " + 
//                    "first VARCHAR(255), " + 
//                    "last VARCHAR(255), " + 
//                    "loggedIp VARCHAR(255), " + 
//                    "lastLogin VARCHAR(255), " + 
//                    "regis_token VARCHAR(255), " + 
//                     "regis_tokenTime int, " + 
//                     "reset_token VARCHAR(255), " + 
//                     "reset_tokenTime int, " + 
//                    "level int, " + 
//                    "points int, " + 
//                    "resetPassword VARCHAR(255), " + 
//                   " PRIMARY KEY ( id ))";
//      
//     operation(conn,sql);
//     Connec.close(conn);
//
//   }


}