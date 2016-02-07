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
 * Servlet implementation class Verify
 */
@WebServlet("/verify")
public class Verify extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpShhervlet()
     */
    public Verify() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @seekkk HttpServletdoGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JsonParserFactory factory=JsonParserFactory.getInstance();
	    JSONParser parser=factory.newJsonParser();
		Map jsonMap=parser.parseJson(request.getParameter("fkey"));
		String key=(String)jsonMap.get("key");
		String value=(String)jsonMap.get("value");
		System.out.println(value);
		System.out.println("nihao");
		String sql = "SELECT * FROM user where "+key+"="+"'"+value+"'";
		 Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			if(OperateTable.isVaild(conn,sql)){
				 
				 
				 
				 String username=OperateTable.getInfo(conn,sql,"userName");
				 String level=OperateTable.getInfo(conn,sql,"level");
				 String points=OperateTable.getInfo(conn,sql,"points");
				 String json="{"+"\"username\":"+"\""+username+"\""+(level==null?"":",\"level\":"+"\""+level+"\"")+
						 (points==null?"":",\"points\":"+"\""+points+"\"")+"}";
				 System.out.println(json);
				System.out.println(key);
				System.out.println(key.equals("regis_token"));
				if(key.equals("regis_token")){
				 sql = "UPDATE user set "+key+"="+"'"+"null"+"'"+"where "+key+"="+"'"+value+"'";
				 OperateTable.operation(conn,sql);
			 }
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
}
