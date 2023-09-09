/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.ifba.gotransit.rota.service;

import br.com.ifba.gotransit.rota.model.Rota;
import br.com.ifba.gotransit.rota.repository.RotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author bia-eduao
 */

@Service
public class RotaService implements IRotaService {

    @Autowired
    private RotaRepository rotaRepository;
    
    @Override
    public ResponseEntity<Object> saveRota(Rota rota) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(rotaRepository.save(rota));
    }

    @Override
    public ResponseEntity<Object> deleteRota(Long id) {
        rotaRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Rota deletada com sucesso.");
    }

    @Override
    public ResponseEntity<Object> updateRota(Rota rota) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(rotaRepository.save(rota));
    }

    @Override
    public ResponseEntity<Object> findAllRotas() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(rotaRepository.findAll());
    }
    
}
