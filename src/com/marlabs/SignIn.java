package com.marlabs;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.json.parsers.JSONParser;
import com.json.parsers.JsonParserFactory;

/**
 * Servlet implementation class SignIn
 */
@WebServlet("/SignIn")
public class SignIn extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignIn() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JsonParserFactory factory=JsonParserFactory.getInstance();
	    JSONParser parser=factory.newJsonParser();
		Map jsonMap=parser.parseJson(request.getParameter("fkey"));
		String username=(String)jsonMap.get("username");
		String 	password=(String)jsonMap.get("password");
		
		String sql = "SELECT * FROM user where userName"+"="+"'"+username+"'"+"and password = "+"'"+password+"'";
		String sql1 = "SELECT * FROM user where email"+"="+"'"+username+"'"+"and password = "+"'"+password+"'";
		String sql2 = "SELECT * FROM user where isVerified"+"="+"'"+"true"+"'"+"and userName"+"="+"'"+username+"'";
		String sql3 = "SELECT * FROM user where isVerified"+"="+"'"+"true"+"'"+"and email"+"="+"'"+username+"'";
		
		 Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			if((OperateTable.isVaild(conn,sql2)||OperateTable.isVaild(conn,sql3))&&(OperateTable.isVaild(conn,sql)||OperateTable.isVaild(conn,sql1))){
				 
				 String level=null;
						
				 String points=null;
						 
				 
				 if(OperateTable.isVaild(conn,sql1)){
					 username=OperateTable.getInfo(conn,sql1,"userName");
					 level=OperateTable.getInfo(conn,sql1,"level");
					  points=OperateTable.getInfo(conn,sql1,"points");
				 }else{
					 username=OperateTable.getInfo(conn,sql,"userName");
					 level=OperateTable.getInfo(conn,sql,"level");
					  points=OperateTable.getInfo(conn,sql,"points");
				 }
				
				
				 String json="{"+"\"username\":"+"\""+username+"\""+(level==null?"":",\"level\":"+"\""+level+"\"")+
						 (points==null?"":",\"points\":"+"\""+points+"\"")+"}";
				 
				  response.setContentType("application/json;charset=UTF-8"); //- See more at: http://ng-angular-js.blogspot.com/2015/01/reading-data-from-servlet-via-angular.html#sthash.fhIFBxtO.dpuf
				 PrintWriter out = response.getWriter();
				 out.println(json);
			 }else{
				 System.out.println("mao");
			 }
		} catch (SQLException | PropertyVetoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		};
		 
		
	}

}
