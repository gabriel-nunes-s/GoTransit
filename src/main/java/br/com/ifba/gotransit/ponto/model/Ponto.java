/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.ponto.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_ponto")
public class Ponto extends PersistenceEntity {
    
    private String nome;
    private double latitude;
    private double longitude;
    private String horarioOnibus;
    private String onibusNoPonto;

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

    public String getOnibusNoPonto() {
        return onibusNoPonto;
    }

    public void setOnibusNoPonto(String onibusNoPonto) {
        this.onibusNoPonto = onibusNoPonto;
    }
    
    
}
