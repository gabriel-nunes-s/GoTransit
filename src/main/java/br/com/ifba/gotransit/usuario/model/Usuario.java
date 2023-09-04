package br.com.ifba.gotransit.usuario.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class Usuario extends PersistenceEntity {

    private String nome;
    private String email;
    private String senha;

    public Usuario() {
    }

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}