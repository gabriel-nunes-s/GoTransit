package br.com.ifba.gotransit.onibus.model;

import br.com.ifba.gotransit.usuario.model.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_onibus")
public class Onibus {
    @Id
    private String idOnibus;
    private String nome;
    private double latitude;
    private double longitude;
    private String horario;
    private Long clientesFavoritos;
    private Long rota;
    private Long ponto;
    private String infoAcessibilidade;
    
    public Onibus(){
    }

    public Onibus(String id, String nome, String infoAcessibilidade) {
        this.idOnibus = id;
        this.nome = nome;
        this.infoAcessibilidade = infoAcessibilidade;
    }

    public String getIdOnibus() {
        return idOnibus;
    }

    public void setIdOnibus(String idOnibus) {
        this.idOnibus = idOnibus;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public Long getClientesFavoritos() {
        return clientesFavoritos;
    }

    public void setClientesFavoritos(Long clientesFavoritos) {
        this.clientesFavoritos = clientesFavoritos;
    }

    public Long getRota() {
        return rota;
    }

    public void setRota(Long rota) {
        this.rota = rota;
    }

    public Long getPonto() {
        return ponto;
    }

    public void setPonto(Long ponto) {
        this.ponto = ponto;
    }
    
    
    public String getInfoAcessibilidade() {
        return infoAcessibilidade;
    }

    public void setInfoAcessibilidade(String infoAcessibilidade) {
        this.infoAcessibilidade = infoAcessibilidade;
    }

    
}
