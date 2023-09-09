package br.com.ifba.gotransit.onibus.service;

import br.com.ifba.gotransit.onibus.model.Onibus;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author bia-eduao
 */
public interface IOnibusService {
        
        ResponseEntity<Object> saveOnibus(Onibus onibus);
        ResponseEntity<Object> deleteOnibus(String id);
        ResponseEntity<Object> updateOnibus(Onibus onibus);
        ResponseEntity<Object> findAllOnibus();
    
}
