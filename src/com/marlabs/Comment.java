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
 * Servlet implementation class Comment
 */
@WebServlet("/comment")
public class Comment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Comment() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String sql="select * from comments ";
		Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			System.out.println("get connected");
			System.out.println(conn);
			String json=OperateTable.getAll(conn,sql);
			System.out.println(json);
			  response.setContentType("application/json;charset=UTF-8"); //- See more at: http://ng-angular-js.blogspot.com/2015/01/reading-data-from-servlet-via-angular.html#sthash.fhIFBxtO.dpuf
			 PrintWriter out = response.getWriter();
			 out.println(json);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (PropertyVetoException e) {
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)..
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JsonParserFactory factory=JsonParserFactory.getInstance();
	    JSONParser parser=factory.newJsonParser();
		Map jsonMap=parser.parseJson(request.getParameter("fkey"));
		System.out.println(java.net.URLDecoder.decode((String)jsonMap.get("comment"),"UTF-8"));
		String sql="INSERT INTO comments " +
                "VALUES ("
				+"'"+(String)jsonMap.get("id")+"'"
                +","+"'"+(String)jsonMap.get("date")+"'"
                +","+"'"+java.net.URLDecoder.decode((String)jsonMap.get("comment"),"UTF-8")+"'"+
                 
				")";
		System.out.println(sql);
		Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			OperateTable.operation(conn,sql);
		} catch (SQLException | PropertyVetoException e) {
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
		 
		
	}

}
