/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.rota.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_rota")
public class Rota extends PersistenceEntity{
    
    private int ponto;

    public Rota() {
    }

    public Rota(int ponto) {
        this.ponto = ponto;
    }

    public int getPonto() {
        return ponto;
    }

    public void setPonto(int ponto) {
        this.ponto = ponto;
    }
    
    
}
