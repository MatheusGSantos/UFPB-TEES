package br.ufpb.ci.mirrorfashion.model;

public class Cliente {

	private String login;
	private String senha;
	private String status;
	
	
	public Cliente(){
		this("", "", "");
	}
	
	public Cliente(String login,String senha,String status){
		this.login = login;
		this.senha = senha;
		this.setStatus(status);
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	@Override
	public String toString() {
		return "Cliente [login=" + login + ", senha=" + senha + ", status=" + status + "]";
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	

	
	
}

