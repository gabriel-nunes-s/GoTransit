package br.com.ifba.gotransit.rota.model;

import br.com.ifba.gotransit.infrastructure.model.PersistenceEntity;
import br.com.ifba.gotransit.ponto.model.Ponto;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author bia-eduao
 */

@Entity
@Table(name="tb_rota")
public class Rota extends PersistenceEntity{
    
    @JoinColumn (name = "pontos")
    private List<Ponto> ponto = new ArrayList<>();

    public Rota() {
    }

    public Rota(List<Ponto> ponto) {
        this.ponto = ponto;
    }

    public List<Ponto> getPonto() {
        return ponto;
    }

    public void setPonto(List<Ponto> ponto) {
        this.ponto = ponto;
    }
    
    
}
