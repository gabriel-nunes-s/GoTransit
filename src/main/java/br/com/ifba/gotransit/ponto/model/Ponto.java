package br.com.ifba.gotransit.ponto.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.onibus.model.Onibus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
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
    private Onibus onibusNoPonto;
    
    @ManyToMany(mappedBy = "ponto")
    private List<Onibus> onibus = new ArrayList<>();

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

    public Onibus getOnibusNoPonto() {
        return onibusNoPonto;
    }

    public void setOnibusNoPonto(Onibus onibusNoPonto) {
        this.onibusNoPonto = onibusNoPonto;
    }
    
        public List<Onibus> getOnibus() {
        return onibus;
    }
    
}
