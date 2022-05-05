package br.ufpb.ci.mirrorfashion.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {

	public static void main(String[] args) {
		Connection c;
		try {
			c = DriverManager.getConnection("jdbc:hsqldb:hsql://localhost:9001/simplehr", "sa", "");
			System.out.println("Conectou");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		

	}

}
