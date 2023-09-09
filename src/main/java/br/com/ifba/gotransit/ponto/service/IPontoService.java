package br.com.ifba.gotransit.ponto.service;

import br.com.ifba.gotransit.ponto.model.Ponto;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author bia-eduao
 */
public interface IPontoService {
    
    ResponseEntity<Object> savePonto(Ponto ponto);
    ResponseEntity<Object> deletePonto(Long id);
    ResponseEntity<Object> updatePonto(Ponto ponto);
    ResponseEntity<Object> findAllPontos();
    
}
