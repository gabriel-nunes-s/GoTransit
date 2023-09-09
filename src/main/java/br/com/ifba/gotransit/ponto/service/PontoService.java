/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.ponto.service;

import br.com.ifba.gotransit.ponto.model.Ponto;
import br.com.ifba.gotransit.ponto.repository.PontoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author bia-eduao
 */

@Service
public class PontoService implements IPontoService {
    
    @Autowired
    private PontoRepository pontoRepository;

    @Override
    public ResponseEntity<Object> savePonto(Ponto ponto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pontoRepository.save(ponto));
    }

    @Override
    public ResponseEntity<Object> deletePonto(Long id) {
        pontoRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Ponto deletado com sucesso.");
        
    }

    @Override
    public ResponseEntity<Object> updatePonto(Ponto ponto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(pontoRepository.save(ponto));
    }

    @Override
    public ResponseEntity<Object> findAllPontos() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(pontoRepository.findAll());
    }
    
}
