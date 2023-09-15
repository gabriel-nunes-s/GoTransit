package br.com.ifba.gotransit.rota.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.ponto.model.Ponto;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_rota")
public class Rota extends PersistenceEntity{
    
    
    private List<Long> ponto = new ArrayList<>();

    public Rota() {
    }

    public Rota(List<Long> ponto) {
        this.ponto = ponto;
    }

    public List<Long> getPonto() {
        return ponto;
    }

    public void setPonto(List<Long> ponto) {
        this.ponto = ponto;
    }
    
    
}
