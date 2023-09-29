package br.com.ifba.gotransit.rota.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.ponto.model.Ponto;
import jakarta.persistence.*;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_rota")
public class Rota extends PersistenceEntity{
    private String ponto;

    public Rota() {
    }

    public Rota(String ponto) {
        this.ponto = ponto;
    }

    public String getPonto() {
        return ponto;
    }

    public void setPonto(String ponto) {
        this.ponto = ponto;
    }

}
