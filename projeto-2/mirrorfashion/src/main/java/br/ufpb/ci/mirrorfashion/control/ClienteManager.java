package br.ufpb.ci.mirrorfashion.control;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.ufpb.ci.mirrorfashion.model.Cliente;

public class ClienteManager{

private static List<Cliente> lista = new ArrayList<>();

	private Connection c;

	public ClienteManager(Connection c) {
			this.c = c;
	}
	public void cadastrar(Cliente cliente) {
		lista.add(cliente);	
		
	}
	public List<Cliente> getTodosclientes(){
		String QUERY = "SELECT * FROM EMPLOYEE";
		Cliente aux;
		Statement stmt;
		try {
			stmt = this.c.createStatement();
		
        ResultSet rs = stmt.executeQuery(QUERY);
        while(rs.next()){
           //Display values
        	aux = new Cliente();
        	aux.setLogin(rs.getString("EMP_NAME"));
        	lista.add(aux);
        	
           System.out.println(", Name: "  + aux.getLogin() );
        }
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return lista;
	}
	
	public void excluir(int indice) {
		lista.remove(indice);
	}
	
	
	public List<String> buscar(String st){
		
		List<String> sts = new ArrayList<>();
		
		for (Cliente c : lista) {
			if (c.getStatus().equalsIgnoreCase(st)) {
				sts.add(c.getLogin());

			}
		}
		
		return sts;
	
	}
	
	public String statusBusc(String st) {
		return st;
	}
	
}

