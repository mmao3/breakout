package com.marlabs;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Rating
 */
@WebServlet("/Rating")
public class Rating extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Rating() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			String json=OperateTable.getRating(conn);
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String rate=request.getParameter("fkey");
		Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			String sql = "SELECT * FROM rating";
			String total=OperateTable.getInfo(conn,sql,"total");
			System.out.println(total);
			String times=OperateTable.getInfo(conn,sql,"times");	
			double times1=Double.parseDouble(times)+1;
			double total1=Double.parseDouble(total)+Double.parseDouble(rate);
			 sql = "UPDATE rating set total="+"'"+total1+"'"+", "+"times="+"'"+times1+"'"+"where times="+"'"+times+"'";
			 OperateTable.operation(conn,sql);
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

}
