package com.marlabs;

import java.sql.*;

public class CloseConnection{

  static Connection conn;
  CloseConnection(Connection conn){
        this.conn=conn;
  }
 public static void close(){

    try{
       conn.close();

    }catch(Exception e){
       e.printStackTrace();

    }

 }




}