package br.com.ifba.gotransit.onibus.model;

import br.com.ifba.gotransit.ponto.model.Ponto;
import br.com.ifba.gotransit.rota.model.Rota;
import br.com.ifba.gotransit.usuario.model.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_onibus")
public class Onibus {
    
    @Id
    @Column(name = "id", length = 7, nullable=false)
    private String idOnibus;
    private String nome;
    @Column(length = 10)
    private double latitude;
    @Column(length = 10)
    private double longitude;
    @Column(length = 5)
    private String horario;
    @OneToMany
    @JoinColumn(name = "usuario_id")
    private List<Usuario> clientesFavoritos = new ArrayList<>();
    @ManyToMany
    private List<Rota> rota = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "tb_onibus_ponto", joinColumns = @JoinColumn(name = "onibus_id"), inverseJoinColumns = @JoinColumn(name = "ponto_id"))
    private List<Ponto> ponto = new ArrayList<>();
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

    public List<Usuario> getClientesFavoritos() {
        return clientesFavoritos;
    }

//    public void setClientesFavoritos(Long clientesFavoritos) {
//        this.clientesFavoritos = clientesFavoritos;
//    }

    public List<Rota> getRota() {
        return rota;
    }
//
//    public void setRota(Long rota) {
//        this.rota = rota;
//    }

    public List<Ponto> getPonto() {
        return ponto;
    }

//    public void setPonto(Long ponto) {
//        this.ponto = ponto;
//    }
    
    
    public String getInfoAcessibilidade() {
        return infoAcessibilidade;
    }

    public void setInfoAcessibilidade(String infoAcessibilidade) {
        this.infoAcessibilidade = infoAcessibilidade;
    }

    
}
