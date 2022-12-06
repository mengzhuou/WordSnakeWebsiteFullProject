package com.gtbackend.gtbackend.user;

import java.sql.Connection;
import java.sql.DriverManager;

public class dictionaryConnect {
    Connection con = null;
 
    public static Connection connectDB(){
 
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");  
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/entries","root","Ou1106983163!");
            return con;
        }
		catch(Exception e){
			System.out.println(e);
		}
        return connectDB();
    }
}
