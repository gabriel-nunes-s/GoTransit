package br.com.ifba.gotransit.usuario.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.onibus.model.Onibus;
import br.com.ifba.gotransit.rota.model.Rota;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_usuario")
public class Usuario extends PersistenceEntity {

    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String senha;

    private String cnh;
    private String identification;
    
    private String onibusPreferidos;
    
    private Long rotasPreferidas;

    @Column(nullable = false)
    private String nome;

    public Usuario() {
    }

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(String nome, String email, String senha, String onibusPreferidos, Long rotasPreferidas) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.onibusPreferidos = onibusPreferidos;
        this.rotasPreferidas = rotasPreferidas;
    }

    public Usuario(String email, String senha, String cnh, String identification, String nome) {
        this.email = email;
        this.senha = senha;
        this.cnh = cnh;
        this.identification = identification;
        this.nome = nome;
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

    public String getOnibusPreferidos() {
        return onibusPreferidos;
    }

    public void setOnibusPreferidos(String onibusPreferidos) {
        this.onibusPreferidos = onibusPreferidos;
    }

    public Long getRotasPreferidas() {
        return rotasPreferidas;
    }

    public void setRotasPreferidas(Long rotasPreferidas) {
        this.rotasPreferidas = rotasPreferidas;
    }

    public String getCnh() {
        return cnh;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }
}