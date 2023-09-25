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
    private Long ponto;

    public Rota() {
    }

    public Rota(Long ponto) {
        this.ponto = ponto;
    }

    public Long getPonto() {
        return ponto;
    }

    public void setPonto(Long ponto) {
        this.ponto = ponto;
    }

}
