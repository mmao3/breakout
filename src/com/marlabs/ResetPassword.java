package com.marlabs;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.mail.EmailException;

import com.json.parsers.JSONParser;
import com.json.parsers.JsonParserFactory;


/**
 * Servlet ihmplementation class register
 */
@WebServlet("/resetPassword")
public class ResetPassword extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ResetPassword() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	
	 /** @see HttpServletdoPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JsonParserFactory factory=JsonParserFactory.getInstance();
	    JSONParser parser=factory.newJsonParser();
		Map jsonMap=parser.parseJson(request.getParameter("fkey"));
//		String sql = "CREATE TABLE USER " +
//              "(id VARCHAR(255) not NULL, " +
//              " userName VARCHAR(255), " + 
//              " email VARCHAR(255), " + 
//              " password VARCHAR(255), " + 
//               "first VARCHAR(255), " + 
//               "last VARCHAR(255), " + 
//               "loggedIp VARCHAR(255), " + 
//               "lastLogin VARCHAR(255), " + 
//               "regis_token VARCHAR(255), " + 
//                "regis_tokenTime int, " + 
//                "reset_token VARCHAR(255), " + 
//                "reset_tokenTime int, " + 
//               "level int, " + 
//               "points int, " + 
//               "resetPassword VARCHAR(255), " + 
//              " PRIMARY KEY ( id ))";
//		String sql="INSERT INTO user " +
//                "VALUES ("
//				+"'"+(String)jsonMap.get("id")+"'"
//                +","+"'"+(String)jsonMap.get("username")+"'"
//                +","+"'"+(String)jsonMap.get("email")+"'"
//                  +","+"'"+(String)jsonMap.get("password")+"'"
//                  +","+"null"
//                  +","+"null"
//                  +","+"'"+(String)jsonMap.get("token")+"'"
//                  +","+"null"
//                  +","+"null"
//                  +","+"null"
//                  +","+"null"+
//				")";
		System.out.println("I am here");
		System.out.println((String)jsonMap.get("email"));
		String sql=null;
		Connection conn=null;
		try {
			conn = DataSource.getInstance().getConnection();
			sql = "UPDATE user set reset_token="+"'"+(String)jsonMap.get("token")+"'"+" where email="+"'"+(String)jsonMap.get("email")+"'";	 
			OperateTable.operation(conn,sql);
		    sql = "SELECT * FROM user where email="+"'"+(String)jsonMap.get("email")+"'";
        	String username=OperateTable.getInfo(conn,sql,"userName"); 
			String email=(String)jsonMap.get("email");
			String subject="Password reset request";
			String content="Dear "+"username"+":\n\n"+"Please click the following link to reset your password.\n\n\n"+"http://breakout.maomao.work/reset?token="+(String)jsonMap.get("token")+"\n\n\nSincerely,\n\n\nMAO MAO";
		
				try {
					SendMail.sendmail(email, subject, content);
				} catch (AddressException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (MessagingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
		} catch (SQLException | PropertyVetoException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
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
