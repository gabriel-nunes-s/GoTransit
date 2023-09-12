package br.com.ifba.gotransit.ponto.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.onibus.model.Onibus;
import br.com.ifba.gotransit.rota.model.Rota;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_ponto")
public class Ponto extends PersistenceEntity {
    
    @Column(nullable=false)
    private String nome;
    @Column(length = 10)
    private double latitude;
    @Column(length = 10)
    private double longitude;
    @Column(length = 5)
    private String horarioOnibus;
    @ManyToMany(mappedBy = "ponto")
    private List<Onibus> onibus = new ArrayList<>();

    @ManyToOne
    @JoinTable(name = "tb_rota_ponto", joinColumns = @JoinColumn(name = "rota_id"), inverseJoinColumns = @JoinColumn(name = "ponto_id"))
    private Rota rota;

    public Ponto() {
    }

    public Ponto(String nome, double latitude, double longitude) {
        this.nome = nome;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public String getHorarioOnibus() {
        return horarioOnibus;
    }

    public void setHorarioOnibus(String horarioOnibus) {
        this.horarioOnibus = horarioOnibus;
    }
    
        public List<Onibus> getOnibus() {
        return onibus;
    }
    
}
