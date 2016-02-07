package com.marlabs;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Reset
 */
@WebServlet("/reset")
public class Reset extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Reset() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
//		JsonParserFactory factory=JsonParserFactory.getInstance();
//		JSONParser parser=factory.newJsonParser();
//		Map jsonMap=parser.parseJson(request.getParameter("fkey"));
//		System.out.println((String)jsonMap.get("email"));
    	System.out.println(request.getParameter("token"));
		if(request.getParameter("token")!=null){
			String token=request.getParameter("token");
			 String sql = "SELECT * FROM user where reset_token="+"'"+token+"'";
			 System.out.println(sql);
			 Connection conn=null;
			try {
				conn = DataSource.getInstance().getConnection();
				if(OperateTable.isVaild(conn,sql)){
//					 sql = "UPDATE user set isVerified="+"'"+"true"+"'"+"where regis_token="+"'"+token+"'";
//					 OperateTable.operation(conn,sql);
					System.out.println("rest password");
					 response.sendRedirect("index.html"+"?"+"reset=true"+"&"+"token="+token);
				 }else{
					 response.sendRedirect("index.html");
				 }
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (PropertyVetoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			};
			 
			
			
		}else{
			response.sendRedirect("index.html");
		}
		
		
         
	}

}
