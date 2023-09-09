/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.onibus.service;

import br.com.ifba.gotransit.onibus.model.Onibus;
import br.com.ifba.gotransit.onibus.repository.OnibusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author bia-eduao
 */

@Service
public class OnibusService implements IOnibusService{

    @Autowired
    private OnibusRepository onibusRepository;
    
    @Override
    public ResponseEntity<Object> saveOnibus(Onibus onibus) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(onibusRepository.save(onibus));
    }

    @Override
    public ResponseEntity<Object> deleteOnibus(String id) {
        onibusRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Ònibus deletado com sucesso.");
    }

    @Override
    public ResponseEntity<Object> updateOnibus(Onibus onibus) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(onibusRepository.save(onibus));
    }

    @Override
    public ResponseEntity<Object> findAllOnibus() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(onibusRepository.findAll());
    }
    
}
